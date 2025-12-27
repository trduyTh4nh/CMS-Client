import Image from "next/image";
import { getBanners } from "@/services/media.service";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

export default async function Banner() {
    const banners = await getBanners();
    console.log("banners: ", banners)
    return (
        <div className="banner w-full">
            <Carousel>
                <CarouselContent>
                    {banners.map((item) => (
                        <CarouselItem key={item.id} className="relative h-96 w-full">
                            <Image
                                src={item.url}
                                alt="Banner"
                                fill
                                className=""
                                priority
                            />
                        </CarouselItem>

                    ))}
                </CarouselContent>
            </Carousel>
        </div>

    );
}
