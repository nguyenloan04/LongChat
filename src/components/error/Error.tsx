import { motion } from 'framer-motion'
import {Button} from "@/components/ui/button.tsx"
import {useNavigate} from "react-router-dom"

export default function Error() {
    const numberAnimation = {
        initial: { scale: 1 },
        animate: { scale: 1.2 },
        transition: {
            duration: 1.5,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse"
        } as const
    }
    const exclamationAnimationImg = "src/assets/img/exclamation_mark.png"
    const navigate = useNavigate();
    return (
        <div
            className="min-h-screen bg-white flex flex-col items-center justify-center text-appchat-bluesky overflow-hidden font-sans">
            <motion.img
                className="absolute top-30 left-[55%] w-64 h-auto"
                src={exclamationAnimationImg}
                animate={{rotate: [-5, 5, -5]}}
                transition={{duration: 3, repeat: Infinity, ease: "easeInOut"}}
                style={{originY: 1}}
            />
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-[0.2em] mb-4 text-appchat-bluesky">
                Page Not Found
            </h1>

            <div className="flex items-center justify-center text-[8rem] md:text-[12rem] font-black leading-none">
                <motion.span
                    className="text-appchat-bluesky-500 origin-center"
                    initial={numberAnimation.initial}
                    animate={numberAnimation.animate}
                    transition={numberAnimation.transition}
                >
                    4
                </motion.span>
                <motion.img
                    initial={numberAnimation.initial}
                    animate={numberAnimation.animate}
                    transition={numberAnimation.transition}
                    src="src/assets/img/cat.gif"
                    alt="0"
                    className="h-[0.9em] w-auto mx-2 md:mx-6 object-contain"
                />
                <motion.span
                    className="text-appchat-bluesky-500 origin-center"
                    initial={numberAnimation.initial}
                    animate={numberAnimation.animate}
                    transition={numberAnimation.transition}
                >
                    4
                </motion.span>
            </div>
            <div className="mt-15 font-semibold text-lg">Rất tiếc, chúng tôi không thể tìm thấy trang bạn muốn...</div>
            <Button
                className="mt-10 bg-appchat-bluesky text-lg text-white hover:bg-white hover:border hover:text-appchat-bluesky/80 rounded-b-md px-4 h-12 w-50 font-semibold transition-all" onClick={()=> navigate("/")}
            >
                Go Home
            </Button>

        </div>
    )
}