import React from "react";

export const Metadata = () => {
    return (
        <div className="flex flex-col">
            <span className="mb-4 font-bold text-2xl">METADATA</span>
            <span className="m-2">Some text</span>
            <span className="m-2">
                Some description super super ultra mega super ultra long that
                don't fit here nor anywhere
            </span>
            <ol className="m-2">
                <li> # More things</li>
                <li> # More things</li>
                <li> # More things</li>
                <li> # More things</li>
            </ol>
            <hr className="m-2" />
            <ol className="m-2">
                <li> # More things</li>
                <li> # More things</li>
                <li> # More things</li>
                <li> # More things</li>
            </ol>
        </div>
    );
};
