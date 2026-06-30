'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { portfolioData } from '../data/portfolioData';

interface TerminalProps {
  latestPosts: any[];
}

const ASCII_ART = ` ██████  ██   ██ ███████ ████████  █████  ███    ██     ██████  ███████ ██    ██
██       ██   ██ ██         ██    ██   ██ ████   ██     ██   ██ ██      ██    ██
██       ███████ █████      ██    ███████ ██ ██  ██     ██   ██ █████   ██    ██
██       ██   ██ ██         ██    ██   ██ ██  ██ ██     ██   ██ ██       ██  ██
 ██████  ██   ██ ███████    ██    ██   ██ ██   ████  ██ ██████  ███████   ████`;

export default function Terminal({ latestPosts }: TerminalProps) {
  const router = useRouter();
  const [history, setHistory] = useState<Array<{ command: string; output: React.ReactNode }>>([]);
  const [input, setInput] = useState('');
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Focus input on load
  useEffect(() => {
    inputRef.current?.focus();

    // Setup initial boot scrollback to feel like a real programmer's tool
    const initialHistory = [
      {
        command: '',
        output: (
          <div className="terminal-welcome">
            <p className="terminal-gray-text">Last login: {new Date().toDateString()} on ttys001</p>
            <p className="terminal-gray-text">Type <span className="terminal-highlight-text">help</span> to view available commands.</p>
            <br />
          </div>
        )
      },
      {
        command: 'whoami',
        output: (
          <div className="terminal-whoami">
            <pre className="terminal-ascii-art">{ASCII_ART}</pre>
            <div className="terminal-details-grid">
              <div className="terminal-green-text" style={{ fontWeight: 'bold' }}>ROLE</div>
              <div>Full Stack Developer & AI Engineer</div>

              <div className="terminal-green-text" style={{ fontWeight: 'bold' }}>LOC</div>
              <div>San Francisco, CA</div>

              <div className="terminal-green-text" style={{ fontWeight: 'bold' }}>STACK</div>
              <div>React · Next.js · Node.js · TypeScript · Python · Docker · AWS</div>
            </div>
            <br />
          </div>
        )
      }
    ];
    setHistory(initialHistory);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const trimmedInput = input.trim();
      if (!trimmedInput) return;

      const lowerInput = trimmedInput.toLowerCase();

      // Add to command history
      const newCommandHistory = [input, ...commandHistory];
      setCommandHistory(newCommandHistory);
      setHistoryIndex(-1);

      // Execute command
      executeCommand(lowerInput, input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < commandHistory.length) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = historyIndex - 1;
      if (nextIndex >= 0) {
        setHistoryIndex(nextIndex);
        setInput(commandHistory[nextIndex]);
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const executeCommand = (cmd: string, originalCmd: string) => {
    let output: React.ReactNode = null;

    switch (cmd) {
      case 'help':
        output = (
          <div className="terminal-command-help">
            <p className="terminal-blue-text" style={{ fontWeight: 'bold' }}>Available commands:</p>
            <div className="terminal-help-grid">
              <div style={{ fontWeight: 'bold' }}>ls products</div><div>— list products / apps</div>
              <div style={{ fontWeight: 'bold' }}>ls projects</div><div>— list projects</div>
              <div style={{ fontWeight: 'bold' }}>ls blog</div><div>— list blog posts</div>
              <div style={{ fontWeight: 'bold' }}>ls socials</div><div>— list social links</div>
              <div style={{ fontWeight: 'bold' }}>cd products</div><div>— go to products</div>
              <div style={{ fontWeight: 'bold' }}>cd projects</div><div>— go to projects</div>
              <div style={{ fontWeight: 'bold' }}>cd blog</div><div>— go to blog</div>
              <div style={{ fontWeight: 'bold' }}>cat cv</div><div>— quick CV overview</div>
              <div style={{ fontWeight: 'bold' }}>cd cv</div><div>— view full CV</div>
              <div style={{ fontWeight: 'bold' }}>cd leetcode</div><div>— view LeetCode stats</div>
              <div style={{ fontWeight: 'bold' }}>cd home</div><div>— go home</div>
              <div style={{ fontWeight: 'bold' }}>whoami</div><div>— who am I?</div>
              <div style={{ fontWeight: 'bold' }}>contact</div><div>— get in touch</div>
              <div style={{ fontWeight: 'bold' }}>clear</div><div>— clear terminal</div>
              <div style={{ fontWeight: 'bold' }}>help</div><div>— show this message</div>
            </div>
            <br />
          </div>
        );
        break;
      case 'ls products':
      case 'ls projects':
        output = (
          <div className="terminal-list-projects">
            {portfolioData.projects.map((proj) => (
              <div key={proj.id} className="terminal-project-item">
                <span className="terminal-green-text" style={{ fontWeight: 'bold' }}>&gt; {proj.title}</span> — {proj.description}
                <div style={{ fontSize: '0.75rem', opacity: 0.6, paddingLeft: '1rem', marginTop: '0.1rem' }}>
                  Stack: {proj.tags.join(', ')}
                </div>
              </div>
            ))}
            <br />
          </div>
        );
        break;
      case 'ls blog':
      case 'ls blogs':
        output = (
          <div className="terminal-list-blogs">
            <p className="terminal-blue-text" style={{ fontWeight: 'bold' }}>Latest Blogs:</p>
            {latestPosts && latestPosts.length > 0 ? (
              latestPosts.map((post) => (
                <div key={post.id} className="terminal-blog-item" style={{ marginTop: '0.25rem' }}>
                  - <span className="terminal-yellow-text">{post.title}</span> ({post.date})
                </div>
              ))
            ) : (
              <div>No posts found. Run cd blog to see more details!</div>
            )}
            <br />
          </div>
        );
        break;
      case 'ls socials':
        output = (
          <div className="terminal-socials">
            <div><a href={portfolioData.personalInfo.github} target="_blank" rel="noopener noreferrer" className="terminal-link-hover">github</a></div>
            <div><a href={portfolioData.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="terminal-link-hover">linkedin</a></div>
            <div><a href={portfolioData.personalInfo.twitter} target="_blank" rel="noopener noreferrer" className="terminal-link-hover">twitter</a></div>
            <div><a href={`mailto:${portfolioData.personalInfo.email}`} className="terminal-link-hover">email</a></div>
            <br />
          </div>
        );
        break;
      case 'cd products':
      case 'cd projects':
        output = <p className="terminal-gray-text">Navigating to projects...</p>;
        setTimeout(() => router.push('/projects'), 600);
        break;
      case 'cd blog':
      case 'cd blogs':
        output = <p className="terminal-gray-text">Navigating to blog...</p>;
        setTimeout(() => router.push('/blogs'), 600);
        break;
      case 'cd cv':
        output = <p className="terminal-gray-text">Navigating to CV...</p>;
        setTimeout(() => router.push('/cv'), 600);
        break;
      case 'cd leetcode':
      case 'leetcode':
        output = <p className="terminal-gray-text">Navigating to LeetCode Stats...</p>;
        setTimeout(() => router.push('/leetcode'), 600);
        break;
      case 'cat cv':
        output = (
          <div className="terminal-cv">
            <p className="terminal-blue-text" style={{ fontWeight: 'bold' }}>CV Overview - {portfolioData.personalInfo.name}</p>
            <p className="terminal-yellow-text">{portfolioData.personalInfo.title}</p>
            <p className="terminal-gray-text" style={{ marginTop: '0.5rem' }}>{portfolioData.personalInfo.bio}</p>
            <br />
            <p className="terminal-blue-text" style={{ fontWeight: 'bold' }}>Experience:</p>
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="terminal-cv-exp">
                <span className="terminal-green-text" style={{ fontWeight: 'bold' }}>{exp.role}</span> at <span style={{ fontWeight: 'bold' }}>{exp.company}</span> ({exp.period})
                <div style={{ marginLeft: '1rem', fontSize: '0.75rem', opacity: 0.75 }}>{exp.description}</div>
              </div>
            ))}
            <br />
          </div>
        );
        break;
      case 'cd home':
        setHistory([
          {
            command: '',
            output: (
              <div className="terminal-welcome">
                <p className="terminal-gray-text">Last login: {new Date().toDateString()} on ttys001</p>
                <p className="terminal-gray-text">Type <span className="terminal-highlight-text">help</span> to view available commands.</p>
                <br />
              </div>
            )
          }
        ]);
        return;
      case 'whoami':
        output = (
          <div className="terminal-whoami">
            <pre className="terminal-ascii-art">{ASCII_ART}</pre>
            <div className="terminal-details-grid">
              <div className="terminal-green-text" style={{ fontWeight: 'bold' }}>ROLE</div>
              <div>Full Stack Developer & AI Engineer</div>

              <div className="terminal-green-text" style={{ fontWeight: 'bold' }}>LOC</div>
              <div>San Francisco, CA</div>

              <div className="terminal-green-text" style={{ fontWeight: 'bold' }}>STACK</div>
              <div>React · Next.js · Node.js · TypeScript · Python · Docker · AWS</div>
            </div>
            <br />
          </div>
        );
        break;
      case 'contact':
        output = <p className="terminal-gray-text">Navigating to contact...</p>;
        setTimeout(() => router.push('/contact'), 600);
        break;
      case 'clear':
        setHistory([]);
        return;
      default:
        output = <p className="terminal-red-text">Command not found: '{originalCmd}'. Type 'help' for available commands.</p>;
        break;
    }

    setHistory((prev) => [...prev, { command: originalCmd, output }]);
  };

  return (
    <div className="terminal-wrapper" onClick={handleTerminalClick}>
      <div className="terminal-window">
        {/* Terminal Header */}
        <div className="terminal-bar">
          <div className="terminal-window-dots">
            <span className="terminal-window-dot red"></span>
            <span className="terminal-window-dot yellow"></span>
            <span className="terminal-window-dot green"></span>
          </div>
          <div className="terminal-title">visitor@Chetandev: ~</div>
        </div>

        {/* Terminal History */}
        <div className="terminal-body">
          {history.map((item, idx) => (
            <div key={idx} className="terminal-history-item">
              {item.command && (
                <div className="terminal-prompt-line">
                  <span className="terminal-prompt-prefix">visitor@Chetandev:~$</span>
                  <span className="terminal-command-text">{item.command}</span>
                </div>
              )}
              <div className="terminal-output">
                {item.output}
              </div>
            </div>
          ))}

          {/* Current Prompt Input */}
          <div className="terminal-prompt-line">
            <span className="terminal-prompt-prefix">visitor@Chetandev:~$</span>
            <input
              ref={inputRef}
              type="text"
              className="terminal-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              autoFocus
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
          <div ref={terminalEndRef} />
        </div>
      </div>
    </div>
  );
}
