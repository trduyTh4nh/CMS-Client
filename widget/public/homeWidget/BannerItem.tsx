
import { BannerData, COLOR_CLASSES } from '@/assets/const/imageContent';
import React from 'react';

interface BannerItemProps {
    banner: BannerData;
    isActive: boolean;
}

const BannerItem: React.FC<BannerItemProps> = ({ banner, isActive }) => {
    return (
        <div
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${isActive ? 'opacity-100' : 'opacity-0'}`}
        >
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                    src={banner.imageUrl}
                    alt={banner.title}
                    className={`w-full h-full object-cover transition-transform duration-[10000ms] ${isActive ? 'scale-110' : 'scale-100'}`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
            </div>

            {/* Content */}
            <div className="relative z-20 h-full flex items-center px-8 md:px-16 lg:px-24">
                <div className={`max-w-2xl transform transition-all duration-700 delay-300 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                    <div className="flex items-center space-x-3 mb-4">
                        <span className={`px-3 py-1 text-[10px] font-bold tracking-widest uppercase rounded-full bg-gradient-to-r ${COLOR_CLASSES[banner.colorScheme]} text-white shadow-lg`}>
                            {banner.tag}
                        </span>
                        <div className="h-[1px] w-12 bg-white/20" />
                        <span className="text-white/40 text-xs font-medium uppercase tracking-tighter mono">DevForge_Production_v2.5</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-2 leading-tight">
                        {banner.title}
                    </h2>

                    <h3 className="text-xl md:text-2xl font-semibold text-blue-400/90 mb-6 mono italic">
                        {"> "} {banner.subtitle}
                    </h3>

                    <p className="text-lg text-white/70 mb-8 max-w-xl leading-relaxed">
                        {banner.description}
                    </p>

                    <div className="flex items-center space-x-4">
                        <button className={`px-8 py-3 rounded-lg font-bold text-white bg-gradient-to-r ${COLOR_CLASSES[banner.colorScheme]} hover:scale-105 transition-transform shadow-xl`}>
                            {banner.ctaText}
                        </button>
                        <button className="px-8 py-3 rounded-lg font-bold text-white border border-white/20 hover:bg-white/5 transition-colors glass">
                            Demo Hệ Thống
                        </button>
                    </div>
                </div>
            </div>

            {/* Floating UI Elements Decoration */}
            <div className={`absolute top-20 right-20 w-64 h-64 border border-white/5 rounded-full z-10 transition-all duration-1000 delay-500 ${isActive ? 'scale-100 opacity-20' : 'scale-50 opacity-0'}`} />
            <div className={`absolute bottom-10 right-40 w-32 h-32 border border-white/10 rotate-45 z-10 transition-all duration-1000 delay-700 ${isActive ? 'translate-x-0 opacity-10' : 'translate-x-20 opacity-0'}`} />
        </div>
    );
};

export default BannerItem;
