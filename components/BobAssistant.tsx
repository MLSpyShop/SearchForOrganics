import React, { useState, useEffect, useRef, FC } from 'react';
import { 
  MessageSquare, X, Send, Sparkles, Leaf, Trash2, ArrowRight, CornerDownLeft, Info, Key, CheckCircle,
  ShieldAlert, Radio, Flame, ShieldCheck, Eye, Compass
} from 'lucide-react';
import { getBobAssistantResponse, ChatMessage } from '../services/geminiService';
import { cn } from '../src/lib/utils';

// Inline Markdown Renderer for Bob's response formatting
const parseInlineMarkdown = (text: string) => {
  const parts: React.ReactNode[] = [];
  let currentIndex = 0;
  const inlineRegex = /(\*\*.*?\*\*|\[.*?\]\(.*?\))/g;
  const matches = [...text.matchAll(inlineRegex)];

  if (matches.length === 0) {
    return text;
  }

  matches.forEach((match, index) => {
    const matchIndex = match.index ?? 0;
    
    if (matchIndex > currentIndex) {
      parts.push(text.substring(currentIndex, matchIndex));
    }

    const matchText = match[0];
    if (matchText.startsWith('**') && matchText.endsWith('**')) {
      parts.push(
        <strong key={`bold-${index}`} className="font-extrabold text-organic-green-dark">
          {matchText.slice(2, -2)}
        </strong>
      );
    } else if (matchText.startsWith('[') && matchText.includes('](')) {
      const closeBracket = matchText.indexOf(']');
      const label = matchText.substring(1, closeBracket);
      const url = matchText.substring(closeBracket + 2, matchText.length - 1);
      parts.push(
        <a
          key={`link-${index}`}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-organic-green-dark font-black underline hover:text-organic-green transition-colors inline-flex items-center gap-0.5"
        >
          {label}
        </a>
      );
    }

    currentIndex = matchIndex + matchText.length;
  });

  if (currentIndex < text.length) {
    parts.push(text.substring(currentIndex));
  }

  return parts;
};

