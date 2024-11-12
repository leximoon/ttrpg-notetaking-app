import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button rounded-lg text-primary-contrast", {
    //Properties of the button
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
});

interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {
    label?: string;
    //Prop to fill the whole content where the button is placed
    fillOut?: boolean;
}

const Button = ({
    intent,
    size,
    variant,
    className,
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
            {label}
        </button>
    );
};

export { Button };