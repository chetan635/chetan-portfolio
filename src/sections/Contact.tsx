'use client';

import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Card from '../components/Card';
import Button from '../components/Button';
import { SECTION_HEADERS, CONTACT_STRINGS } from '../constants';
import { PersonalInfo } from '../data/portfolioData';

interface ContactProps {
  personalInfo: PersonalInfo;
}

const SERVICE_ID = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_5wio7xy";
const TEMPLATE_ID = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_69qw9ip";
const PUBLIC_KEY = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "7XR6F_Aev9GKKtpw5";

export default function Contact({ personalInfo }: ContactProps) {
  const [formData, setFormData] = useState({ from_name: '', from_email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.from_name || !formData.from_email || !formData.message) return;

    setLoading(true);
    setError(null);

    if (formRef.current) {
      emailjs.init(PUBLIC_KEY);
      emailjs.sendForm(SERVICE_ID, TEMPLATE_ID, formRef.current, PUBLIC_KEY)
        .then((result) => {
          console.log('EmailJS Success:', result.text);
          setSubmitted(true);
          setFormData({ from_name: '', from_email: '', message: '' });
          setTimeout(() => setSubmitted(false), 5000);
        }, (err) => {
          console.error('EmailJS Error:', err);
          setError('Failed to send: ' + (err?.text || err?.message || JSON.stringify(err)));
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <section id="contact" className="contact-section timeline-pink">
      <div className="section-timeline-layout">
        <div className="section-timeline-left">
          <div className="section-timeline-dot"></div>
          <div className="section-timeline-line"></div>
        </div>
        
        <div className="section-timeline-right">
          <div className="section-header reveal-on-scroll reveal-slide-up">
            <p className="section-subtitle">{SECTION_HEADERS.CONTACT.subtitle}</p>
            <h2 className="section-title">{SECTION_HEADERS.CONTACT.title}</h2>
          </div>
          
          <div className="grid-2 contact-content reveal-on-scroll reveal-fade">
            <div className="contact-info glass-panel">
              <h3>{CONTACT_STRINGS.HEADING}</h3>
              <p className="contact-description">{CONTACT_STRINGS.DESCRIPTION}</p>
              
              <div className="contact-methods">
                <div className="contact-method-item">
                  <span className="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-svg">
                      <rect width="20" height="16" x="2" y="4" rx="2"/>
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
                    </svg>
                  </span>
                  <div>
                    <h4>{CONTACT_STRINGS.EMAIL_ME}</h4>
                    <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                  </div>
                </div>
                
                <div className="contact-method-item">
                  <span className="method-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="contact-svg">
                      <circle cx="18" cy="5" r="3"/>
                      <circle cx="6" cy="12" r="3"/>
                      <circle cx="18" cy="19" r="3"/>
                      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                    </svg>
                  </span>
                  <div>
                    <h4>{CONTACT_STRINGS.SOCIALS}</h4>
                    <div className="contact-social-links">
                      <a href={personalInfo.github} target="_blank" rel="noopener noreferrer">GitHub</a>
                      <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
                      <a href={personalInfo.twitter} target="_blank" rel="noopener noreferrer">Twitter</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <Card className="contact-form-card">
              {submitted ? (
                <div className="submission-success">
                  <div className="success-icon-wrapper">
                    <svg className="checkmark-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52">
                      <circle className="checkmark-circle" cx="26" cy="26" r="25" fill="none"/>
                      <path className="checkmark-check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                  </div>
                  <h3>{CONTACT_STRINGS.SUCCESS_HEADING}</h3>
                  <p>{CONTACT_STRINGS.SUCCESS_MESSAGE}</p>
                </div>
              ) : (
                <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
                  {error && (
                    <div className="form-error-message" style={{
                      color: '#ef4444',
                      background: 'rgba(239, 68, 68, 0.08)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      padding: '0.75rem 1rem',
                      borderRadius: 'var(--border-radius-sm)',
                      marginBottom: '1.5rem',
                      fontSize: '0.875rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem'
                    }}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"/>
                        <line x1="12" y1="8" x2="12" y2="12"/>
                        <line x1="12" y1="16" x2="12.01" y2="16"/>
                      </svg>
                      {error}
                    </div>
                  )}
                  <div className="form-group">
                    <input 
                      type="text" 
                      id="from_name" 
                      name="from_name" 
                      value={formData.from_name} 
                      onChange={handleChange} 
                      required 
                      placeholder=" "
                    />
                    <label htmlFor="from_name">{CONTACT_STRINGS.LABEL_NAME}</label>
                  </div>
                  
                  <div className="form-group">
                    <input 
                      type="email" 
                      id="from_email" 
                      name="from_email" 
                      value={formData.from_email} 
                      onChange={handleChange} 
                      required 
                      placeholder=" "
                    />
                    <label htmlFor="from_email">{CONTACT_STRINGS.LABEL_EMAIL}</label>
                  </div>
                  
                  <div className="form-group">
                    <textarea 
                      id="message" 
                      name="message" 
                      value={formData.message} 
                      onChange={handleChange} 
                      required 
                      placeholder=" "
                      rows={5}
                    ></textarea>
                    <label htmlFor="message">{CONTACT_STRINGS.LABEL_MESSAGE}</label>
                  </div>
                  
                  <Button type="submit" variant="primary" className="submit-btn" disabled={loading}>
                    {loading ? 'Sending...' : CONTACT_STRINGS.BTN_SEND}
                  </Button>
                </form>
              )}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
