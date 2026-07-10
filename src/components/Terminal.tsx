'use client';

import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { portfolioData } from '../data/portfolioData';

interface TerminalProps {
  latestPosts: any[];
}

const APPLE_ASCII = `                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                      :: ..*=+#%*---+:--                                                                  
                                                                 .+=:..   ... ::--++=+: .....                                                             
                                                               +*#*+--=+++##*=+**##@@@@%+.      -                                                         
                                                             =#**.=*+*#@@@@###***#%%@@@@@@#*: .                                                           
                                                            @=..=+#@@@@@@@@@@@@@@@@@@@@@@@@@@#+     .                                                     
                                                          +=.:.+@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#+    .                                                    
                                                         -=-.-#@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@#:   :.                                                  
                                                        .+:.=*@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=:-=-                                                  
                                                        :***#%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%=.-=.                                                 
                                                        *%%##@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*+--:                                                 
                                                       .+##%%@%%@@%%#%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#=-:                                                 
                                                       :+*##%@@%%%%%#%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@%%#=-                   ............................  
                                                        =*##@@@@@%%%@@%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%*:::.::::::....:::::::::--:::-------------:::----  
                                                        =+#%%%%%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@%#-----------------------------=-===------------==  
                          ... .........::..:::::::::::. =+%@@@%@@@@@@@@#%%@@@@@@@@@@@@@@@@@@@@@@@@@@@@@*.=------==----=====================------=======  
     .  .........::::.:::::::::::::::::-----:::::::::--:-+%%%%@@#-..       -=#%%%@@@%%%#+=++*#%@@@@@@@@*====-----=======================================  
  ........::::::::::::::::-::::----------------------#@+-+%%%%*   .-=+=:    .-+*####*=:        :::#@@@%+-===============================================  
  ...:::::::::--------------------------------------+ =#=#@%%+---==-...   ...:=*%%#+=:..::=*###*+- *@@%-====--=============================------=======  
  ...::::::::--------:::---------------------------+::-==%@@%+-.        -: ::-+#@@@%+:      :+. =++#@@%*@#*=----=====---====================-----=--=---  
  ...:....::::::::::::::::::::::::::-::::----------#:+*==%@@%*=----=+==+##+=+*##@@@%#++#+.  :=  .:+#@@@%. %=----==----=============-========------------  
  .............:::::::::::::::::::::::::-----------*-*#--%@@@@@%++-.   .-+**####@@@%#%#=::=***+==+*%@@@##:++-=---====-=============--======-------------  
  ..............:::::::::::::::::::::::------------=-+*+#%@@@@@@@@%@@@@%%###+*##@@@@#%@@@%@%%%#%@@@@@@%+@=++=-----------============--------------------  
     ............:::::::::::::::::::::::::::::::::--*+*+*%@@@@@@@@@@@@@@@@***+#%@@@@@##@@@@@@@@@@@@@@@%=#+#=------------============-=------------------  
       ..   .....::::::::::::::::::::::::::::::::::-%#@@*#%#%@@@@@@@@@%#+=*%@#%@@@@@@@@%*%@@@@@@@@@@@@%+@++=---------------==----======-----------------  
          .........:::::::::::::::::::::::-----:::::*@@#*#***##%%%%%%#+:-*=-: :=**+==#%%--*%@@@@@@@@@@@@@@===-------========-============---------------  
          .........::::::::::::::::::::::-------:::::@@@*++===+*****=-:=##=:          =#@*-**%@@@@%#%%%@@@=-------------==-=============----------------  
         ...........:::::::::::::::::::::-------:::::-#*+=====---=-. ::.              .-+#=--=##%#*##%#@@%=--------------=---============---------------  
          ..............::::::::::::::::::::-:::::::::-====-===+==-.    :=++*+++: =*+==:.  -===+++***##@*=-------------------============--------------:  
      .   .......................:::::::::::::::::::::--==-==-==***:       .=.=- ..::--=.    =*+++++*++-=-----------------------=========--------------:  
      .   .................:......::::::::::::::::::::--.---======*=  =+-:#:--@@@@@@@-*      +*+++++++=---------------------------=====--------------:::  
             ...  ...................::::::::::::::::::: .::-====--- .+**+-=#%%#####%**#%*- =+===+++++--------------------=----------------------::::::.  
                    ...............:..::::::::::::::::::   . :----:  -+#+=++=::=+=--+###%#: :===+===---------------------------------------------::::::.  
                    ..............:=#@@@@@@@@@@@@@@@@@@@+             .++++-:       -*%%%++  :-=-.:. -----------------------------------------:---:-::::  
                   ..............:=@@@@@@@@@@@@@@@@@@@@@@=.           .+%###*+=-==*#%%%#+:.         ----------------------------------------------::::::  
                   ....   ........*@@@@@@@@@@@@@@@@@@@@@@*=+           .+#%@%#+*#*%@@@#+-          ----------------------------------------------:::::::  
                    ..     .......+@@@@@@@@@@@@@@@@@@@@@@#=+-             =+-==*+*+#*+.          ::---------------------------------------------::::::::  
                           .......=@@@@@@@@@@@@@@@@@@@@@@*=+=-.               ..:  .:          :----:----------------------::::-------:-:-::----::::::::  
                           .......-@@@@@@@@@@@@@@@@@@@# +@%+=--:.                            .-+.::-::::::--::::-----------:::::::::::::-:::::::::::::::  
                            ......:@@@@@@@@@@@@@@@@-.  @@@#+====-:                          :-=*@@.--::::::::::::-::::::-:-:::::::::::::::::::::::::::::  
                                  :@@@@@@@@@@@@*:.     =@@#+===---=:.                    .:-==+*@#* ::=+=--:::::::::::::::::::::::::.::::::::::::::.::.:  
                                  .*@@@@@@*:. . ..      .%%+++++=-----:..            .::-====++#@=%    :==++++-::::::::::::::::::::..:::::::::::::::::::  
                                   .-:.                   +#****++=-------:.       .:---====++*@@#*    .::-==+====-:::::::::::::::....:::::::::::::::...  
                                .:                          *##***++===---:::....::---====+++*@@%%     ...:--::--=-===::::::::::::....:::::::.:::::::...  
                             .. .                             *#%%**++=====---::::::---===+#%%%%=      ....:-:::-:---====::::::::::..:::::::::..........  
                          .....                                 +%#####*****+====-====+*###%%%#        .. .....:--:::--=====-----:::..:::::.............  
                      .:...... .                                   :%%%%%%%####*****#######*.         .    .....:..:.:::---====--:::::::::.....:........  
                   .::::::.......                                         -*%%%@%%%*-                     . ... .......::::---==+=:::::.................  
                .--:::::....  .                                                                                     .........::----=-::.................  
              :=-:..:.                                                                                                 .  . ....:::--=-:..........    ..  
           .--::...                                                                                                            .....:::-::::......     .  
         .--::..                                                                                                                 :.  ....-:.......        
        --:...                                                                                                                    .   . . :-.....         
      .-:....                                                                                                                              .:.            
        . .                                                                                                                                 .:.           
                                                                                                                                             . .          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                           :                              
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                          
                                                                                                                                                       :  
                                                                                                                                                      =*  
                                                                                                                                                      =*  
                                                                                                                                                          
                                                                                                                                                          `;

