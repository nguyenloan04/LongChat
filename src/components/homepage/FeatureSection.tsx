import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

// Animation list for FeatureSection
const animationVariants = {
    fadeUp: {
        initial: { opacity: 0, y: 200 },
        whileInView: { opacity: 1, y: 0 },
    },
    fadeLeft: {
        initial: { opacity: 0, x: -60 },
        whileInView: { opacity: 1, x: 0 },
    },
    fadeRight: {
        initial: { opacity: 0, x: 60 },
        whileInView: { opacity: 1, x: 0 },
    },
    zoomIn: {
        initial: { opacity: 0, scale: 0.8 },
        whileInView: { opacity: 1, scale: 1 },
    },
};
type AnimationType = keyof typeof animationVariants;

interface FeatureSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    reversed?: boolean;
    animationType?: AnimationType;
}

export default function FeatureSection({
                                           title,
                                           description,
                                           imageSrc,
                                           reversed = false,
                                           animationType = "fadeUp"
                                       }: FeatureSectionProps) {
    const selectedVariant = animationVariants[animationType];
    return (
        <motion.section className={cn("mx-auto w-3/4 h-screen py-10 md:py-25")}
                        initial={selectedVariant.initial}
                        whileInView={selectedVariant.whileInView}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.7 , ease: "easeOut" }}>
            <div className="container px-5 rounded-[40px] bg-white/5 backdrop-blur-2xl border border-white/20 shadow-2xl">
                <div className={cn(
                    "flex flex-col gap-12 p-5 items-center",
                    reversed ? "md:flex-row-reverse" : "md:flex-row"
                )}>

                    <div className="w-full md:w-3/5">
                        <div className="aspect-video bg-slate-200 rounded-sm shadow-inner flex items-center justify-center text-slate-400 font-medium text-lg">
                            Image: {imageSrc}
                        </div>
                    </div>

                    <div className="w-full md:w-2/5">
                        <h2 className=" text-appchat-bluesky text-3xl md:text-5xl font-extrabold text-discord-text mb-6 leading-[1.2]">
                            {title}
                        </h2>
                        <p className="text-lg md:text-[1.1rem] leading-relaxed text-appchat-bluesky">
                            {description}
                        </p>
                    </div>

                </div>
            </div>
        </motion.section>
    );
}