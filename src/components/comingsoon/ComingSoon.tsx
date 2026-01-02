import {motion} from 'framer-motion';
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function ComingSoon() {
    const text = "Coming soon..."
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

            <div className="z-10 text-center">
                <h1 className="text-6xl md:text-8xl font-black text-appchat-bluesky tracking-widest mb-6">
                    {text.split("").map((char, index) => (
                        <span
                            key={index}
                            className="char-fade-in"
                            style={{
                                animationDelay: `${index * 0.1}s`
                            }}
                        >
                            {char === " " ? "\u00A0" : char}
          </span>
                    ))}
                </h1>

                <motion.p
                    className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg mx-auto"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2.5, duration: 1}}
                >
                    Chức năng này đang được phát triển. Hãy chờ nhé!!!
                </motion.p>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 3, duration: 1}}
                >
                    <Button

                        className="mt-10 bg-appchat-bluesky text-lg text-white hover:bg-white hover:border hover:text-appchat-bluesky/80 rounded-b-md px-4 h-12 w-50 font-semibold transition-all"
                        onClick={() => navigate("/")}
                    >
                        Go Home
                    </Button>
                </motion.div>
            </div>
        </div>
    )
}