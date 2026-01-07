import React from "react";
import { Section } from "./Section";

export const Invitation: React.FC = () => {
  return (
    <div className="py-24 bg-wedding-light relative">
      <div className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 opacity-10 pointer-events-none">
        <img
          src="https://www.svgrepo.com/show/530594/flower.svg"
          alt="decoration"
        />
      </div>
      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-64 md:h-64 opacity-10 pointer-events-none rotate-180">
        <img
          src="https://www.svgrepo.com/show/530594/flower.svg"
          alt="decoration"
        />
      </div>

      <Section className="container mx-auto px-4 max-w-3xl text-center">
        <div className="border-double border-4 border-wedding-secondary/30 p-8 md:p-16 bg-white shadow-sm">
          <h3 className="font-sans text-gray-500 uppercase tracking-widest text-sm mb-6">
            Trân trọng kính mời
          </h3>
          <p className="font-serif text-lg md:text-xl text-gray-700 mb-8 leading-loose">
            Đến dự lễ thành hôn của con em chúng tôi
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mb-8">
            <div className="text-center">
              <h2 className="font-script text-4xl md:text-5xl text-wedding-primary mb-2">
                Mạnh Hoàng
              </h2>
            </div>
            <div className="font-serif text-4xl text-wedding-secondary">&</div>
            <div className="text-center">
              <h2 className="font-script text-4xl md:text-5xl text-wedding-primary mb-2">
                Mai Tâm
              </h2>
            </div>
          </div>

          <p className="font-serif text-lg text-gray-700 mt-8 mb-8">
            Sự hiện diện của quý vị là niềm vinh hạnh
            <br />
            cho gia đình chúng tôi.
          </p>

          <div className="inline-block border-t border-b border-gray-300 py-2 px-8">
            <p className="font-serif italic text-xl text-wedding-primary">
              Save the Date
            </p>
          </div>

          <div className="flex mt-6 justify-center">
            <div className="relative p-4 bg-gradient-to-br from-gray-100 to-gray-50 flex flex-col mr-2">
              {/* Ribbon */}
              <div className="bg-wedding-primary text-white md:px-4 md:py-3 shadow-lg mb-8 -mx-4 mt-0">
                <p
                  className="text-sm md:text-md font-bold text-center"
                  style={{ fontFamily: "serif" }}
                >
                  Tiệc Mời Cưới Nhà Trai
                </p>
              </div>

              <div className="space-y-6 text-center flex-1 flex flex-col justify-center">
                <div className="space-y-2">
                  <p className="text-xs md:text-xl font-bold text-gray-800">
                    11:00 <span className="text-xs md:text-lg">- Thứ bảy</span>
                  </p>
                  <p className="text-xs md:text-xl font-bold text-gray-800">
                    24 . 01 . 2026
                  </p>
                  <p className="text-xs md:text-base text-gray-600">
                    06/12 Âm lịch
                  </p>
                </div>

                <div className=" md:pt-4">
                  <p className="text-xs md:text-lg text-gray-700 mb-3">
                    Tại Tư gia Nhà Trai
                  </p>
                  <div className="bg-wedding-primary text-white px-2 py-3 inline-block shadow-md">
                    <p className="text-xs md:text-xl">Đông Lộc, Nghệ An</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative p-4 bg-gradient-to-bl from-gray-100 to-gray-50 flex flex-col ml-2">
              {/* Ribbon */}
              <div className="bg-wedding-primary text-white md:px-4 md:py-3 shadow-lg mb-8 -mx-4 mt-0">
                <p
                  className="text-sm md:text-md font-bold text-center"
                  style={{ fontFamily: "serif" }}
                >
                  Tiệc Mời Cưới Nhà Gái
                </p>
              </div>

              <div className="space-y-6 text-center flex-1 flex flex-col justify-center">
                <div className="space-y-2">
                  <p className="text-xs md:text-xl font-bold text-gray-800">
                    17:00 <span className="text-xs md:text-lg">- Thứ Sáu</span>
                  </p>
                  <p className="text-xs md:text-xl font-bold text-gray-800">
                    23 . 01 . 2026
                  </p>
                  <p className="text-xs md:text-base text-gray-600">
                    05/12 Âm lịch
                  </p>
                </div>

                <div className=" md:pt-4">
                  <p className="text-xs md:text-lg text-gray-700 mb-3">
                    Tại Tư gia Nhà Gái
                  </p>
                  <div className="bg-wedding-primary text-white px-2 py-3 inline-block shadow-md">
                    <p className="text-xs md:text-xl">Nga Sơn, Thanh Hóa</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
};
