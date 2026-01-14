import { useNavigate } from "react-router-dom"

export function AuthFooter() {
    const navigate = useNavigate()
    const features = [
        {
            title: "Điều khoản",
            navigate: () => navigate("/privacy-policy")
        },
        {
            title: "Chính sách quyền riêng tư",
            navigate: () => navigate("/privacy-policy")
        },

    ]


    return (
        <div
            className="flex gap-8 bg-neutral-100 dark:bg-gray-900 p-2 w-full justify-center"
        >
            {features.map(feature => (
                <div
                    className="text-neutral-500 dark:text-neutral-300 hover:text-blue-500 hover:underline hover:underline-offset-1 dark:hover:text-neutral-500 cursor-pointer"
                    onClick={feature.navigate}
                >
                    <span className="text-xs">{feature.title}</span>
                </div>
            ))}
        </div>
    )
}