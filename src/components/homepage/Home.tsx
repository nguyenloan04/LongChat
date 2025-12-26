// import {useDispatch} from "react-redux";

import NavBar from "@/components/homepage/NavBar.tsx";
import MainPage from "@/components/homepage/MainPage.tsx";
import MarqueeBar from "@/components/homepage/MarqueeBar.tsx";
import Footer from "@/components/homepage/Footer.tsx";
import {motion} from "framer-motion";
import Feature from "@/components/homepage/Feature.tsx";

const imgTop= "src/assets/img/image_1.webp"
const imgBottom= "src/assets/img/image_2.webp"
const imgLeft= "src/assets/img/image_3.webp"
const imgRight= "src/assets/img/image_4.webp"
export default function Home(){
    // const dispatcher = useDispatch()
    const transitionSettings = { duration: 0.8, ease: "easeOut" as "easeOut" }
    const viewportSettings = { once: false, amount: 0.3 }
    return (
        <div className="flex flex-col bg-white ">
            <motion.img
                src={imgTop}
                alt="Decorative Top"
                className="absolute top-[5%] left-[30%] w-64 h-auto opacity-70 z-0 pointer-events-none"
                initial={{ y: -70, opacity: 0 }}
                whileInView={{ y: 0, opacity: 0.7 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: "easeOut"}}
            />

            <motion.img
                src={imgBottom}
                alt="Decorative Bottom"
                className="hidden md:block absolute top-[60%] right-[30%] w-64 h-auto opacity-70 z-0 pointer-events-none"

                initial={{ y: 100, opacity: 0 }}
                whileInView={{ y: 0, opacity:0.7}}
                viewport={viewportSettings}
                transition={{ ...transitionSettings, delay: 0.2 }}
            />

            <motion.img
                src={imgLeft}
                alt="Decorative Left"
                className="hidden md:block absolute top-[20%] left-[30px] w-64 h-auto opacity-70 z-0 pointer-events-none"

                initial={{ x: -70, opacity: 0}}
                whileInView={{ x: 0, opacity: 0.7  }}
                viewport={viewportSettings}
                transition={{ ...transitionSettings, delay: 0.3 }}
            />

            <motion.img
                src={imgRight}
                alt="Decorative Right"
                className="hidden md:block absolute top-[40%] left-[75%] w-64 h-auto opacity-70 z-0 pointer-events-none"

                initial={{ x: 100, opacity: 0}}
                whileInView={{ x: 0, opacity: 0.7 }}
                viewport={viewportSettings}
                transition={{ ...transitionSettings, delay: 0.4 }}
            />
            <NavBar />
            <MainPage/>
            <Feature/>
            <MarqueeBar/>
            <Footer/>
        </div>
    )
}