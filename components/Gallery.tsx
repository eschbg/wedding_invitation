import React from "react";
import { Section } from "./Section";
import { MousePointer2 } from "lucide-react";

import img1 from "../assets/1.jpg"
import img4 from "../assets/4.jpg"
import img5 from "../assets/5.jpg"
import img6 from "../assets/6.jpg"
import img8 from "../assets/8.jpg"
import img16 from "../assets/16.jpg"
import img25 from "../assets/25.png"
import img31 from "../assets/31.jpg"
import santo from "../assets/santo.jpg"

export const Gallery: React.FC = () => {
  return (
    <div className="bg-white py-20 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-24 px-4">
        <h2 className="font-serif text-5xl md:text-6xl text-wedding-primary">
          Our Love Story
        </h2>
        <h3 className="text-wedding-secondary font-sans uppercase tracking-[0.3em] text-xs mb-4">
          Fall in love
        </h3>
      </div>

      <div className="container mx-auto px-4 max-w-6xl space-y-32 md:space-y-48">
        {/* --- CHAPTER 01: THE SPARK (Asymmetric Layout) --- */}
        <Section className="relative">

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* --- CỘT 1: ẢNH LỚN --- */}
            <div className="lg:col-span-5 relative group">
              <div className="relative overflow-hidden rounded-t-[100px] shadow-2xl aspect-[3/4]">
                <img
                  src={santo}
                  alt="Couple Moment"
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  style={{ imageRendering: "crisp-edges" }}
                />
                <div className="absolute inset-4 border border-white/30 rounded-t-[90px] pointer-events-none"></div>
              </div>
            </div>

            {/* --- CỘT 2: TEXT --- */}
            <div className="lg:col-span-3 text-center py-8 relative">
              <div className="hidden lg:block absolute left-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gray-300"></div>
              <div className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-px h-24 bg-gray-300"></div>

              <h3 className="font-sans text-xs uppercase tracking-[0.3em] text-grayx-500 mb-4">
                The Sweetest
              </h3>
              <h2 className="font-serif text-4xl lg:text-5xl text-wedding-primary mb-6 leading-tight">
                A Moment
                <br />
                <span className="italic text-3xl text-wedding-secondary">
                  Forever
                </span>
              </h2>
              <p className="font-sans text-gray-600 text-sm leading-relaxed mb-6 px-2">
                "Ngay từ khoảnh khắc nhìn thấy em, anh biết rằng cuộc phiêu lưu
                của chúng ta đã bắt đầu. Mỗi giây phút bên em đều là một kỷ niệm
                anh trân trọng."
              </p>
              <div className="flex justify-center gap-2 text-wedding-secondary/50">
                <span>. . .</span>
              </div>
            </div>

            {/* --- CỘT 3: ẢNH POLAROID (HOVER EFFECT) --- */}
            <div className="lg:col-span-4 relative flex justify-center lg:justify-end min-h-[400px] items-center">
              {/* Wrapper: Thêm class 'group' để kích hoạt hover cho các phần tử con */}
              <div className="relative w-64 h-64 cursor-pointer group perspective-1000 z-10">
                {/* Icon chỉ dẫn (Tự biến mất khi hover) */}
                <div className="absolute -top-16 left-1/2 -translate-x-1/2 animate-bounce text-gray-400 text-xs flex flex-col items-center gap-1 z-0 opacity-100 group-hover:opacity-0 transition-opacity duration-300">
                  <MousePointer2 size={20} />
                  <span>Chạm vào tôi</span>
                </div>

                {/* === ẢNH 1 (Nằm dưới) === */}
                <div
                  className="absolute w-full bg-white p-3 pb-8 rounded-sm shadow-xl 
                transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                top-0 right-0 rotate-6 z-10 
                
                group-hover:-translate-x-[60%] 
                group-hover:-translate-y-[15%] 
                group-hover:-rotate-12 
                group-hover:z-20 
                group-hover:scale-105"
                >
                  <img
                    src={img8}
                    alt="Love"
                    className="w-full h-48 object-cover object-[center_20%] filter sepia-[0.1]"
                    style={{ imageRendering: "crisp-edges" }}
                  />
                  <p className=" font-script font-handwriting text-center text-wedding-primary mt-2 text-lg font-bold">
                    Love
                  </p>
                </div>

                {/* === ẢNH 2 (Nằm trên) === */}
                <div
                  className="absolute w-full bg-white p-3 pb-8 rounded-sm shadow-2xl 
                transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                top-4 right-4 -rotate-3 z-20 
                
                group-hover:translate-x-[40%] 
                group-hover:translate-y-[35%] 
                group-hover:rotate-6 
                group-hover:z-30 
                group-hover:scale-105"
                >
                  <img
                    src={img31}
                    alt="Forever"
                    className="w-full h-48 object-cover"
                    style={{ imageRendering: "crisp-edges" }}
                  />
                  <p className="font-script font-handwriting text-center text-wedding-primary mt-2 text-lg font-bold">
                    Forever
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* --- CHAPTER 02: INTIMACY (Layered & Text Behind Image) --- */}
        <Section className="relative">
          <div className="flex flex-col-reverse md:flex-row justify-end items-center relative">
            {/* Text Layer (Behind) */}
            <div className="w-full md:w-1/2 md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 z-0 text-center md:text-left">
              <h2 className="font-serif text-[60px] md:text-[120px] text-[#f2ebe5] leading-none tracking-tighter mix-blend-multiply select-none">
                SWEET
                <br />
                SOULS
              </h2>
            </div>

            {/* Content Layer (Top) */}
            <div className="w-full md:w-1/2 relative z-10 flex flex-col items-center md:items-end">
              {/* Color Block Backdrop */}
              <div className="absolute top-10 right-10 w-full h-full bg-[#fcf8f5] -z-10 transform translate-x-8 translate-y-8"></div>

              <div className="relative w-full max-w-md aspect-[4/5] overflow-hidden shadow-xl">
                <img
                  src={img16}
                  alt="Embrace"
                  className="w-full h-full object-cover hover:grayscale-0 transition-all duration-700"
                  style={{ imageRendering: "crisp-edges" }}
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/20"></div>
              </div>

              <div className="mt-8 md:-mr-12 bg-wedding-primary text-white p-6 max-w-xs shadow-2xl relative">
                <p className="font-script text-xl mb-2 text-center text-white">
                  Hôn nhân là chuyện cả đời <br />
                  Yêu người vừa ý, Cưới người Mình thương.
                </p>
              </div>
            </div>
          </div>
        </Section>

        {/* --- CHAPTER 03: FOREVER (Collage / Broken Grid) --- */}
        <Section className="relative pt-12">
          <div className="text-center mb-12">
            <span className="font-script text-5xl text-wedding-secondary">
              Journey
            </span>
          </div>

          <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[600px] md:h-[800px]">
            {/* Item 1: Tall Slim */}
            <div className="col-span-6 md:col-span-4 row-span-2 relative overflow-hidden group">
              <img
                src={img5}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Walking"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>

            {/* Item 2: Text Block */}
            <div className="col-span-6 md:col-span-4 row-span-2 flex items-center justify-center p-6 bg-[#f9f9f9]">
              <div className="text-center">
                <p className="font-serif italic text-2xl text-wedding-primary mb-2">
                  "Forever"
                </p>
                <div className="w-12 h-px bg-wedding-secondary mx-auto"></div>
              </div>
            </div>

            {/* Item 3: Wide */}
            <div className="col-span-12 md:col-span-4 row-span-2 relative overflow-hidden group">
              <img
                src={img1}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                alt="Rings"
                style={{ imageRendering: "crisp-edges" }}
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
            </div>

            {/* Item 4: Bottom Left */}
            <div className="col-span-5 md:col-span-3 row-span-2 md:row-span-2 relative overflow-hidden mt-4 md:mt-0">
              <img
                src={img4}
                className="w-full h-full object-cover will-change-transform backface-visibility-hidden transform-gpu"
                alt="Smile"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>

            {/* Item 5: Large Center */}
            <div className="col-span-7 md:col-span-5 row-span-3 relative overflow-hidden -mt-8 md:-mt-0 z-10 shadow-2xl border-4 border-white">
              <img
                src={img6}
                className="w-full h-full object-cover will-change-transform backface-visibility-hidden transform-gpu"
                alt="Kiss"
                style={{ imageRendering: "crisp-edges" }}
              />
            </div>

            {/* Item 6: Quote */}
            <div className="hidden md:flex col-span-4 row-span-2 items-center px-8">
              <p className="font-sans text-xs uppercase tracking-[0.2em] text-gray-400 text-right w-full">
                Collecting moments
              </p>
            </div>
          </div>
          <img
                src={img25}
                className="w-full h-full object-cover will-change-transform backface-visibility-hidden transform-gpu"
                alt="Kiss"
              />
        </Section>
      </div>
    </div>
  );
};
