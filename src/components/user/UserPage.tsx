import MenuUser from "@/components/user/MenuUser.tsx";
import {Navigate, useParams} from "react-router-dom";
import {MenuIcon, X} from "lucide-react";
import {useDispatch, useSelector} from "react-redux";
import type {ReduxState} from "@/constants/ReduxState.ts";
import {setChooseViewMenuUser} from "@/redux/slices/userPageSlice.ts";
import UserProfile from "@/components/user/UserProfile.tsx";
import Theme from "@/components/user/Theme.tsx";
import {ChatSideBar} from "@/components/chat/ChatSideBar.tsx";
import {AboutUs} from "@/components/user/AboutUs.tsx";

export function UserPage() {
    const chooseViewMenuUser = useSelector((state: ReduxState) => state.userPageState.chooseViewMenuUser);
    const dispatch = useDispatch();
    const params = useParams();
    
    const renderContent = () => {
        switch (params.key) {
            case 'user-profile': return <UserProfile />
            case 'theme': return <Theme />
            case 'about-us': return <AboutUs />
            default: return <Navigate to={"/user/user-profile"} replace /> ;
        }
    }
    return (
        <div className="mx-auto lg:flex justify-center h-full lg:h-[100vh] dark:bg-gray-900 dark:text-white">
            <div className="lg:w-[60px] w-full"><ChatSideBar /></div>
            <div className="lg:hidden">
                <div className={`${chooseViewMenuUser ? "hidden" : "block"} p-2`}
                     onClick={() => {
                         dispatch(setChooseViewMenuUser(true))
                     }}><MenuIcon className="cursor-pointer hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 rounded"/></div>
                <div className={`${chooseViewMenuUser ? "block" : "hidden"} z-100 fixed w-screen h-screen`}>
                    <div className="z-100 absolute bg-black/50 w-full h-full cursor-pointer" onClick={() => dispatch(setChooseViewMenuUser(false))}>
                    </div>
                    <div className="z-101 absolute w-60 text-sm lg:block bg-white dark:bg-gray-900 h-full">
                        <MenuUser text={params.key ?? ""}/>
                        <div className="absolute right-1 top-2 z-102 cursor-pointer hover:bg-neutral-300/50 dark:hover:bg-neutral-600/50 rounded"
                             onClick={() => dispatch(setChooseViewMenuUser(false))}><X/></div>
                    </div>
                </div>
                <div className="overflow-y-auto text-sm h-full">
                    {renderContent()}
                </div>
            </div>
            <div className="hidden flex-1 lg:block h-full">
                <MenuUser text={params.key ?? ""}/>
            </div>
            <div className="hidden flex-5 lg:block overflow-y-auto">
                {renderContent()}
            </div>
        </div>
    );
}