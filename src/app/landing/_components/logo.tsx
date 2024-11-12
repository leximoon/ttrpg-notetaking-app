import Image from "next/image";
import { Poppins } from "next/font/google";

const font = Poppins({
    subsets: ["latin"],
    weight: ["400", "600"]
})

export const Logo = () => {
    return (
        <div className="hidden md:flex items-center gap-x-2">
            <Image
            src="/dragon-logo.svg"
            height="40"
            width="40"
            alt="Logo"
            />
        </div>
    )
}