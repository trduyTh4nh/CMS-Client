"use client"
import Image from "next/image";
import { getBanners } from "@/services/media.service";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"
import { BannerData, INITIAL_BANNERS } from "@/assets/const/imageContent";
import BannerItem from "./BannerItem";
import { useCallback, useEffect, useState } from "react";

export default function Banner() {
    // const banners = await getBanners();
    const [banners, setBanners] = useState<BannerData[]>(INITIAL_BANNERS);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setActiveIndex((prev) => (prev + 1) % banners.length);
    }, [banners.length]);

    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + banners.length) % banners.length);
    };

    useEffect(() => {
        if (isPaused) return;
        const timer = setInterval(nextSlide, 5000);
        return () => clearInterval(timer);
    }, [nextSlide, isPaused]);

    const addNewBanner = (newBanner: BannerData) => {
        setBanners(prev => [newBanner, ...prev]);
        setActiveIndex(0);
    };
    return (
        <>
            {
                banners.map((banner, index) => (
                    <BannerItem
                        key={banner.id}
                        banner={banner}
                        isActive={index === activeIndex}
                    />
                ))
            }
        </>
    );
}
