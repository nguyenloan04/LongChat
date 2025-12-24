import MenuUser from "@/components/user/MenuUser.tsx";
import UserProfile from "@/components/user/UserProfile.tsx";
import Theme from "@/components/user/Theme.tsx";
import {Navigate, useParams} from "react-router-dom";

export function UserPage() {
    const params = useParams();
    const map = new Map([
        {key: "user-profile", value: <UserProfile />},
        {key: "theme", value: <Theme />},
        {key: "privacy", value: ""},
        {key: "contact", value: ""},
        {key: "about-us", value: ""},
        {key: undefined, value: null}
    ].map(ele => [ele.key, ele.value]))
    return (
        <div className="mx-auto flex justify-center h-[100vh] dark:bg-gray-900 dark:text-white">
            <div className="flex-2">
                <MenuUser text={params.key ?? ""} />
            </div>
            
            <div className="flex-10">
                {map.get(params.key) ?? <Navigate to="/user/user-profile" replace />}
            </div>
        </div>
    );
}