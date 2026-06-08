import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Send, Sparkles, User, ShieldAlert, HeartHandshake } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ChatMessage } from "../types";

export function Chatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      sender: "bot",
      text: "Hello! Welcome to our Healthcare NGO support board. How can I help you today? (Try asking about: 'register', 'volunteer', 'services', 'help', or 'contact')",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom on new message
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: Math.random().toString(36).substring(7),
      sender: "user",
      text: text,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");

    // Bot Response Logic (User's Exact Logic)
    const question = text.toLowerCase();
    let responseText = "Sorry, I couldn't understand. Please contact support.";

    if (question.includes("register")) {
      responseText = "Fill out the patient support form to register.";
    } else if (question.includes("volunteer")) {
      responseText = "Volunteer registration opens every month.";
    } else if (question.includes("services")) {
      responseText = "We provide healthcare support, awareness programs and volunteer services.";
    } else if (question.includes("help")) {
      responseText = "Submit your concern through the form and our team will assist you.";
    } else if (question.includes("contact")) {
      responseText = "You can reach our NGO team at support@healthcare.org";
    }

    // Delay bot reply slightly for natural feel
    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Math.random().toString(36).substring(7),
        sender: "bot",
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 450);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendMessage(inputValue);
    }
  };

  // Quick Action Buttons matching user keyword routes
  const quickActions = [
    { label: "Need to Register", keyword: "register" },
    { label: "Become Volunteer", keyword: "volunteer" },
    { label: "Our Services", keyword: "services" },
    { label: "Submit Help Quest", keyword: "help" },
    { label: "Contact Us", keyword: "contact" },
  ];

  return (
    <div className="flex flex-col h-[540px] bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden" id="chatContainer">
      {/* Bot Chat Header */}
      <div className="p-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white flex items-center justify-between border-b border-emerald-700/20">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-teal-500/20 backdrop-blur-md flex items-center justify-center border border-teal-400/20">
            <HeartHandshake className="w-5 h-5 text-emerald-50 text-emerald-100" />
          </div>
          <div>
            <h3 className="font-semibold text-sm tracking-tight text-white">Support Helpdesk Bot</h3>
            <span className="text-[11px] text-emerald-100 flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse inline-block" />
              Active Medical Assistant
            </span>
          </div>
        </div>
        <div className="text-[10px] bg-emerald-500/30 px-2 py-0.5 rounded text-emerald-100 font-mono tracking-wider uppercase">
          Rule Engine
        </div>
      </div>

      {/* Messages Window */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50" id="chatBox">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.2 }}
              className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[85%] flex gap-2 items-start ${
                  msg.sender === "user" ? "flex-row-reverse" : "flex-row"
                }`}
              >
                {/* Avatar Icon */}
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 border ${
                    msg.sender === "user"
                      ? "bg-slate-100 border-slate-200 text-slate-600"
                      : "bg-emerald-50 border-emerald-100 text-emerald-600"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Sparkles className="w-3.5 h-3.5" />
                  )}
                </div>

                {/* Bubble Text */}
                <div className="flex flex-col">
                  <div
                    className={`p-3 rounded-2xl text-xs leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-slate-900 text-white rounded-tr-none"
                        : "bg-white text-slate-700 shadow-sm border border-slate-100 rounded-tl-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[9px] text-slate-400 mt-1 px-1 font-mono">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={chatEndRef} />
      </div>

      {/* Quick Action Suggestions list */}
      <div className="px-4 py-2 border-t border-slate-100 bg-white flex flex-wrap gap-1.5 overflow-x-auto justify-start">
        {quickActions.map((act) => (
          <button
            key={act.keyword}
            onClick={() => handleSendMessage(act.keyword)}
            className="text-[11px] font-medium bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-200 border border-slate-100 text-slate-600 px-2.5 py-1 rounded-full transition-all duration-150 cursor-pointer"
          >
            {act.label}
          </button>
        ))}
      </div>

      {/* Input box */}
      <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2">
        <input
          id="userQuestion"
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Ask register, volunteer, services, contact, or support help..."
          className="flex-1 bg-slate-50 border border-slate-200 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2 text-xs text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
        />
        <button
          onClick={() => handleSendMessage(inputValue)}
          className="w-9 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center transition-all cursor-pointer flex-shrink-0"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
