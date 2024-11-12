import Link from "next/link";

import { navLinks } from "@/utils/panelRoutes";

const NavList = () => {
    return (
        <nav>
            <ul className="space-y-2 font-normal">
                {navLinks.map((link, index) => {
                    return (
                        <li>
                            <Link
                                key={index}
                                href={`/panel${link.path}`}
                                className="flex items-center p-2 rounded-lg hover:bg-primary/15"
                            >
                                {link.icon}
                                <span className="ms-3">{link.name}</span>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
};

export { NavList };
