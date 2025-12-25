import { motion } from "framer-motion";

export default function MainPage(){
    return(
        <section className="h-screen items-center justify-center text-appchat-bluesky mt-30 pt-20 pb-32 relative">
            <motion.div className="container mx-auto px-6 text-center relative z-10 flex flex-col items-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: false, margin: "-100px" }}
                        transition={{ duration: 0.7 , ease: "easeOut" }}>

                <h1 className="text-4xl md:text-[2rem] font-black mb-6 uppercase tracking-wide font-sans">
                    The environment that you can connect to everyone
                </h1>

                <p className="text-base md:text-xl mb-10 max-w-3xl leading-relaxed text-appchat-bluesky/90">
                    Where you can belong to a club, a group, or a worldwide community.
                    Where just you and a handful of friends can spend time together. A place that makes it easy
                    to talk every day and hang out more often.
                </p>
            </motion.div>
        </section>
    )
}