import React, { useState } from 'react';
import { Heart, MessageCircle, Send, X, Sparkles, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

interface Wish {
  id: number;
  name: string;
  content: string;
  isHighlight?: boolean;
}

interface FlyingHeart {
    id: number;
    left: number;
    size: number;
    duration: number;
    delay: number;
}

// Mock initial data
const initialWishes: Wish[] = [
  
];

export const Wishes: React.FC = () => {
  // Logic states
  const [wishes, setWishes] = useState<Wish[]>(initialWishes);
  const [showInput, setShowInput] = useState(false);
  const [showComments, setShowComments] = useState(true); // Toggle state
  const [flyingHearts, setFlyingHearts] = useState<FlyingHeart[]>([]);
  
  // Input form states
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  // Combine list for loop effect
  const displayWishes = [...wishes, ...wishes]; // Duplicate for seamless loop

  const triggerHeart = () => {
    // Spawn a burst of hearts (e.g., 15 hearts)
    const newHearts: FlyingHeart[] = Array.from({ length: 15 }).map((_, i) => ({
        id: Date.now() + i,
        left: Math.random() * 100, // 0 to 100% viewport width
        size: Math.random() * 20 + 15, // Size between 15px and 35px
        duration: Math.random() * 3 + 4, // Duration between 4s and 7s
        delay: Math.random() * 0.5 // Random start delay
    }));
    
    setFlyingHearts(prev => [...prev, ...newHearts]);
    
    // Cleanup heart after animation (max duration + buffer)
    setTimeout(() => {
        setFlyingHearts(prev => prev.filter(h => !newHearts.find(nh => nh.id === h.id)));
    }, 8000);
  };

  const handleGenerateWish = async () => {
    if (!process.env.API_KEY) {
        alert("API Key not found.");
        return;
    }
    setIsGenerating(true);
    try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const prompt = `Write a short, romantic wedding wish (Vietnamese) under 15 words. Casual and sweet.`;
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: prompt,
        });
        if (response.text) setMessage(response.text.trim());
    } catch (error) {
        setMessage("Chúc trăm năm hạnh phúc!");
    } finally {
        setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;
    
    const newWish = { id: Date.now(), name, content: message, isHighlight: true };
    setWishes(prev => [newWish, ...prev]);
    setName('');
    setMessage('');
    setShowInput(false);
    triggerHeart();
  };

  return (
    <>
      {/* --- Floating Hearts Container --- */}
      {flyingHearts.map(h => (
          <div 
            key={h.id}
            className="heart-float"
            style={{ 
                left: `${h.left}%`,
                animationName: 'floatUpHeart',
                animationDuration: `${h.duration}s`,
                animationDelay: `${h.delay}s`,
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards'
            }}
          >
              <Heart fill="#ff4d4f" stroke="none" size={h.size} />
          </div>
      ))}

      {/* --- Main Widget Container --- */}
      <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2 max-w-[calc(100vw-32px)]">
        
        {/* Toggle Button (When Hidden) */}
        {!showComments && (
            <button 
                onClick={() => setShowComments(true)}
                className="bg-black/60 backdrop-blur-md text-white p-3 rounded-full shadow-lg border border-white/20 hover:scale-105 transition-all animate-fade-up"
            >
                <MessageSquare size={24} />
            </button>
        )}

        {/* The Chat/Live Stream Widget (When Shown) */}
        {showComments && (
            <div className="w-[350px] max-w-full flex flex-col gap-2 animate-fade-up">
                
                {/* 1. Comment List Area */}
                <div className="relative">
                     {/* The Hide Button (Floating Top-Right of List) */}
                     <button 
                        onClick={() => setShowComments(false)}
                        className="absolute -right-2 -top-2 z-10 bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                    >
                        <X size={16} />
                    </button>

                    <div className="h-[250px] overflow-hidden mask-image-gradient relative">
                        <div className="animate-scroll-vertical flex flex-col gap-3 pb-8">
                            {displayWishes.map((wish, index) => (
                                <div 
                                    key={`${wish.id}-${index}`}
                                    className="bg-[#6b3a3a]/70 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-white/10 self-start max-w-[90%] transform transition-all"
                                >
                                    <p className="text-sm">
                                        <span className="font-bold text-[#ffd700] mr-2 text-shadow-sm">{wish.name}:</span>
                                        <span className="leading-relaxed drop-shadow-md opacity-90">{wish.content}</span>
                                    </p>
                                </div>
                            ))}
                        </div>
                        {/* Gradient Mask for top fade */}
                        <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-transparent pointer-events-none"></div>
                    </div>
                </div>

                {/* 2. Integrated Controls (Input + Heart) */}
                <div className="flex items-center gap-2 mt-1">
                    {/* Chat/Input Trigger */}
                    <button 
                        onClick={() => setShowInput(true)}
                        className="flex-1 bg-black/60 backdrop-blur-xl text-white/90 rounded-full h-10 px-4 flex items-center gap-2 border border-white/10 shadow-lg hover:bg-black/70 transition-colors"
                    >
                        <MessageCircle size={18} className="text-white/70" />
                        <span className="text-sm font-medium">Gửi lời chúc...</span>
                    </button>

                    {/* Heart Reaction */}
                    <button 
                        onClick={triggerHeart}
                        className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-400 to-red-500 shadow-lg flex items-center justify-center hover:scale-105 active:scale-95 transition-transform border border-white/20"
                    >
                        <Heart fill="white" className="text-white w-5 h-5" />
                    </button>
                </div>
            </div>
        )}
      </div>

      {/* --- Input Modal (Bottom Sheet) --- */}
      {showInput && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
             <div className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity" onClick={() => setShowInput(false)}></div>
             
             <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl relative z-10 animate-fade-up">
                 <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
                     <h3 className="font-bold text-gray-700">Gửi lời chúc</h3>
                     <button onClick={() => setShowInput(false)} className="p-1 hover:bg-gray-200 rounded-full"><X size={20} /></button>
                 </div>
                 
                 <form onSubmit={handleSubmit} className="p-4 space-y-4">
                     <div>
                         <input 
                            type="text" 
                            placeholder="Tên của bạn"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition-all"
                            autoFocus
                         />
                     </div>
                     <div className="relative">
                         <textarea 
                            rows={3}
                            placeholder="Nhập lời chúc..."
                            value={message}
                            onChange={e => setMessage(e.target.value)}
                            className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition-all resize-none"
                         ></textarea>
                         <button 
                            type="button"
                            onClick={handleGenerateWish}
                            disabled={isGenerating}
                            className="absolute bottom-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-red-200"
                         >
                            <Sparkles size={12} /> {isGenerating ? '...' : 'AI'}
                         </button>
                     </div>
                     <button 
                        type="submit" 
                        className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all"
                     >
                         <Send size={18} /> Gửi ngay
                     </button>
                 </form>
             </div>
        </div>
      )}
    </>
  );
};