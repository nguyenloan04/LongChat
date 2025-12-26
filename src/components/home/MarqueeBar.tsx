const MARQUEE_ITEMS = [
    "SHARE",
    "TALK",
    "CHAT",
    "SHARE",
    "TALK",
    "CHAT"
];
export default function MarqueeBar() {
    return (
        <section className="min-h-screen">
            <div className="overflow-hidden py-10 border-y border-white/10">
                <div className="flex w-max">
                    <MarqueeGroup/>
                    <MarqueeGroup/>
                </div>
            </div>
        </section>
    )
}

function MarqueeGroup() {
    return (
        <div className="mb-10 flex animate-marquee items-center justify-around min-w-full px-8">
            {MARQUEE_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center gap-16">
                    <span
                        className="text-4xl md:text-6xl font-black text-appchat-bluesky uppercase tracking-wider italic font-sans">
            {item}
          </span>
                </div>
            ))}
        </div>
    );
}