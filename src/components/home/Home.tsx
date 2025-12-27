// import {useDispatch} from "react-redux";

import NavBar from "@/components/home/NavBar.tsx";
import MainPage from "@/components/home/MainPage.tsx";
import Footer from "@/components/home/Footer.tsx";
import FeatureTemp from "@/components/home/FeatureTemp.tsx";

export default function Home(){
    // const dispatcher = useDispatch()
    return (
        <div className="min-h-screen w-full flex flex-col font-sans antialiased bg-white ">
            <NavBar />
            <MainPage/>
            <FeatureTemp/>
            <Footer/>
        </div>
    )
}