const WhoamiComponent = ({ portfolioData }: { portfolioData: any }) => {
  const [lcStats, setLcStats] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    const fetchStats = async () => {
      try {
        const username = 'chetanchinchulkar635';
        const cacheKey = `leetcode_stats_basic_${username}`;
        const cached = localStorage.getItem(cacheKey);

        if (cached) {
          const { timestamp, data } = JSON.parse(cached);
          if (Date.now() - timestamp < 7200000) {
            if (mounted) setLcStats(data);
            return;
          }
        }

        const solvedRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}/solved`);
        const solvedData = await solvedRes.json();
        const profileRes = await fetch(`https://alfa-leetcode-api.onrender.com/${username}`);
        const profileData = await profileRes.json();

        const data = {
          solved: solvedData.solvedProblem || 0,
          ranking: profileData.ranking || 0,
          easy: solvedData.easySolved || 0,
          medium: solvedData.mediumSolved || 0,
          hard: solvedData.hardSolved || 0,
        };

        localStorage.setItem(cacheKey, JSON.stringify({ timestamp: Date.now(), data }));
        if (mounted) setLcStats(data);
      } catch (err) {
        console.error(err);
        if (mounted) setLcStats({ error: true });
      }
    };
    fetchStats();
    return () => { mounted = false; };
  }, []);

  return (
    <div className="neofetch-container">
      <div className="neofetch-ascii">
        <pre>{APPLE_ASCII}</pre>
      </div>
      <div className="neofetch-info">
        <div className="neofetch-title">
          <span className="neofetch-user">chetan@dev</span> <span className="neofetch-divider">------------------------------------</span>
        </div>

        <div className="neofetch-row"><span className="neofetch-key">. OS:</span><span className="neofetch-dots"></span><span className="neofetch-val">macOS 14.5, Linux</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Uptime:</span><span className="neofetch-dots"></span><span className="neofetch-val">24 years, 3 months, 12 days</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Host:</span><span className="neofetch-dots"></span><span className="neofetch-val">Innovate AI / ByteCraft</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Kernel:</span><span className="neofetch-dots"></span><span className="neofetch-val">Full Stack Developer & AI Engineer</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. IDE:</span><span className="neofetch-dots"></span><span className="neofetch-val">VSCode, Cursor, NeoVim</span></div>

        <br />

        <div className="neofetch-row"><span className="neofetch-key">. Languages.Programming:</span><span className="neofetch-dots"></span><span className="neofetch-val">TypeScript, JavaScript, Python</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Languages.Computer:</span><span className="neofetch-dots"></span><span className="neofetch-val">HTML, CSS, JSON, YAML</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Languages.Real:</span><span className="neofetch-dots"></span><span className="neofetch-val">English, Hindi</span></div>

        <br />

        <div className="neofetch-row"><span className="neofetch-key">. Hobbies.Software:</span><span className="neofetch-dots"></span><span className="neofetch-val">Open Source, AI Models</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Hobbies.Hardware:</span><span className="neofetch-dots"></span><span className="neofetch-val">Mechanical Keyboards, IoT</span></div>

        <br />
        <div className="neofetch-subtitle">- Contact -----------------------------------------</div>
        <div className="neofetch-row"><span className="neofetch-key">. Email.Personal:</span><span className="neofetch-dots"></span><span className="neofetch-val">{portfolioData.personalInfo.email}</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. LinkedIn:</span><span className="neofetch-dots"></span><span className="neofetch-val">ChetanDev</span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Twitter:</span><span className="neofetch-dots"></span><span className="neofetch-val">chetan_dev</span></div>

        <br />
        <div className="neofetch-subtitle">- LeetCode Stats ---------------------------------------</div>
        <div className="neofetch-row"><span className="neofetch-key">. Ranking:</span><span className="neofetch-dots"></span><span className="neofetch-val">
          {lcStats ? (lcStats.error ? 'Failed to load' : lcStats.ranking.toLocaleString()) : 'Loading...'}
        </span></div>
        <div className="neofetch-row"><span className="neofetch-key">. Solved:</span><span className="neofetch-dots"></span><span className="neofetch-val">
          {lcStats ? (lcStats.error ? 'Failed to load' : `${lcStats.solved} ( `) : 'Loading...'}
        </span></div>
      </div>
    </div>
  );
};
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
        output: <WhoamiComponent portfolioData={portfolioData} />
      }
    ];
    setHistory(initialHistory);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'auto' });
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
              <div style={{ fontWeight: 'bold' }}>ls about</div><div>— view about info</div>
              <div style={{ fontWeight: 'bold' }}>ls projects</div><div>— list projects</div>
              <div style={{ fontWeight: 'bold' }}>ls blog</div><div>— list blog posts</div>
              <div style={{ fontWeight: 'bold' }}>ls socials</div><div>— list social links</div>
              <div style={{ fontWeight: 'bold' }}>cd about</div><div>— go to about page</div>
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
      case 'ls about':
        output = (
          <div className="terminal-list-about">
            <p className="terminal-blue-text" style={{ fontWeight: 'bold' }}>About Me:</p>
            <p className="terminal-gray-text" style={{ lineHeight: '1.6' }}>{portfolioData.personalInfo.bio}</p>
            <br />
          </div>
        );
        break;
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
      case 'cd about':
        output = <p className="terminal-gray-text">Navigating to about...</p>;
        router.push('/about');
        break;
      case 'cd projects':
        output = <p className="terminal-gray-text">Navigating to projects...</p>;
        router.push('/projects');
        break;
      case 'cd blog':
      case 'cd blogs':
        output = <p className="terminal-gray-text">Navigating to blog...</p>;
        router.push('/blogs');
        break;
      case 'cd cv':
        output = <p className="terminal-gray-text">Navigating to CV...</p>;
        router.push('/cv');
        break;
      case 'cd leetcode':
      case 'leetcode':
        output = <p className="terminal-gray-text">Navigating to LeetCode Stats...</p>;
        router.push('/leetcode');
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
        output = <WhoamiComponent portfolioData={portfolioData} />;
        break;
      case 'contact':
        output = <p className="terminal-gray-text">Navigating to contact...</p>;
        router.push('/contact');
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
        {/* Terminal Header Removed */}

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
