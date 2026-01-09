import React, { useState } from "react";
import { Section } from "./Section";
import { Send, CheckCircle } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL;

export const Rsvp: React.FC = () => {
  const [formStatus, setFormStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  // States cho các trường dữ liệu
  const [name, setName] = useState("");
  const [guests, setGuests] = useState("1");
  const [guestOf, setGuestOf] = useState("groom"); // 'groom' | 'bride'
  const [attendance, setAttendance] = useState("yes"); // 'yes' | 'no'

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");

    // Tạo payload gửi đi
    const payload = {
      type: "rsvp", // Quan trọng: Để script biết lưu vào sheet RSVP
      name,
      guests,
      guestOf,
      attendance,
    };

    fetch(`${API_BASE_URL}/api/rsvp`, {
      method: "POST",
      body: JSON.stringify(payload),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        // Vì no-cors nên ta không đọc được response status chuẩn,
        // nhưng nếu code chạy đến đây thường là đã gửi request thành công.
        setFormStatus("success");
        // Reset form (tuỳ chọn)
        setName("");
        setGuests("1");
      })
      .catch((error) => {
        console.error("Error submitting RSVP:", error);
        setFormStatus("error");
        alert("Có lỗi xảy ra, vui lòng thử lại sau!");
      });
  };

  return (
    <div className="py-20 bg-wedding-light relative overflow-hidden" id="rsvp">
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
                Cảm ơn {name} đã phản hồi. Hẹn gặp bạn tại lễ cưới!
              </p>
              <button
                onClick={() => setFormStatus("idle")}
                className="mt-6 text-sm text-gray-400 underline hover:text-wedding-primary"
              >
                Gửi lại phản hồi khác
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Tên */}
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
                {/* Số lượng người */}
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
                    <option value="4">4 người</option>
                    <option value="5">5 người</option>
                  </select>
                </div>

                {/* Khách của ai */}
                <div>
                  <label className="block font-sans text-sm font-bold text-gray-700 mb-2">
                    Bạn là khách của?
                  </label>
                  <select
                    value={guestOf}
                    onChange={(e) => setGuestOf(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-wedding-secondary outline-none bg-white"
                  >
                    <option value="groom">Nhà Trai</option>
                    <option value="bride">Nhà Gái</option>
                  </select>
                </div>
              </div>

              {/* Tham dự hay không */}
              <div className="pt-4">
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <label
                    className={`flex-1 flex items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      attendance === "yes"
                        ? "border-wedding-primary bg-wedding-primary/5"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="yes"
                      checked={attendance === "yes"}
                      onChange={() => setAttendance("yes")}
                      className="accent-wedding-primary w-5 h-5"
                    />
                    <span className="font-sans font-medium text-gray-700">
                      Sẽ tham dự
                    </span>
                  </label>

                  <label
                    className={`flex-1 flex items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer transition-colors ${
                      attendance === "no"
                        ? "border-gray-500 bg-gray-100"
                        : "hover:bg-gray-50 border-gray-200"
                    }`}
                  >
                    <input
                      type="radio"
                      name="attendance"
                      value="no"
                      checked={attendance === "no"}
                      onChange={() => setAttendance("no")}
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
                className="w-full bg-wedding-primary text-white py-4 rounded-lg hover:bg-wedding-primary/90 transition-all font-sans font-bold shadow-lg flex items-center justify-center gap-2 mt-6 disabled:opacity-70 disabled:cursor-not-allowed"
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
