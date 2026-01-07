import React from "react";
import { Section } from "./Section";
import { StoryEvent } from "../types";
import { Heart } from "lucide-react";

const events: StoryEvent[] = [
  {
    year: "Wedding",
    title:
      "Gặp anh nắng rót vàng tơ \nMây trôi cũng hóa nên thơ dịu hiền \nChiều về gió thoảng êm đềm \nHình như cũng ngọt như men rượu nồng",
    description: "My heart belongs to you",
    image: "../assets/14.jpg",
    align: "left",
  },
  {
    year: "Một thương, hai nhớ, ba trông, Bốn chờ, năm đợi, sáu mong duyên nàng",
    title: "",
    description: "We are married",
    image: "../assets/9.jpg",
    align: "right",
  },
  {
    year: "",
    title:
      "Anh về hái lấy buồng cau \n Trầu têm cánh phượng đội đầu mang sang.\nAnh về thưa với họ hàng\nBốn bên hai họ anh sang rước nàng.",
    description: "",
    image: "../assets/52.jpg",
    align: "left",
  },
];

export const LoveStory: React.FC = () => {
  return (
    <div className="py-20 md:py-32 bg-white container mx-auto px-4 overflow-hidden">
      <Section className="text-center mb-16">
        <h2 className="font-serif text-4xl md:text-5xl text-wedding-primary">
          Our Love Story
        </h2>
        <h3 className="text-wedding-secondary font-sans uppercase tracking-widest text-sm mb-2">
          Fall in Love
        </h3>
      </Section>

      <div className="relative">
        {/* Central Line */}
        <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-px bg-wedding-secondary/30"></div>

        <div className="space-y-12 md:space-y-24">
          {events.map((event, index) => (
            <Section
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 md:gap-0 ${
                event.align === "right" ? "md:flex-row-reverse" : ""
              }`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 px-4 md:px-12">
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-[100px] shadow-xl border-4 border-white">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                  />
                </div>
              </div>
              <div className="flex flex-col items-center gap-3 my-8">
                {/* Hearts */}
                <div className="flex items-center gap-4">
                  <Heart className="w-6 h-6 text-rose-400" strokeWidth={1.5} />
                  <Heart className="w-6 h-6 text-rose-400" strokeWidth={1.5} />
                  <Heart className="w-6 h-6 text-rose-400" strokeWidth={1.5} />
                </div>

                {/* Text */}
                <p
                  className="text-rose-400 text-2xl md:text-3xl font-light italic tracking-wide"
                  style={{ fontFamily: "Brush Script MT, cursive" }}
                >
                  {event.description}
                </p>
              </div>

              {/* Text Side */}
              <div className="w-full md:w-1/2 px-4 md:px-12 text-center md:text-left">
                <span className="font-script text-5xl md:text-6xl text-wedding-secondary/50 -mb-6 block select-none">
                  {event.year}
                </span>
                <h3 className="font-serif text-2xl md:text-3xl text-wedding-primary mb-4 relative z-10 whitespace-pre-line">
                  {event.title}
                </h3>
              </div>
            </Section>
          ))}
        </div>
      </div>
    </div>
  );
};
