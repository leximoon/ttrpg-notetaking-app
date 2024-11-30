"use client";

// TODO: add arrow right icon to button
const Header = () => {
    return (
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl md:text-6xl sm:text-5xl font-bold">
                All your adventures, secrets, maps & characters together.
                Protected by the <span className="underline">BookWyrm</span>
            </h1>
            <h3 className="text-base md:text-2xl sm:text-xl font-medium">
                BookWyrm is the TTRPG Notetaking App that is ready to use <br />{" "}
                immediatly without having to do a bunch of work before starting.
            </h3>
        </div>
    );
};

export default Header;