const renderMarkdown = (text: string) => {
  if (!text) return null;

  const lines = text.split('\n');
  return lines.map((line, idx) => {
    const trimmed = line.trim();

    if (trimmed.startsWith('###')) {
      return (
        <h4 key={idx} className="text-[11px] font-black text-organic-green-dark uppercase tracking-wider mt-4 mb-1">
          {parseInlineMarkdown(trimmed.replace(/^###\s*/, ''))}
        </h4>
      );
    }
    if (trimmed.startsWith('##')) {
      return (
        <h3 key={idx} className="text-xs font-black text-organic-green-dark uppercase tracking-widest mt-5 mb-1.5">
          {parseInlineMarkdown(trimmed.replace(/^##\s*/, ''))}
        </h3>
      );
    }
    if (trimmed.startsWith('#')) {
      return (
        <h2 key={idx} className="text-sm font-black text-organic-green-dark uppercase tracking-widest mt-6 mb-2">
          {parseInlineMarkdown(trimmed.replace(/^#\s*/, ''))}
        </h2>
      );
    }

    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      return (
        <div key={idx} className="flex items-start gap-2 my-1 pl-1">
          <span className="text-organic-green mt-1 text-xs">•</span>
          <span className="text-xs font-medium text-gray-700 leading-relaxed">
            {parseInlineMarkdown(trimmed.substring(2))}
          </span>
        </div>
      );
    }

    if (trimmed.startsWith('>')) {
      return (
        <div key={idx} className="border-l-4 border-organic-green bg-cream/70 p-3 my-2 rounded-r-xl italic text-xs font-semibold text-gray-600">
          {parseInlineMarkdown(trimmed.replace(/^>\s*/, ''))}
        </div>
      );
    }

    if (trimmed === '') {
      return <div key={idx} className="h-1.5"></div>;
    }

    return (
      <p key={idx} className="text-xs font-medium text-gray-700 leading-relaxed my-1">
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });
};

interface BobAssistantProps {
  apiKey: string;
  onOpenApiSettings: () => void;
  isEmbedded?: boolean;
}

export const BobAssistant: FC<BobAssistantProps> = ({ apiKey, onOpenApiSettings, isEmbedded = false }) => {
  const [isOpen, setIsOpen] = useState(isEmbedded);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem('bob_assistant_chat');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const SUGGESTED_PROMPTS = [
    { label: "🕵️‍♂️ Spymaster Briefing", text: "Bob, give me your revolutionary intelligence briefing on the state of organic sovereignty and food liberation." },
    { label: "⚖️ Universal Rights", text: "Explain the Universal Declaration of Organic Rights and why it is considered supreme law over corporate statutes." },
    { label: "🛡️ Expose Greenwash Cartels", text: "How do chemical agribusiness conglomerates disguise conventional crops as 'regenerative', and how do we dismantle their claims?" },
    { label: "📈 Revolutionary SEO Warfare", text: "How do authentic organic businesses weaponize certification data to dominate search rankings against corporate monopolies?" },
    { label: "🧪 Hempoxies™ Bio-Science", text: "Brief me on Hempoxies™ material chemistry and how it liberates manufacturing from petroleum polymers." }
  ];

  useEffect(() => {
    localStorage.setItem('bob_assistant_chat', JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isTyping) return;

    if (!apiKey) {
      setError("Please configure your Gemini API key in the search bar settings first to speak with Organic Bob!");
      return;
    }

    setError(null);
    const userMessage: ChatMessage = { role: 'user', text: textToSend };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getBobAssistantResponse(newMessages, apiKey);
      setMessages(prev => [...prev, { role: 'assistant', text: response.text }]);
    } catch (err: any) {
      console.error("Bob Assistant error:", err);
      
      let errorMessage = "Organic Bob is temporarily offline. Please verify your API Key and try again.";
      if (err.message && err.message.includes("quota exceeded")) {
        errorMessage = "Organic Bob is currently busy. Please wait about 60 seconds and try again.";
      } else if (err instanceof Error) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setIsTyping(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm("Are you sure you want to clear your conversation with Organic Bob?")) {
      setMessages([]);
      setError(null);
    }
  };

  return (
    <div className={cn(
      isEmbedded ? "w-full h-full" : "fixed top-2 right-6 z-[90]",
      "font-sans"
    )}>
      {/* Closed Button (FAB) */}
      {!isOpen && !isEmbedded && (
        <button
          onClick={() => setIsOpen(true)}
          className="relative group flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-emerald-950 via-stone-900 to-red-950 text-white shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 border-2 border-emerald-400/40"
          title="Chat with Organic Bob - Organic Spymaster"
        >
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-500"></span>
          </span>
          <div className="relative flex flex-col items-center justify-center leading-none -space-y-0.5">
            <span className="text-[7px] font-black uppercase tracking-[0.15em] text-emerald-300">ORGANIC</span>
            <span className="text-sm font-black uppercase tracking-tight text-white">BOB</span>
          </div>
          
          {/* Tooltip on hover */}
          <div className="absolute right-20 bg-stone-950 text-white text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-2xl whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-xl pointer-events-none border border-emerald-500/30">
            Organic Bob • Spymaster
          </div>
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className={cn(
            isEmbedded ? "w-full h-full border-none shadow-none" : "bg-white rounded-[2.5rem] shadow-3xl w-full max-w-[380px] sm:max-w-[420px] h-[560px] md:h-[620px] border border-stone-800/20 animate-in zoom-in-95 duration-300",
            "flex flex-col overflow-hidden"
        )}>
          
          {/* Header */}
          {!isEmbedded && (
            <div className="bg-gradient-to-r from-stone-950 via-emerald-950 to-red-950 text-white p-4 sm:p-5 flex items-center justify-between shadow-md border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-emerald-400/30 relative">
                <ShieldAlert className="w-5 h-5 text-emerald-400" />
                <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-stone-950 animate-pulse"></div>
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-xs font-black uppercase tracking-widest leading-none text-white">Organic Bob</h3>
                  <span className="px-1.5 py-0.5 bg-red-900/60 text-red-300 text-[8px] font-black uppercase rounded tracking-wider border border-red-700/50">Spymaster</span>
                </div>
                <p className="text-[9px] text-emerald-300/80 font-bold uppercase tracking-wider mt-1">
                  Organic Spymaster • Revolutionary Intel
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {messages.length > 0 && (
                <button
                  onClick={handleClearChat}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white"
                  title="Clear Chat History"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-xl transition-colors text-white/80 hover:text-white"
                title="Close chat"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          )}

          {/* Chat Body */}
          <div 
            ref={chatContainerRef}
            className="flex-grow overflow-y-auto p-5 space-y-4 bg-stone-50/70 custom-scrollbar flex flex-col"
          >
            {/* Welcome message when no chat exists */}
            {messages.length === 0 && (
              <div className="space-y-4 animate-in fade-in duration-500">
                <div className="bg-white p-5 rounded-[2rem] border border-stone-200 shadow-sm space-y-3">
                  <div className="flex items-center gap-2">
                    <Radio className="w-4 h-4 text-red-600 animate-pulse" />
                    <p className="text-xs font-black text-stone-900 uppercase tracking-wider">Operational Briefing • Spymaster Bob</p>
                  </div>
                  <p className="text-xs font-medium text-stone-700 leading-relaxed">
                    I am <strong>Organic Bob, an organic spymaster</strong> and revolutionary intelligence operative. I specialize in exposing chemical cartels, defending the <strong>Universal Declaration of Organic Rights</strong>, empowering independent soil growers, weaponizing <strong>Organic SEO</strong>, and advancing bio-composite materials like <strong>Hempoxies™</strong>.
                  </p>
                  <div className="border-t border-stone-100 pt-3 space-y-2">
                    <p className="text-[10px] font-black text-stone-400 uppercase tracking-widest">Active Intelligence Portfolios:</p>
                    <ul className="space-y-1.5 text-xs text-stone-700 font-bold">
                      <li className="flex items-center gap-2">
                        <span className="text-red-500">⚔️</span> Universal Declaration of Organic Rights (Supreme Law)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-600">🛡️</span> Counter-Intelligence & Greenwashing Deconstruction
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-sky-600">🚀</span> Revolutionary SEO & Organic Search Dominance
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-amber-600">🧪</span> Hempoxies™ Materials Science & Carbon Sequestration
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-2">
                  <p className="text-[9px] font-black text-stone-400 uppercase tracking-[0.25em] px-2">Tactical Inquiries</p>
                  <div className="grid grid-cols-1 gap-2">
                    {SUGGESTED_PROMPTS.map((prompt, i) => (
                      <button
                        key={i}
                        onClick={() => handleSend(prompt.text)}
                        className="text-left bg-white border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/30 p-3.5 rounded-2xl text-[11px] font-black text-stone-700 hover:text-emerald-900 transition-all duration-200 shadow-sm flex items-center justify-between group active:scale-98"
                      >
                        <span>{prompt.label}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-stone-400 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Message Feed */}
            {messages.map((message, i) => (
              <div
                key={i}
                className={`flex flex-col max-w-[88%] ${
                  message.role === 'user' ? 'self-end items-end' : 'self-start items-start'
                } animate-in fade-in duration-300`}
              >
                <span className="text-[9px] font-black text-stone-400 uppercase tracking-widest mb-1 px-2">
                  {message.role === 'user' ? 'Operative (You)' : 'Organic Bob (Spymaster)'}
                </span>
                <div
                  className={`p-4 rounded-[1.8rem] text-xs shadow-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-stone-900 text-white rounded-tr-none'
                      : 'bg-white text-stone-800 rounded-tl-none border border-stone-200'
                  }`}
                >
                  {message.role === 'user' ? (
                    <p className="font-semibold">{message.text}</p>
                  ) : (
                    <div className="space-y-1">
                      {renderMarkdown(message.text)}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* typing indicator */}
            {isTyping && (
              <div className="self-start flex flex-col items-start max-w-[85%] animate-pulse">
                <span className="text-[9px] font-black text-red-500 uppercase tracking-widest mb-1 px-2">Bob is decrypting & analyzing intel...</span>
                <div className="bg-white border border-stone-200 p-4 rounded-[1.8rem] rounded-tl-none flex items-center gap-1.5 shadow-sm">
                  <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-emerald-600 rounded-full animate-bounce delay-100"></div>
                  <div className="w-1.5 h-1.5 bg-stone-800 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            )}

            {/* Error state */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs font-black text-red-800 space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 uppercase tracking-wider">
                  <Info className="w-4 h-4 shrink-0" />
                  <span>Security & Connection Notice</span>
                </div>
                <p className="font-bold leading-normal text-red-700">{error}</p>
                {!apiKey && (
                  <button
                    onClick={onOpenApiSettings}
                    className="w-full mt-1 flex items-center justify-center gap-2 bg-red-800 hover:bg-red-900 text-white py-2.5 rounded-xl transition-colors uppercase tracking-widest text-[9px]"
                  >
                    <Key className="w-3.5 h-3.5" />
                    Configure Gemini Intelligence Key
                  </button>
                )}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggestion tags if chat is active but we want shortcuts */}
          {messages.length > 0 && !isTyping && (
            <div className="px-5 py-2 border-t border-stone-100 bg-stone-100/60 flex gap-2 overflow-x-auto whitespace-nowrap scrollbar-none">
              <button
                onClick={() => handleSend("What is the revolutionary SEO strategy with Rank Organically?")}
                className="inline-flex items-center gap-1 bg-white border border-stone-200 text-[10px] font-black text-stone-600 hover:text-emerald-700 hover:border-emerald-600 px-3 py-1.5 rounded-full transition-all shrink-0 shadow-sm"
              >
                <span>⚔️ SEO Warfare</span>
              </button>
              <button
                onClick={() => handleSend("How does the Universal Declaration of Organic Rights protect small farmers?")}
                className="inline-flex items-center gap-1 bg-white border border-stone-200 text-[10px] font-black text-stone-600 hover:text-emerald-700 hover:border-emerald-600 px-3 py-1.5 rounded-full transition-all shrink-0 shadow-sm"
              >
                <span>📜 Supreme Rights</span>
              </button>
              <button
                onClick={() => handleSend("What are the latest intelligence alerts on PFAS contamination?")}
                className="inline-flex items-center gap-1 bg-white border border-stone-200 text-[10px] font-black text-stone-600 hover:text-emerald-700 hover:border-emerald-600 px-3 py-1.5 rounded-full transition-all shrink-0 shadow-sm"
              >
                <span>🚨 PFAS Recon</span>
              </button>
            </div>
          )}

          {/* Footer Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="p-4 bg-white border-t border-stone-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Spymaster Bob for revolutionary intelligence..."
              disabled={isTyping}
              className="flex-grow px-4 py-3 rounded-2xl border border-stone-300 focus:border-emerald-600 focus:outline-none text-xs font-black bg-white disabled:bg-stone-50 disabled:text-stone-400"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="p-3 bg-stone-950 hover:bg-emerald-900 text-white rounded-2xl transition-all shadow-md active:scale-95 disabled:bg-stone-200 disabled:text-stone-400 disabled:shadow-none shrink-0"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

        </div>
      )}
    </div>
  );
};
