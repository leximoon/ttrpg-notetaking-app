import Image from "next/image";

export const Main = () => {
    return (
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px]">
                    <Image
                        src="/dragons.svg"
                        fill
                        className="object-contain"
                        alt="dragons"
                    />
                </div>
            </div>
        </div>
    );
};
