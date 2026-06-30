'use client';

import React, { useEffect, useState } from 'react';
import '../../styles/Leetcode.css';

interface LeetcodeData {
  solvedProblem: number;
  easySolved: number;
  mediumSolved: number;
  hardSolved: number;
  ranking: number;
  activeYears: number[];
  streak: number;
  totalActiveDays: number;
  submissionCalendar: Record<string, number>;
}

export default function LeetcodePage() {
  const [data, setData] = useState<LeetcodeData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const username = 'chetanchinchulkar635';

  useEffect(() => {
    async function fetchLeetcodeStats() {
      try {
        setLoading(true);
        const cacheKey = `leetcode_data_${username}`;
        const cached = localStorage.getItem(cacheKey);
        
        if (cached) {
          const { timestamp, data: cachedData } = JSON.parse(cached);
          // Cache validity: 2 hours
          if (Date.now() - timestamp < 7200000) {
            setData(cachedData);
            setError(false);
            setLoading(false);
            return;
          }
        }

        // Fetch solved stats
        const solvedRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        const solvedData = await solvedRes.json();

        // Fetch profile/ranking stats
        const profileRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
        const profileData = await profileRes.json();

        // Fetch calendar stats
        const calendarRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/calendar`);
        const calendarData = await calendarRes.json();

        const finalData = {
          solvedProblem: solvedData.solvedProblem || 431,
          easySolved: solvedData.easySolved || 264,
          mediumSolved: solvedData.mediumSolved || 131,
          hardSolved: solvedData.hardSolved || 36,
          ranking: profileData.ranking || 262967,
          activeYears: calendarData.activeYears || [2024, 2025, 2026],
          streak: calendarData.streak || 96,
          totalActiveDays: calendarData.totalActiveDays || 186,
          submissionCalendar: JSON.parse(calendarData.submissionCalendar || '{}')
        };

        localStorage.setItem(cacheKey, JSON.stringify({
          timestamp: Date.now(),
          data: finalData
        }));

        setData(finalData);
        setError(false);
      } catch (err) {
        console.error('Failed to fetch Leetcode data:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    }

    fetchLeetcodeStats();
  }, []);

  // Helper to generate the contribution grid cell elements
  const renderContributionGrid = () => {
    if (!data) return null;

    const calendar = data.submissionCalendar;
    const cells = [];
    const today = new Date();
    
    // We want to render a grid spanning 39 weeks (roughly 9 months, matches the Jun-Feb timeline of the screenshot)
    // 39 weeks * 7 days = 273 days
    const totalDays = 273;
    const startDate = new Date();
    startDate.setDate(today.getDate() - totalDays + 1);

    // Roll back startDate to the nearest Sunday to keep columns aligned (Sunday is index 0)
    const dayOfWeek = startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek);

    // Calculate total days to render to complete full columns (columns of 7 days)
    const daysToRender = Math.ceil((today.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const totalGridCells = Math.ceil(daysToRender / 7) * 7;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const columns: { monthLabel?: string; days: { date: Date; count: number; level: number }[] }[] = [];

    let currentWeek: { date: Date; count: number; level: number }[] = [];
    let lastMonthIdx = -1;

    for (let i = 0; i < totalGridCells; i++) {
      const cellDate = new Date(startDate);
      cellDate.setDate(startDate.getDate() + i);

      // Find midnight UTC timestamp in seconds
      const utcTimestamp = Date.UTC(cellDate.getFullYear(), cellDate.getMonth(), cellDate.getDate()) / 1000;
      const count = calendar[utcTimestamp.toString()] || 0;

      // Determine level based on submission count
      let level = 0;
      if (count > 0 && count <= 2) level = 1;
      else if (count > 2 && count <= 5) level = 2;
      else if (count > 5 && count <= 9) level = 3;
      else if (count > 9) level = 4;

      currentWeek.push({ date: cellDate, count, level });

      // If we finished a week (7 days)
      if (currentWeek.length === 7) {
        // Decide if we should place a month label for this column
        const firstDayOfWeek = currentWeek[0].date;
        const currentMonthIdx = firstDayOfWeek.getMonth();
        let monthLabel = '';

        if (currentMonthIdx !== lastMonthIdx) {
          monthLabel = months[currentMonthIdx];
          lastMonthIdx = currentMonthIdx;
        }

        columns.push({ monthLabel, days: currentWeek });
        currentWeek = [];
      }
    }

    return (
      <div className="leetcode-calendar-wrapper">
        {/* Render columns */}
        <div className="leetcode-calendar-grid">
          {columns.map((col, cIdx) => (
            <div key={cIdx} className="leetcode-calendar-column">
              <div className="leetcode-month-label">{col.monthLabel || ''}</div>
              <div className="leetcode-day-cells">
                {col.days.map((day, dIdx) => (
                  <div
                    key={dIdx}
                    className={`leetcode-day-cell level-${day.level}`}
                    title={`${day.count} submissions on ${day.date.toDateString()}`}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="leetcode-page-loading font-mono">
        <div className="leetcode-spinner"></div>
        <p>Loading LeetCode dashboard data...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="leetcode-page-error font-mono">
        <p className="terminal-red-text">Error: Failed to fetch LeetCode statistics.</p>
        <button onClick={() => window.location.reload()} className="leetcode-retry-btn">
          Retry Connection
        </button>
      </div>
    );
  }

  const totalEasy = 951;
  const totalMedium = 2077;
  const totalHard = 949;
  const totalProblems = 3977;
  
  const solvedPercent = Math.round((data.solvedProblem / totalProblems) * 100);

  return (
    <div className="leetcode-dashboard-container">
      {/* Subheading header */}
      <div className="leetcode-title-block">
        <div className="leetcode-badge-tag">
          <svg className="leetcode-badge-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polygon points="12 2 2 7 12 12 22 7 12 2" />
            <polyline points="2 17 12 22 22 17" />
            <polyline points="2 12 12 17 22 12" />
          </svg>
          <span>PROBLEM SOLVING</span>
        </div>
        <h1 className="leetcode-main-title">Data Structures & Algorithms</h1>
        <div className="leetcode-title-underline"></div>
      </div>

      {/* Row 1: Contest rating/badges */}
      <div className="leetcode-contest-grid font-mono">
        <div className="leetcode-stat-card">
          <span className="leetcode-card-label">Max Rating</span>
          <span className="leetcode-card-value">-</span>
        </div>
        <div className="leetcode-stat-card">
          <span className="leetcode-card-label">Level</span>
          <span className="leetcode-card-value">-</span>
        </div>
        <div className="leetcode-stat-card">
          <span className="leetcode-card-label">Global Ranking</span>
          <span className="leetcode-card-value">
            {data.ranking.toLocaleString()}<span className="leetcode-val-sub">/874,587</span>
          </span>
        </div>
        <div className="leetcode-stat-card">
          <span className="leetcode-card-label">Attended</span>
          <span className="leetcode-card-value">-</span>
        </div>
      </div>

      {/* Row 2: Bottom widgets (Overview & Calendar) */}
      <div className="leetcode-bottom-grid">
        {/* Overview card */}
        <div className="leetcode-overview-card">
          <div className="leetcode-overview-header">
            <h2 className="leetcode-card-title">Overview</h2>
            <a
              href={`https://leetcode.com/u/${username}/`}
              target="_blank"
              rel="noopener noreferrer"
              className="leetcode-profile-link"
            >
              View Profile →
            </a>
          </div>

          <div className="leetcode-progress-box">
            {/* SVG Donut Chart */}
            <div className="leetcode-donut-wrapper">
              <svg viewBox="0 0 36 36" className="leetcode-donut-chart">
                <path
                  className="leetcode-donut-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path
                  className="leetcode-donut-progress"
                  strokeDasharray={`${solvedPercent}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
              </svg>
              <div className="leetcode-donut-text">
                <span className="leetcode-donut-solved">{data.solvedProblem}</span>
                <span className="leetcode-donut-divider">/{totalProblems}</span>
                <span className="leetcode-donut-label">
                  <span className="leetcode-dot">●</span> Solved
                </span>
              </div>
            </div>

            {/* List breakdown */}
            <div className="leetcode-difficulty-list font-mono">
              <div className="leetcode-diff-item easy">
                <span className="diff-name">Easy</span>
                <span className="diff-stats">
                  <strong>{data.easySolved}</strong>
                  <span className="diff-slash">/</span>
                  <span className="diff-total">{totalEasy}</span>
                </span>
              </div>
              <div className="leetcode-diff-item medium">
                <span className="diff-name">Medium</span>
                <span className="diff-stats">
                  <strong>{data.mediumSolved}</strong>
                  <span className="diff-slash">/</span>
                  <span className="diff-total">{totalMedium}</span>
                </span>
              </div>
              <div className="leetcode-diff-item hard">
                <span className="diff-name">Hard</span>
                <span className="diff-stats">
                  <strong>{data.hardSolved}</strong>
                  <span className="diff-slash">/</span>
                  <span className="diff-total">{totalHard}</span>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar submissions card */}
        <div className="leetcode-calendar-card">
          <div className="leetcode-calendar-header">
            <h2 className="leetcode-card-title">
              <span className="leetcode-yellow-text">{Object.values(data.submissionCalendar).reduce((a, b) => a + b, 0)}</span> submissions in the past year
            </h2>
            <div className="leetcode-streak-metrics font-mono">
              <span>Total active days: <strong className="leetcode-green-text">{data.totalActiveDays}</strong></span>
              <span className="leetcode-streak-divider">|</span>
              <span>Max streak: <strong className="leetcode-green-text">{data.streak}</strong></span>
            </div>
          </div>

          {/* Grid Render */}
          {renderContributionGrid()}

          {/* Grid Footer Legend */}
          <div className="leetcode-legend font-mono">
            <span>Less</span>
            <div className="leetcode-legend-cells">
              <div className="leetcode-day-cell level-0"></div>
              <div className="leetcode-day-cell level-1"></div>
              <div className="leetcode-day-cell level-2"></div>
              <div className="leetcode-day-cell level-3"></div>
              <div className="leetcode-day-cell level-4"></div>
            </div>
            <span>More</span>
          </div>
        </div>
      </div>
    </div>
  );
}
