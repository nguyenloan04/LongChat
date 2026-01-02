import {useNavigate} from "react-router-dom";

export default function Footer() {
    const footerSections = [
        {title: "Resources", items: ["College", "Support", "Safety", "Blog", "Feedback"]},
        {title: "Policies", items: ["Terms", "Privacy", "Cookie Settings", "Guidelines"]},
    ]
    const navigate = useNavigate();

    return (
            <footer className="text-white bg-footer pt-70">
                <div className="container mx-auto px-6">

                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-10 mb-16">
                        <div className="lg:col-span-2">
                            <div className="flex gap-4 mt-6">
                                <i className="fa-brands fa-github text-5xl bg-footer rounded-full" onClick={()=> navigate("comingsoon")}></i>
                                <div className="w-10 h-10 bg-white rounded-full"></div>
                                <div className="w-10 h-10 bg-white rounded-full"></div>
                                <div className="w-10 h-10 bg-white rounded-full"></div>
                            </div>
                        </div>

                        {footerSections.map((section) => (
                            <div key={section.title}>
                                <h4 className="text-white font-medium mb-4">{section.title}</h4>
                                <ul className="space-y-2">
                                    {section.items.map((item) => (
                                        <li key={item}>
                                            <a href="/" className="hover:underline">{item}</a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    <div className="my-8"></div>

                    <div className="flex pt-10 justify-center items-center">
                        <div className="font-black text-7xl">LongChat</div>
                    </div>
                </div>
            </footer>
    );
}