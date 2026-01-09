import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  Send,
  X,
  Sparkles,
  MessageSquare,
} from "lucide-react";
import { GoogleGenAI } from "@google/genai";

// --- SỬA LỖI: TRỎ VỀ SERVER NODE.JS CỦA BẠN ---
// Server của bạn đang chạy ở port 3001 (xem file server.js)
const API_BASE_URL = import.meta.env.VITE_API_URL;

interface Wish {
  id: number | string;
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

export const Wishes: React.FC = () => {
  // Logic states
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [showInput, setShowInput] = useState(false);
  const [showComments, setShowComments] = useState(true);
  const [flyingHearts, setFlyingHearts] = useState<FlyingHeart[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  // Input form states
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  // 1. Fetch dữ liệu khi load trang
  useEffect(() => {
    fetchWishes();
    // Poll dữ liệu mỗi 30s để cập nhật lời chúc mới
    const interval = setInterval(fetchWishes, 30000);
    return () => clearInterval(interval);
  }, []);

  // Combine list for loop effect
  const displayWishes = wishes.length > 5 ? [...wishes, ...wishes] : wishes;

  const fetchWishes = async () => {
    try {
      // SỬA: Gọi đúng đường dẫn API của Node.js
      const response = await fetch(`${API_BASE_URL}/api/wishes`);

      if (response.ok) {
        const data = await response.json();
        // Backend trả về mảng trực tiếp, không cần data.data
        if (Array.isArray(data)) {
          setWishes(data.reverse()); // Đảo ngược để tin mới nhất lên đầu
        }
      } else {
        console.error("Lỗi khi tải dữ liệu:", response.status);
      }
    } catch (error) {
      console.error("Error fetching wishes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const triggerHeart = () => {
    const newHearts: FlyingHeart[] = Array.from({ length: 15 }).map((_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      size: Math.random() * 20 + 15,
      duration: Math.random() * 3 + 4,
      delay: Math.random() * 0.5,
    }));
    setFlyingHearts((prev) => [...prev, ...newHearts]);
    setTimeout(() => {
      setFlyingHearts((prev) =>
        prev.filter((h) => !newHearts.find((nh) => nh.id === h.id))
      );
    }, 8000);
  };

  const handleGenerateWish = async () => {
    setIsGenerating(true);
    try {
      // Simulate AI generation (replace with your actual API)
      const wishes = [
        "Chúc hai bạn trăm năm hạnh phúc bên nhau! 💕",
        "Mãi mãi bên nhau, yêu thương trọn đời! ❤️",
        "Chúc hạnh phúc ngập tràn trong tổ ấm mới! 🏠",
        "Bên nhau từ bây giờ đến mãi mãi! 💑",
        "Yêu nhau mỗi ngày, hạnh phúc triền miên! 🌹",
        "Chúc hai bạn trăm năm hạnh phúc, mãi yêu thương và đồng hành cùng nhau đến bạc đầu.",
        "Chúc cuộc sống hôn nhân của anh chị luôn ngập tràn yêu thương, tiếng cười và bình yên.",
        "Mong hai bạn luôn nắm chặt tay nhau, cùng vượt qua mọi thử thách và xây dựng tổ ấm vững bền.",
        "Chúc gia đình nhỏ của hai bạn luôn ấm áp, đủ đầy và tràn ngập hạnh phúc.",
        "Chúc tình yêu hôm nay sẽ là nền tảng cho một cuộc hôn nhân bền lâu và viên mãn.",
        "Chúc hai bạn sớm có nhiều kỷ niệm đẹp và cùng nhau viết nên câu chuyện hôn nhân thật trọn vẹn.",
        "Mong rằng mỗi ngày bên nhau đều là một ngày hạnh phúc và ý nghĩa.",
        "Chúc anh chị luôn thấu hiểu, sẻ chia và yêu thương nhau như những ngày đầu.",
        "Chúc đôi uyên ương sống trọn đời trong hạnh phúc, an yên và đủ đầy yêu thương.",
        "Chúc hai bạn mãi là điểm tựa của nhau, cùng nhau đi đến cuối con đường hạnh phúc.",
      ];
      const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
      setMessage(randomWish);
    } catch (error) {
      setMessage("Chúc trăm năm hạnh phúc!");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !message) return;

    setIsSending(true);

    const payload = { name, content: message };

    // SỬA: Gọi POST về server Node.js
    fetch(`${API_BASE_URL}/api/wishes`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        // Node.js dùng express.json() nên bắt buộc phải là application/json
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        if (res.ok) {
          // Cập nhật UI ngay lập tức (Optimistic update)
          const newWish = {
            id: Date.now(),
            name,
            content: message,
            isHighlight: true,
          };
          setWishes((prev) => [newWish, ...prev]);

          // Reset form
          setName("");
          setMessage("");
          setShowInput(false);
          triggerHeart();

          // Gọi fetch lại để đồng bộ ID thực từ server
          fetchWishes();
        } else {
          const errData = await res.json();
          alert(errData.error || "Có lỗi xảy ra, vui lòng thử lại!");
        }
      })
      .catch((err) => {
        console.error("Error sending wish:", err);
        alert("Không thể kết nối tới server!");
      })
      .finally(() => {
        setIsSending(false);
      });
  };

  return (
    <>
      {/* ... Phần Floating Hearts (Giữ nguyên code cũ) ... */}
      {flyingHearts.map((h) => (
        <div
          key={h.id}
          className="heart-float"
          style={{
            left: `${h.left}%`,
            animationName: "floatUpHeart",
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationTimingFunction: "ease-out",
            animationFillMode: "forwards",
          }}
        >
          <Heart fill="#ff4d4f" stroke="none" size={h.size} />
        </div>
      ))}

      <div className="fixed bottom-4 left-4 z-50 flex flex-col items-start gap-2 max-w-[calc(100vw-32px)]">
        {!showComments && (
          <button
            onClick={() => setShowComments(true)}
            className="bg-black/60 backdrop-blur-md text-white p-3 rounded-full shadow-lg border border-white/20 hover:scale-105 transition-all animate-fade-up"
          >
            <MessageSquare size={24} />
          </button>
        )}

        {showComments && (
          <div className="w-[350px] max-w-full flex flex-col gap-2 animate-fade-up">
            <div className="relative">
              <button
                onClick={() => setShowComments(false)}
                className="absolute -right-2 -top-2 z-10 bg-white text-gray-700 p-1.5 rounded-full shadow-md hover:bg-gray-100 transition-colors"
              >
                <X size={16} />
              </button>

              <div className="h-[250px] overflow-hidden mask-image-gradient relative">
                {isLoading ? (
                  <div className="flex items-center justify-center h-full text-white/70">
                    <span className="text-sm">Đang tải lời chúc...</span>
                  </div>
                ) : (
                  <div className="animate-scroll-vertical flex flex-col gap-3 pb-8">
                    {displayWishes.length === 0 ? (
                      <div className="text-white/60 text-center text-sm p-4">
                        Chưa có lời chúc nào. Hãy là người đầu tiên!
                      </div>
                    ) : (
                      displayWishes.map((wish, index) => (
                        <div
                          key={`${wish.id}-${index}`}
                          className="bg-[#6b3a3a]/70 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl rounded-tl-sm shadow-sm border border-white/10 self-start max-w-[90%] transform transition-all"
                        >
                          <p className="text-sm">
                            <span className="font-bold text-[#ffd700] mr-2 text-shadow-sm">
                              {wish.name}:
                            </span>
                            <span className="leading-relaxed drop-shadow-md opacity-90">
                              {wish.content}
                            </span>
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
                <div className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-transparent to-transparent pointer-events-none"></div>
              </div>
            </div>

            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setShowInput(true)}
                className="flex-1 bg-black/60 backdrop-blur-xl text-white/90 rounded-full h-10 px-4 flex items-center gap-2 border border-white/10 shadow-lg hover:bg-black/70 transition-colors"
              >
                <MessageCircle size={18} className="text-white/70" />
                <span className="text-sm font-medium">Gửi lời chúc...</span>
              </button>
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

      {showInput && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center p-0 sm:p-4">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
            onClick={() => setShowInput(false)}
          ></div>
          <div className="bg-white w-full max-w-md rounded-t-2xl sm:rounded-2xl shadow-2xl relative z-10 animate-fade-up">
            <div className="p-4 border-b flex justify-between items-center bg-gray-50 rounded-t-2xl">
              <h3 className="font-bold text-gray-700">Gửi lời chúc</h3>
              <button
                onClick={() => setShowInput(false)}
                className="p-1 hover:bg-gray-200 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Tên của bạn"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition-all"
                  autoFocus
                />
              </div>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="Nhập lời chúc..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-red-400 transition-all resize-none"
                ></textarea>
                <button
                  type="button"
                  onClick={handleGenerateWish}
                  disabled={isGenerating}
                  className="absolute bottom-2 right-2 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-red-200"
                >
                  <Sparkles size={12} /> {isGenerating ? "..." : "AI"}
                </button>
              </div>
              <button
                disabled={isSending}
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-600 text-white py-3 rounded-xl font-bold shadow-lg flex items-center justify-center gap-2 hover:opacity-90 active:scale-95 transition-all disabled:opacity-50"
              >
                {isSending ? (
                  "Đang gửi..."
                ) : (
                  <>
                    <Send size={18} /> Gửi ngay
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
