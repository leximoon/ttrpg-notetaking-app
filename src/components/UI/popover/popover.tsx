import React, {
    createContext,
    useState,
    useContext,
    useRef,
    useEffect,
} from "react";

type PopoverContextType = {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    triggerRef: React.RefObject<HTMLElement>;
};

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

export const usePopover = () => {
    const context = useContext(PopoverContext);
    if (!context) {
        throw new Error("usePopover must be used within a Popover component");
    }
    return context;
};

interface PopoverProps {
    children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ children }) => {
    const [open, setOpen] = useState(false);
    const triggerRef = useRef<HTMLElement>(null);

    return (
        <PopoverContext.Provider value={{ open, setOpen, triggerRef }}>
            {children}
        </PopoverContext.Provider>
    );
};
