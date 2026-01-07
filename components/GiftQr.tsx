import React, { useState } from "react";
import { Section } from "./Section";
import { CreditCard, Copy, Check, Gift } from "lucide-react";

import qrImageCr from "../assets/QR_CR.jpg";
import qrImageCd from "../assets/QR_CD.jpg";

interface BankInfo {
  owner: string;
  bankName: string;
  accountNumber: string;
  qrImage: string;
  title: string;
  type: "groom" | "bride";
}

const banks: BankInfo[] = [
  {
    type: "groom",
    title: "Mừng Chú Rể",
    owner: "TRAN MANH HOANG",
    bankName: "TP BANK",
    accountNumber: "68676298888",
    qrImage: qrImageCr,
  },
  {
    type: "bride",
    title: "Mừng Cô Dâu",
    owner: "MAI THI TAM",
    bankName: "TP BANK",
    accountNumber: "00001240910",
    qrImage: qrImageCd,
  },
];

export const GiftQr: React.FC = () => {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null);

  const handleCopy = (accNum: string) => {
    navigator.clipboard.writeText(accNum);
    setCopiedAccount(accNum);
    setTimeout(() => setCopiedAccount(null), 2000);
  };

  return (
    <div className="py-20 bg-white">
      <Section className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-12">
          <h3 className="text-wedding-secondary font-sans uppercase tracking-widest text-sm mb-2">
            Wedding Gift
          </h3>
          <h2 className="font-serif text-4xl text-wedding-primary">
            Hộp Mừng Cưới
          </h2>
        </div>

        {/* Display side-by-side on md screens and up (standard row layout) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {banks.map((bank, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col items-center p-8 text-center relative group"
            >
              {/* Decorative Top Line */}
              <div
                className={`absolute top-0 left-0 right-0 h-2 ${
                  bank.type === "groom"
                    ? "bg-wedding-primary"
                    : "bg-wedding-secondary"
                }`}
              ></div>

              {/* QR Code Container */}
              <div className="mb-6 relative group-hover:scale-105 transition-transform duration-300">
                <div className="w-48 h-48 bg-white p-2 border-2 border-dashed border-gray-200 rounded-xl">
                  <img
                    src={bank.qrImage}
                    alt={`${bank.title} QR`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-white p-2 rounded-full shadow-md border border-gray-100">
                  <Gift
                    size={20}
                    className={
                      bank.type === "groom"
                        ? "text-wedding-primary"
                        : "text-wedding-secondary"
                    }
                  />
                </div>
              </div>

              <h3 className="font-serif text-2xl text-gray-800 mb-1">
                {bank.title}
              </h3>
              <p className="font-sans text-xs text-gray-400 uppercase tracking-widest mb-6">
                Quét mã QR
              </p>

              <div className="w-full space-y-3">
                <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-3">
                  <CreditCard className="text-gray-400" size={18} />
                  <div className="text-left">
                    <span className="text-xs text-gray-500 block">
                      Ngân hàng
                    </span>
                    <span className="font-bold text-gray-700">
                      {bank.bankName}
                    </span>
                  </div>
                </div>

                <div
                  className="bg-gray-50 p-3 rounded-lg flex items-center justify-between cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => handleCopy(bank.accountNumber)}
                >
                  <div className="text-left pl-1">
                    <span className="text-xs text-gray-500 block">
                      Số tài khoản
                    </span>
                    <span className="font-bold text-gray-800 text-lg tracking-wider">
                      {bank.accountNumber}
                    </span>
                    <span className="text-xs text-gray-400 block mt-0.5">
                      {bank.owner}
                    </span>
                  </div>
                  <button
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                    title="Copy"
                  >
                    {copiedAccount === bank.accountNumber ? (
                      <Check size={20} className="text-green-500" />
                    ) : (
                      <Copy size={20} />
                    )}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
};
