import {useState} from "react";
import {Button} from "@/components/ui/button.tsx";
import {ArrowLeft, ArrowRight, Quote} from "lucide-react";
import {AnimatePresence, motion} from "framer-motion";
import {cn} from "@/lib/utils.ts";

const features = [
    {
        id:1,
        title:"Chit chat w ur besties",
        description: "Create an invite-only place",
        imageSrc: "src/assets/img/feature_1.jpg",
    },
    {
        id:2,
        title:"Make a real community",
        description: "Create a real world belongs to you",
        imageSrc: "src/assets/img/feature_1.jpg",
    },
    {
        id:3,
        title:"Share everything from one to others",
        description: "Transform your everything to ur community",
        imageSrc: "src/assets/img/feature_1.jpg",
    }
]
export default function Feature() {
    const [activeIndex, setActiveIndex] = useState(0)
    // Change index to go to next feature
    const nextSlide = () => {
        setActiveIndex((prev) => (prev + 1) % features.length);
    }
    // Change index to go to previous feature
    const prevSlide = () => {
        setActiveIndex((prev) => (prev - 1 + features.length) % features.length);
    }
    // get active card (middle)
    const getVisibleCards = () => {
        const total = features.length;
        const prevIndex = (activeIndex - 1 + total) % total;
        const nextIndex = (activeIndex + 1) % total;
        return [
            { ...features[prevIndex], position: "left" },
            { ...features[activeIndex], position: "center" },
            { ...features[nextIndex], position: "right" },
        ];
    }
    // const visibleCards = getVisibleCards();
    return (
        <section className="feature h-screen">
            <div className="relative flex items-center justify-center gap-6 md:gap-10 h-[500px]">

                <Button
                    variant="outline"
                    size="icon"
                    onClick={nextSlide}
                    className="absolute top-2.5 left-[300px] md:left-[300px] z-20 rounded-full w-12 h-12 border-gray-300 hover:bg-gray-100 hidden md:flex"
                >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                </Button>

                <div className="flex items-center justify-center w-full relative perspective-1000">
                    <AnimatePresence mode="popLayout">
                        {getVisibleCards().map((item) => {
                            const isCenter = item.position === "center";
                            const isLeft = item.position === "left";

                            return (
                                <motion.div
                                    key={item.id}
                                    layout
                                    initial={{ scale: 0.8, opacity: 0 }}
                                    animate={{
                                        scale: isCenter ? 1 : 0.85,
                                        x: isCenter ? 0 : (isLeft ? 550 : -550),
                                        y: isCenter ? 0 : (isLeft ? 0 : 100),
                                        opacity: isCenter ? 1 : 1,
                                        zIndex: isCenter ? 20 : 10,
                                    }}
                                    transition={{ duration: 0.5, ease: "easeInOut" }}
                                    className={cn(
                                        "absolute transition-all shadow-2xl overflow-hidden",
                                        // 1. CARD GIỮA: Hình chữ nhật to, bo góc lớn
                                        isCenter
                                            ? "w-[90%] md:w-[800px] h-[450px] rounded-[40px] bg-white flex flex-col md:flex-row"
                                            : "hidden md:block w-[300px] h-[300px] rounded-[30px] bg-[#1a1b4b]" // 2. CARD BÊN: Hình vuông nhỏ
                                    )}
                                >
                                    {isCenter ? (
                                        <>
                                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                                <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover" />
                                                <div className="absolute bottom-6 left-6 text-white z-10">
                                                    <p className="font-bold text-lg uppercase">{item.title}</p>
                                                </div>
                                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent" />
                                            </div>

                                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-white">
                                                <Quote className="w-12 h-12 text-gray-200 mb-6" />
                                                <p className="text-xl md:text-2xl font-medium text-discord-dark leading-relaxed">
                                                    {item.description}
                                                </p>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full relative">
                                            <img src={item.imageSrc} alt={item.title} className="w-full h-full object-cover opacity-60" />
                                            <div className="absolute inset-0 bg-discord-dark/40" />
                                            <div className="absolute bottom-6 left-6">
                                                <p className="text-white font-bold uppercase text-sm">{item.title}</p>
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>

                <Button
                    variant="outline"
                    size="icon"
                    onClick={prevSlide}
                    className="absolute top-[80%] right-[300px] md:right-[300px] z-20 rounded-full w-12 h-12 border-gray-300 hover:bg-gray-100 hidden md:flex"
                >
                    <ArrowRight className="w-5 h-5 text-gray-600" />
                </Button>

            </div>
        </section>
    )
}