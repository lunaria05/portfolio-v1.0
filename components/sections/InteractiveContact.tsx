'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  SiGmail, SiLinkedin, SiGithub
} from 'react-icons/si';
import { FaPaperPlane, FaCheckCircle } from 'react-icons/fa';
import { BsTelegram, BsTwitter } from 'react-icons/bs';
import { FaDownload } from 'react-icons/fa6';

// Extend Window interface for GTM dataLayer
declare global {
  interface Window {
    dataLayer: any[];
  }
}

type Message = {
  id: string;
  text: string;
  sender: 'bot' | 'user';
};

type FormStep = 'name' | 'email' | 'message' | 'sending' | 'completed';

type SocialLink = {
  name: string;
  icon: React.ComponentType<{ size?: number }>;
  url: string;
  download?: boolean;
};

export default function ContactSection() {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', text: "Hey! I'm Hiral's AI Assistant 👋", sender: 'bot' },
    { id: '2', text: "Let's get you connected. What's your name?", sender: 'bot' }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [currentStep, setCurrentStep] = useState<FormStep>('name');
  const [isBotTyping, setIsBotTyping] = useState(false);

  const formData = useRef({ name: '', email: '', message: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isBotTyping]);

  const handleResumeClick = () => {
    // Push event to GTM dataLayer
    if (typeof window !== 'undefined' && window.dataLayer) {
      window.dataLayer.push({
        event: 'resume_download',
        event_category: 'engagement',
        event_label: 'Resume Download',
        value: 1
      });
    }
  };

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputValue.trim()) return;

    const userText = inputValue;
    setMessages(prev => [...prev, { id: Date.now().toString(), text: userText, sender: 'user' }]);
    setInputValue('');
    setIsBotTyping(true);

    setTimeout(async () => {
      setIsBotTyping(false);

      if (currentStep === 'name') {
        formData.current.name = userText;
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: `Nice to meet you, ${userText}! ✨ What's your email?`,
          sender: 'bot'
        }]);
        setCurrentStep('email');
      }
      else if (currentStep === 'email') {
        formData.current.email = userText;
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "Perfect! What's on your mind? Tell me about your project 🚀",
          sender: 'bot'
        }]);
        setCurrentStep('message');
      }
      else if (currentStep === 'message') {
        formData.current.message = userText;
        setCurrentStep('sending');

        // Send data to API
        try {
          const response = await fetch('/api/contact', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              name: formData.current.name,
              email: formData.current.email,
              message: formData.current.message,
            }),
          });

          const data = await response.json();

          if (response.ok) {
            setCurrentStep('completed');
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: "Message received! Hiral will get back to you soon 🎉",
              sender: 'bot'
            }]);
          } else {
            setCurrentStep('message');
            setMessages(prev => [...prev, {
              id: Date.now().toString(),
              text: `Oops! Something went wrong: ${data.error || 'Please try again.'}`,
              sender: 'bot'
            }]);
          }
        } catch (error) {
          console.error('Error submitting form:', error);
          setCurrentStep('message');
          setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "Sorry, there was an error sending your message. Please try again or email me directly.",
            sender: 'bot'
          }]);
        }
      }
    }, 1000);
  };

  const socialLinks: SocialLink[] = [
    { name: 'Resume', icon: FaDownload, url: '/hiralvala_resume.pdf', download: true },
    { name: 'GitHub', icon: SiGithub, url: 'https://github.com/Hiralvala563' },
    { name: 'LinkedIn', icon: SiLinkedin, url: 'https://www.linkedin.com/in/hiral-vala-3309b0212/' },
    { name: 'Twitter', icon: BsTwitter, url: 'https://x.com/0xhiral' },
    { name: 'Telegram', icon: BsTelegram, url: 'https://t.me/hiralvala563' },
    { name: 'Email', icon: SiGmail, url: 'mailto:valahiral563@gmail.com' },
  ];

  return (
    <div className="w-full h-full flex items-center justify-center p-4 pointer-events-auto relative">

      {/* Floating Social Icons - Left */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="hidden lg:flex fixed left-8 top-1/2 -translate-y-1/2 flex-col items-center gap-4 z-30"
      >
        <div className="w-px h-12 bg-linear-to-b from-transparent via-[#1aa9da]/30 to-transparent" />
        {socialLinks.map((social, idx) => (
          <motion.a
            key={idx}
            href={social.url}
            {...(social.download ? { download: 'hiralvala_resume.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
            onClick={social.download ? handleResumeClick : undefined}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 + idx * 0.1 }}
            whileHover={{ scale: 1.15, x: 6 }}
            className="group relative w-11 h-11 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-[#1aa9da] hover:border-[#1aa9da] transition-all duration-300 hover:shadow-[0_0_15px_rgba(26,169,218,0.4)]"
          >
            <social.icon size={18} />
            <span className="absolute left-14 bg-[#1aa9da] text-black text-xs px-2 py-1 rounded font-bold opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {social.name}
            </span>
          </motion.a>
        ))}
        <div className="w-px h-12 bg-linear-to-b from-transparent via-[#1aa9da]/30 to-transparent" />
      </motion.div>

      {/* Chat Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl relative"
      >
        {/* Open to Work Badge - Top */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center mb-3"
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-linear-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-full backdrop-blur-md shadow-lg"
          >
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-green-400 text-xs font-semibold">
              Open to Work & Collaborations
            </span>
          </motion.div>
        </motion.div>


        {/* Glow Effects */}
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#1aa9da] opacity-20 blur-[80px] rounded-full" />
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500 opacity-15 blur-[80px] rounded-full" />

        {/* Chat Box */}
        <div className="relative bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 shadow-[0_8px_40px_rgba(0,0,0,0.5)] overflow-hidden h-[420px] md:h-[400px] xl:h-[450px] flex flex-col">

          {/* linear Overlay */}
          <div className="absolute inset-0 bg-linear-to-br from-[#1aa9da]/5 via-transparent to-purple-500/5 pointer-events-none" />

          {/* Header */}
          <div className="relative z-10 flex items-center justify-between px-5 py-4 bg-white/5 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-9 h-9 rounded-full bg-linear-to-br from-[#1aa9da] to-[#60d4f7] flex items-center justify-center text-white font-bold text-xs">
                  HV
                </div>
                <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 rounded-full border-2 border-black" />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">Hiral Vala</h3>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-[10px] text-gray-400">Online</span>
                </div>
              </div>
            </div>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            </div>
          </div>

          {/* Messages */}
          <div className="relative z-10 flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent">
            <AnimatePresence initial={false}>
              {messages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-linear-to-r from-[#1aa9da] to-[#60d4f7] text-black font-medium rounded-br-md shadow-lg'
                      : 'bg-white/5 backdrop-blur-sm border border-white/10 text-gray-200 rounded-bl-md'
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isBotTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-white/5 backdrop-blur-sm border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md flex gap-1">
                    {[0, 0.15, 0.3].map((delay, i) => (
                      <motion.div
                        key={i}
                        animate={{ y: [0, -4, 0] }}
                        transition={{ repeat: Infinity, duration: 0.6, delay }}
                        className="w-1.5 h-1.5 bg-gray-400 rounded-full"
                      />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="relative z-10 p-4 bg-white/5 border-t border-white/10">
            {currentStep === 'completed' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 py-3 bg-green-500/10 border border-green-500/30 rounded-xl text-green-400 text-sm font-semibold"
              >
                <FaCheckCircle /> Conversation Completed
              </motion.div>
            ) : (
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <input
                  type={currentStep === 'email' ? 'email' : 'text'}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={
                    currentStep === 'name' ? "Your name..." :
                    currentStep === 'email' ? "Your email..." :
                    "Your message..."
                  }
                  className="flex-1 bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-[#1aa9da] focus:ring-1 focus:ring-[#1aa9da]/50 transition-all"
                  autoFocus
                />
                <motion.button
                  type="submit"
                  disabled={!inputValue.trim()}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-3 cursor-pointer bg-linear-to-r from-[#1aa9da] to-[#60d4f7] rounded-xl text-black font-semibold disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-[0_0_20px_rgba(26,169,218,0.5)]"
                >
                  <FaPaperPlane size={14} />
                </motion.button>
              </form>
            )}
          </div>

        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-4 md:mt-2 xl:mt-4 space-y-2 md:space-y-0 xl:space-y-1"
        >
          {/* Email CTA */}
          <div className="flex items-center justify-center gap-2 text-center">
            <span className="text-gray-400 text-sm">
              Prefer email? Reach me directly at{' '}
              <a
                href="mailto:valahiral563@gmail.com"
                className="text-[#1aa9da] font-semibold hover:underline decoration-wavy underline-offset-4 transition-all"
              >
                valahiral563@gmail.com
              </a>
            </span>
          </div>

          {/* Privacy Note */}
          <div className="flex items-center justify-center gap-2 text-center px-4">
            <span className="text-gray-500 text-xs">
              🔒 Your details are safe with me. I'll never share your personal information.{' '}
              <span className="text-[#1aa9da] font-medium">Pinky promise! 🤙</span>
            </span>
          </div>
        </motion.div>

        {/* Mobile Social Icons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="lg:hidden flex justify-center gap-2 sm:gap-3 mt-6"
        >
          {socialLinks.map((social, idx) => (
            <motion.a
              key={idx}
              href={social.url}
              {...(social.download ? { download: 'hiralvala_resume.pdf' } : { target: '_blank', rel: 'noopener noreferrer' })}
              onClick={social.download ? handleResumeClick : undefined}
              whileHover={{ scale: 1.1, y: -3 }}
              className="w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center text-white/60 hover:text-[#1aa9da] hover:border-[#1aa9da] transition-all"
            >
              <social.icon size={16} />
            </motion.a>
          ))}
        </motion.div>

      </motion.div>

    </div>
  );
}
