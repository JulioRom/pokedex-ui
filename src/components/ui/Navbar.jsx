import { NavLink } from "react-router-dom";
import { NAVIGATION_LINKS } from "./NavigationLinks";

const Navbar = () => {
    return (
        <nav className="bg-red-700 text-white p-4 flex justify-center gap-6">
            {NAVIGATION_LINKS.map((link) => (
                <NavLink
                    key={link.path}
                    to={link.path}
                    className={({ isActive }) =>
                        `px-4 py-2 rounded-md transition ${isActive ? "bg-white text-red-700 font-bold" : "hover:bg-white hover:text-red-700"
                        }`
                    }
                >
                    {link.name}
                </NavLink>
            ))}
        </nav>

    );
};

export default Navbar;
