"use client";
import { Button } from "@/components/UI/button";

export default function Home() {
    return (
        <>
            <div>
                <Button
                    className="font-bold"
                    label="Submit"
                    intent="secondary"
                    size="s"
                />
            </div>
        </>
    );
}
