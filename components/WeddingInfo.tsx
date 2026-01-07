import React from 'react';
import { Section } from './Section';
import { MapPin, Clock } from 'lucide-react';

export const WeddingInfo: React.FC = () => {
  return (
    <div className="py-20 bg-wedding-light">
       <Section className="container mx-auto px-4">
        <div className="bg-white shadow-xl rounded-xl overflow-hidden flex flex-col lg:flex-row">
            
            {/* Info */}
            <div className="lg:w-1/3 p-8 md:p-12 flex flex-col justify-center bg-wedding-primary text-white">
                <h3 className="font-serif text-3xl mb-8 border-b border-white/20 pb-4">Wedding Event</h3>
                
                <div className="space-y-8">
                    <div className="flex gap-4">
                        <Clock className="w-6 h-6 text-wedding-secondary shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg mb-1">Thời Gian</h4>
                            <p className="opacity-80">11:00 AM - Thứ 7</p>
                            <p className="opacity-80">24 Tháng 01, 2026</p>
                        </div>
                    </div>

                    <div className="flex gap-4">
                        <MapPin className="w-6 h-6 text-wedding-secondary shrink-0" />
                        <div>
                            <h4 className="font-bold text-lg mb-1">Địa Điểm</h4>
                            <p className="opacity-80">Tư gia Nhà trai</p>
                            <p className="opacity-80 text-sm">Xóm Bắc Thịnh, xã Đông Lộc, tỉnh Nghệ An</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Placeholder */}
            <div className="lg:w-2/3 min-h-[400px] bg-gray-200 relative">
                <iframe 
                    title="map"
                    src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d379.957575753853!2d105.67447286558065!3d18.79447480045635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTjCsDQ3JzQwLjEiTiAxMDXCsDQwJzI4LjQiRQ!5e1!3m2!1sen!2s!4v1767803914538!5m2!1sen!2s"
                    width="100%" 
                    height="100%" 
                    style={{ border: 0, minHeight: '400px' }} 
                    allowFullScreen={true} 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
            </div>
        </div>
       </Section>
    </div>
  );
};