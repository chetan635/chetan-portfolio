'use client';

import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface CodeBlockProps {
  code: string;
  language: string;
}

export default function CodeBlock({ code, language }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="blog-code-block">
      <div className="blog-code-header">
        <span className="blog-code-lang">{language || 'code'}</span>
        <button
          onClick={handleCopy}
          style={{
            padding: '0.2rem 0.6rem',
            fontSize: '0.75rem',
            margin: 0,
            cursor: 'pointer',
            fontFamily: 'var(--font-body)',
            background: 'rgba(255, 255, 255, 0.07)',
            border: copied ? '1px solid #10b981' : '1px solid rgba(255, 255, 255, 0.15)',
            borderRadius: '4px',
            color: copied ? '#10b981' : '#abb2bf',
            transition: 'all 0.15s ease',
            outline: 'none'
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <SyntaxHighlighter
        language={language?.toLowerCase() || 'javascript'}
        style={atomDark}
        customStyle={{
          margin: 0,
          padding: '1.2rem',
          background: 'transparent',
          fontSize: '0.9rem',
          lineHeight: '1.5',
          fontFamily: 'var(--font-body)'
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}
