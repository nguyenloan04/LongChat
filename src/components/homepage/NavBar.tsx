import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import {cn} from "@/lib/utils.ts";

export default function NavBar() {
    const [isScrolled, setIsScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <nav className="w-full py-4 sticky top-0 z-50">
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="/" className={cn("text-white font-black text-2xl tracking-tighter flex items-center gap-2",
                    isScrolled ? "bg-white p-3 rounded-sm text-appchat-bluesky" : "")}>
                    <i className="fa-solid fa-comment"></i> Long chat - stay connected
                </a>
                <div className="flex items-center gap-5">
                    <Button
                        className="bg-white text-lg text-black hover:bg-white/90 hover:shadow-lg hover:text-appchat-bluesky rounded-b-md px-4 h-12 w-50 font-semibold transition-all"
                    >
                        Login
                    </Button>
                </div>
            </div>
        </nav>

    )
}