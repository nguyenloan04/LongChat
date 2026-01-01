import {motion} from 'framer-motion';
import {Button} from "@/components/ui/button.tsx";
import {useNavigate} from "react-router-dom";

export default function ComingSoon() {
    const text = "Coming soon..."
    const containerVariants = {
        hidden: {opacity: 0},
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            },
        },
    }
    const letterVariants = {
        hidden: {opacity: 0, y: 10},
        visible: {
            opacity: 1,
            y: 0,
            transition: {type: "spring", stiffness: 100}
        },
    }
    const navigate = useNavigate();
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4 relative overflow-hidden">

            <div className="z-10 text-center">

                <motion.h1
                    className="text-5xl md:text-8xl font-black text-appchat-bluesky tracking-widest mb-6 font-sans"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {text.split("").map((char, index) => (
                        <motion.span key={index} variants={letterVariants}>
                            {char}
                        </motion.span>
                    ))}
                </motion.h1>

                <motion.p
                    className="text-gray-400 text-lg md:text-xl mb-8 max-w-lg mx-auto"
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{delay: 2.5, duration: 1}}
                >
                    Chúng tôi sẽ phát triển chức năng này sau.
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