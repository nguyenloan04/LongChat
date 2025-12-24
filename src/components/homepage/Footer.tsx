export default function Footer() {
    const footerSections = [
        { title: "Resources", items: ["College", "Support", "Safety", "Blog", "Feedback"] },
        { title: "Policies", items: ["Terms", "Privacy", "Cookie Settings", "Guidelines"] },
    ];

    return (
        <footer className="bg-footer text-white mt-50 pt-20 pb-10">
            <div className="container mx-auto px-6">

                <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-5 gap-10 mb-16">
                    <div className="lg:col-span-2">
                        <div className="flex gap-4 mt-6">
                            <i className="fa-brands fa-github text-5xl bg-footer rounded-full"></i>
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

                <div className="flex justify-center items-center">
                    <div className="font-black text-9xl">Long Chat</div>
                </div>
            </div>
        </footer>
    );
}