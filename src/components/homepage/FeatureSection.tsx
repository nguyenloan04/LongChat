import { cn } from "@/lib/utils";

interface FeatureSectionProps {
    title: string;
    description: string;
    imageSrc: string;
    reversed?: boolean;
}

export default function FeatureSection({
                                           title,
                                           description,
                                           imageSrc,
                                           reversed = false,
                                       }: FeatureSectionProps) {
    return (
        <section className={cn("mx-auto w-3/4 py-10 md:py-25")}>
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
                        <h2 className=" text-white text-3xl md:text-5xl font-extrabold text-discord-text mb-6 leading-[1.2]">
                            {title}
                        </h2>
                        <p className="text-lg md:text-[1.1rem] text-white">
                            {description}
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}