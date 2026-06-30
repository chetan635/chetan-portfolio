import React from 'react';
import '../styles/TerminalCard.css';

interface TerminalCardProps {
  headerPath: string;
  headerBadge?: string;
  icon?: React.ReactNode;
  title: string;
  subtitle: React.ReactNode;
  dateFrom?: string;
  dateTo?: string;
  duration?: string;
  description: string;
  techStack?: string[];
  links?: { label: string; url: string; icon?: React.ReactNode }[];
  statusCount?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

export default function TerminalCard({
  headerPath,
  headerBadge,
  icon,
  title,
  subtitle,
  dateFrom,
  dateTo,
  duration,
  description,
  techStack = [],
  links = [],
  statusCount = '2',
  className = '',
  style = {},
}: TerminalCardProps) {
  return (
    <div className={`terminal-card-container ${className}`} style={style}>
      {/* Header */}
      <div className="terminal-card-header">
        <div className="terminal-card-header-left">
          <div className="terminal-card-dots">
            <span className="terminal-card-dot red"></span>
            <span className="terminal-card-dot yellow"></span>
            <span className="terminal-card-dot green"></span>
          </div>
        </div>
        {headerBadge && (
          <div className="terminal-card-badge">{headerBadge}</div>
        )}
      </div>

      {/* Body */}
      <div className="terminal-card-body">
        {/* Title Area */}
        <div className="terminal-card-title-area">
          {icon && <div className="terminal-card-icon">{icon}</div>}
          <div>
            <h3 className="terminal-card-title">{title}</h3>
            <div className="terminal-card-subtitle">{subtitle}</div>
          </div>
        </div>

        {/* Stats Grid */}
        {(dateFrom || dateTo || duration) && (
          <div className="terminal-card-stats">
            {dateFrom && (
              <div className="terminal-card-stat-box">
                <div className="terminal-card-stat-label">FROM</div>
                <div className="terminal-card-stat-value">{dateFrom}</div>
              </div>
            )}
            {dateTo && (
              <div className="terminal-card-stat-box">
                <div className="terminal-card-stat-label">TO</div>
                <div className="terminal-card-stat-value">{dateTo}</div>
              </div>
            )}
            {duration && (
              <div className="terminal-card-stat-box">
                <div className="terminal-card-stat-label">DURATION</div>
                <div className="terminal-card-stat-value">{duration}</div>
              </div>
            )}
          </div>
        )}

        {/* Command 1: Description */}
        <div className="terminal-card-cmd-block">
          <div className="terminal-card-cmd">
            <span className="terminal-card-cmd-prompt">$</span> cat description.md
          </div>
          <div className="terminal-card-desc">{description}</div>
        </div>

        {/* Command 2: Tech Stack */}
        {techStack.length > 0 && (
          <div className="terminal-card-cmd-block">
            <div className="terminal-card-cmd">
              <span className="terminal-card-cmd-prompt">$</span> ls ./tech-stack
            </div>
            <div className="terminal-card-pills">
              {techStack.map((tech) => (
                <span key={tech} className="terminal-card-pill">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Command 3: Links */}
        {links.length > 0 && (
          <div className="terminal-card-cmd-block">
            <div className="terminal-card-cmd">
              <span className="terminal-card-cmd-prompt">$</span> ls ./completed-projects
            </div>
            <div className="terminal-card-pills">
              {links.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="terminal-card-link"
                >
                  {link.icon && <span>{link.icon}</span>}
                  {link.label} {'>'}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="terminal-card-footer">
        <div className="terminal-card-footer-cmd">
          <span className="terminal-card-cmd-prompt">$</span> work --status <span className="terminal-card-footer-cursor"></span>
        </div>
        <div className="terminal-card-footer-status">
          ○ COMPLETED {statusCount && `· ${statusCount}`}
        </div>
      </div>
    </div>
  );
}
