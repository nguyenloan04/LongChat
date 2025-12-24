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
        <div className="overflow-hidden py-4 border-y border-white/10">
            <div className="flex w-max">
                <MarqueeGroup/>
                <MarqueeGroup/>
            </div>
        </div>
    )
}

function MarqueeGroup() {
    return (
        <div className="flex animate-marquee items-center justify-around min-w-full px-8">
            {MARQUEE_ITEMS.map((item, index) => (
                <div key={index} className="flex items-center gap-16">
                    <span
                        className="text-4xl md:text-6xl font-black text-white uppercase tracking-wider italic font-sans">
            {item}
          </span>
                </div>
            ))}
        </div>
    );
}