import { cva, type VariantProps } from "class-variance-authority";

const button = cva("button text-text flex items-center gap-1", {
    //Properties of the button

    //TODO: Add transparent with no border option
    variants: {
        //Defines the main color of the button
        intent: {
            primary: [""],
            secondary: [""],
            sidebaritem: [""],
            danger: ["text-text"],
        },
        //Define the style of the button
        variant: {
            fill: ["border-transparent rounded-lg"],
            dashed: [
                "text-text font-semibold border-2 border-dashed rounded-lg",
            ],
            transparent: ["border-transparent bg-transparent"],
        },
        //Define the size of the button
        size: {
            s: ["text-sm", "py-1", "px-2"],
            m: ["text-base", "py-2", "px-4"],
            l: ["text-lg", "py-3", "px-6"],
            auto: [""],
        },
    },
    /**
     * Composed css classes for correct color selection depending the variant
     */
    compoundVariants: [
        {
            intent: "primary",
            variant: "fill",
            class: "bg-primary hover:bg-primary/70",
        },
        {
            intent: "secondary",
            variant: "fill",
            class: "bg-secondary hover:bg-secondary/70",
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
        {
            intent: "danger",
            variant: "fill",
            class: "bg-danger/70 hover:bg-danger",
        },
        {
            intent: "danger",
            variant: "transparent",
            class: "hover:bg-danger/40",
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

//TODO: create role prop for the button
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement>,
        VariantProps<typeof button> {
    label?: string;
    //Prop to fill the whole content where the button is placed
    icon?: React.ReactNode;
}

const Button = ({
    intent,
    size,
    variant,
    className,
    icon,
    label,
    onClick,
    ...props
}: ButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={`${button({
                className,
                intent,
                size,
                variant,
            })}`}
            {...props}
        >
            <span>{icon}</span>
            {label}
        </button>
    );
};

export { Button };
