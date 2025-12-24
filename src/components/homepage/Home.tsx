// import {useDispatch} from "react-redux";

import NavBar from "@/components/homepage/NavBar.tsx";
import MainPage from "@/components/homepage/MainPage.tsx";
import FeatureSection from "@/components/homepage/FeatureSection.tsx";
import MarqueeBar from "@/components/homepage/MarqueeBar.tsx";
import Footer from "@/components/homepage/Footer.tsx";

export default function Home(){
    // const dispatcher = useDispatch()

    return (
        <div className="flex flex-col bg-appchat-bluesky">
            <div className="absolute inset-0 z-0"></div>
            <NavBar />
            <MainPage/>
            <FeatureSection title={"Chit chat w ur besties"} description={"Create an invite-only place"} imageSrc={"./src/assets/react.svg"}/>
            <FeatureSection title={"Make a real community"} description={"Create a real world belongs to you"} imageSrc={"./src/assets/react.svg"}/>
            <MarqueeBar/>
            <Footer/>
        </div>
    )
}