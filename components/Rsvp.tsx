import React, { useState } from "react";
import { Section } from "./Section";
import { Send, CheckCircle } from "lucide-react";

export const Rsvp: React.FC = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success"
  >("idle");
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
    }, 1500);
  };

  return (
    <div className="py-20 bg-wedding-light relative overflow-hidden">
      <Section className="container mx-auto px-4 max-w-2xl">
        <div className="text-center mb-12">
          <h2 className="font-serif text-4xl text-wedding-primary">
            Xác Nhận Tham Dự
          </h2>
        </div>

        <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border-t-4 border-wedding-primary">
          {formStatus === "success" ? (
            <div className="text-center py-8 animate-fade-up">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                <CheckCircle size={32} />
              </div>
              <h3 className="font-serif text-2xl text-wedding-primary mb-2">
                Xác nhận thành công!
              </h3>
              <p className="font-sans text-gray-600">
                Cảm ơn {name} đã xác nhận tham dự. Hẹn gặp bạn tại lễ cưới!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block font-sans text-sm font-bold text-gray-700 mb-2">
                  Tên của bạn
                </label>
                <input
                  required
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wedding-secondary focus:border-transparent outline-none transition-all bg-white"
                  placeholder="Nhập họ và tên"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block font-sans text-sm font-bold text-gray-700 mb-2">
                    Số lượng người
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wedding-secondary outline-none bg-white"
                  >
                    <option value="1">1 người</option>
                    <option value="2">2 người</option>
                    <option value="3">3 người</option>
                  </select>
                </div>
                <div>
                  <label className="block font-sans text-sm font-bold text-gray-700 mb-2">
                    Bạn là khách của?
                  </label>
                  <select className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wedding-secondary outline-none bg-white">
                    <option value="groom">Nhà Trai</option>
                    <option value="bride">Nhà Gái</option>
                  </select>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <label className="flex-1 flex items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-wedding-primary has-[:checked]:bg-wedding-primary/5">
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      className="accent-wedding-primary w-5 h-5"
                      defaultChecked
                    />
                    <span className="font-sans font-medium text-gray-700">
                      Sẽ tham dự
                    </span>
                  </label>
                  <label className="flex-1 flex items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors has-[:checked]:border-gray-400">
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      className="accent-gray-500 w-5 h-5"
                    />
                    <span className="font-sans font-medium text-gray-700">
                      Xin vắng mặt
                    </span>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={formStatus === "submitting"}
                className="w-full bg-wedding-primary text-white py-4 rounded-lg hover:bg-wedding-primary/90 transition-all font-sans font-bold shadow-lg flex items-center justify-center gap-2 mt-6"
              >
                {formStatus === "submitting" ? (
                  "Đang gửi..."
                ) : (
                  <>
                    Xác nhận ngay <Send size={18} />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </Section>
    </div>
  );
};
