import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button rounded-lg", {
  variants: {
    intent: {
      primary: [
        "bg-blue-500",
        "text-white",
        "border-transparent",
        "hover:bg-blue-600",
      ],
      secondary: [
        "bg-slate-500",
        "text-white",
        "border-gray-400",
        "hover:bg-gray-100",
      ],
    },
    size: {
      s: ["text-sm", "py-1", "px-2"],
      m: ["text-base", "py-2", "px-4"],
      l: ["text-lg", "py-3", "px-6"]
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "m",
  },
});

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof button> { label?: string }

const Button = ({ intent, size, className, label, onClick, ...props }: ButtonProps) => {
    return ( <button onClick={ onClick } className= {button({ className, intent, size})}>{ label }</button> );
}
 
export { Button };