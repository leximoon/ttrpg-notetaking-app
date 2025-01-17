"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useState } from "react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "../button";

const button = cva("button rounded-sm text-primary-contrast inline-flex items-center h-10 px-4 py-2", {
  //Properties of the button
  variants: {
      //Defines the main color of the button
      intent: {
          primary: [""],
          secondary: [""],
      },
      //Define the style of the button
      variant: {
          fill: [""],
          dashed: [""],
          transparent: [""]
      },
      //Define the size of the button
      size: {
          s: [""],
          m: [""],
          l: [""],
      },
  },

  compoundVariants: [
],
/**
 * Default values
 *  */
defaultVariants: {
    intent: "primary",
    size: "m",
    variant: "fill",
},
});

interface DropdownProps 
  extends React.HTMLAttributes<HTMLDivElement>,VariantProps<typeof button>{
  fillOut?: boolean;
  buttonLabel: string;
  items: {
    title: string;
    url?: string;
    action?: () => void;
    }[];
  }

  export const Dropdown = ({
    intent,
    size,
    variant,
    fillOut = false,
    buttonLabel,
    items,
    className,
    ...props
  }: DropdownProps) => {
    const [isOpen, setOpen] = useState(false);
    const handleToggle = () => {
      setOpen((prev) => !prev);
    };
    return (
      <div className="relative p-2">

        <Button onClick={handleToggle} label={buttonLabel} variant={variant} intent={intent} icon={isOpen ? <ChevronDown /> : <ChevronRight /> }/>

        {isOpen && (
          <div className="absolute top-12">
            <ul className="w-56 h-auto shadow-md rounded-sm p-1 border">
              {items.map((item, index) => (
                <li
                  key={index}
                  className={`relative flex items-center gap-2 px-4 py-2 text-sm hover:bg-gray-100 rounded-md`}
                >
                  {item.title}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };