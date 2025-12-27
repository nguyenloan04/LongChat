import {useRef} from "react"
import {motion, useScroll, useTransform} from "framer-motion"
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

// Image for parallax
const chatting_img = "src/assets/img/landing-main.webp"
const cloud_img = "src/assets/img/landing-cloud.webp"
const grass_img = "src/assets/img/landing-grass.webp"
export default function MainPage() {
    const containerRef = useRef<HTMLElement>(null);
    const {scrollYProgress} = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    })
    const cloudY = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"])
    const chattingY = useTransform(scrollYProgress, [0, 1], ["0%", "-80%"])
    const grassY = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"])
    const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"])
    const navigate = useNavigate();
    return (
        <section ref={containerRef}
                 className="relative min-h-screen flex flex-col items-center justify-center">
            <div className="container mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10">
                <div className="flex flex-col justify-center z-20 py-20 lg:py-0">
                    <motion.div
                        style={{y: textY}}
                        className="relative z-20 w-full max-w-6xl mt-10 md:mt-5 justify-center text-center items-center">
                        <h1 className="text-appchat-bluesky mt-80 text-5xl md:text-[2rem] font-black mb-6 uppercase tracking-wide font-sans">
                            The environment that you can connect to everyone
                        </h1>

                        <p className="text-base px-4 mx-10 text-center md:text-xl mb-10 max-w-6xl leading-relaxed text-appchat-bluesky/90">
                            Where you can belong to a club, a group, or a worldwide community.
                            Where just you and a handful of friends can spend time together. A place that makes it easy
                            to talk every day and hang out more often.
                        </p>
                    </motion.div>
                    <motion.div
                        style={{y: textY}}
                        className="absolute top-[60%] left-[15%] justify-center flex items-center gap-5">
                        <Button
                            className="bg-appchat-bluesky text-lg text-white hover:shadow-lg hover:text-appchat-bluesky/80 rounded-b-md px-4 h-12 w-50 font-semibold transition-all" onClick={()=> navigate("login")}
                        >
                            Login
                        </Button>
                    </motion.div>
                </div>
                <div
                    className="relative h-[70vh] max-h-screen w-full bg-appchat-bluesky/20 rounded-[40px] lg:rounded-none lg:rounded-l-[60px] overflow-hidden shadow-inner">
                    <motion.div
                        style={{y: cloudY}}
                        className="absolute top-[10%] left-[5%] w-40 md:w-48 opacity-90 z-0"
                    >
                        <motion.img
                            src={cloud_img}
                            animate={{x: [0, 50, 0]}}
                            transition={{duration: 10, repeat: Infinity, ease: "easeInOut"}}
                        />
                    </motion.div>
                    <motion.div
                        style={{y: cloudY}}
                        className="absolute top-[20%] right-[10%] w-40 md:w-56 opacity-60 z-0"
                    >
                        <motion.img
                            src={cloud_img}
                            animate={{x: [0, -60, 0]}}
                            transition={{duration: 15, repeat: Infinity, ease: "easeInOut"}}
                        />
                    </motion.div>
                    <motion.div
                        style={{y: cloudY}}
                        className="absolute top-[5%] left-[40%] w-30 opacity-50 z-0"
                    >
                        <motion.img
                            src={cloud_img}
                            animate={{x: [-20, 100, -20]}}
                            transition={{duration: 25, repeat: Infinity, ease: "linear"}}
                        />
                    </motion.div>
                    <div
                        className="container top-50 mx-auto px-6 relative z-10 flex flex-col md:flex-row items-center gap-10">
                        <motion.div
                            style={{y: chattingY}}
                            className="flex-1 relative"
                        >
                            <motion.img
                                src={chatting_img}
                                alt="Chatting"
                                className="w-90 mx-auto object-contain drop-shadow-2xl"
                                initial={{scale: 0.8, opacity: 0}}
                                whileInView={{scale: 1, opacity: 1}}
                                transition={{duration: 0.6}}
                            />
                        </motion.div>
                    </div>
                    <motion.div
                        style={{y: grassY}}
                        className="absolute top-90 left-[30px] md:left-[30%] w-20 md:w-20 z-10 pointer-events-none"
                    >
                        <motion.img
                            src={grass_img}
                            animate={{rotate: [-2, 2, -2]}}
                            transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                            style={{originY: 1}}
                        />
                    </motion.div>

                    <motion.div
                        style={{y: grassY}}
                        className="absolute top-90 right-[30px] md:right-[30%] w-20 md:w-20 z-10 pointer-events-none"
                    >
                        <motion.img
                            src={grass_img}
                            animate={{rotate: [2, -2, 2]}}
                            transition={{duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1}}
                            style={{originY: 1}}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    )
}