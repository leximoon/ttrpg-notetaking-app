import { cva, type VariantProps } from "class-variance-authority";

const button = cva(
    "button rounded-lg text-primary-contrast flex items-center gap-1",
    {
        //Properties of the button

        //TODO: Add transparent with no border option
        variants: {
            //Defines the main color of the button
            intent: {
                primary: [""],
                secondary: [""],
            },
            //Define the style of the button
            variant: {
                fill: ["border-transparent"],
                dashed: ["text-text font-semibold border-2 border-dashed"],
                transparent: ["border-transparent bg-transparent !p-0"],
            },
            //Define the size of the button
            size: {
                s: ["text-sm", "py-1", "px-2"],
                m: ["text-base", "py-2", "px-4"],
                l: ["text-lg", "py-3", "px-6"],
            },
        },
        /**
         * Composed css classes for correct color selection depending the variant
         */
        compoundVariants: [
            {
                intent: "primary",
                variant: "fill",
                class: "bg-primary/70 hover:bg-primary",
            },
            {
                intent: "secondary",
                variant: "fill",
                class: "bg-secondary/70 hover:bg-secondary",
            },
            {
                intent: "primary",
                variant: "dashed",
                class: "border-primary hover:bg-primary/30",
            },
            {
                intent: "secondary",
                variant: "dashed",
                class: "border-secondary hover:bg-secondary/30",
            },
        ],
        /**
         * Default values
         *  */
        defaultVariants: {
            intent: "primary",
            size: "m",
            variant: "fill",
        },
    }
);

//TODO: create role prop for the button
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {
    label?: string;
    //Prop to fill the whole content where the button is placed
    fillOut?: boolean;
    icon?: React.ReactNode;
}

const Button = ({
    intent,
    size,
    variant,
    className,
    icon,
    label,
    fillOut = false,
    onClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${fillOut && "w-full h-full"} ${button({
                className,
                intent,
                size,
                variant,
            })}`}
            {...props}
        >
            {icon}
            {label}
        </button>
    );
};

export { Button };
