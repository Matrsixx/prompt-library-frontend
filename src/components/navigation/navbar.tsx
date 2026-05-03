import { Link, NavLink } from "react-router-dom";
import { useSessionRole } from "../../context/SessionRoleContext";

export function Navbar() {
    const { role, clearRole } = useSessionRole();

    return (
        <header className="border-b border-neutral-200 bg-black">
            <div className="flex justify-between px-6 py-2">
                {/* Left: brand */}
                <div className="justify-self-start">
                    <Link
                        to="/"
                        className="text-lg font-semibold tracking-tight text-white hover:underline underline-offset-4"
                    >
                        <span className="lowercase">accenture</span>
                        
                    </Link>
                </div>

                {/* Center: nav */}
                <nav className="flex items-center justify-center gap-1 text-sm font-bold">
                    <NavItem to="/" end>
                        Home
                    </NavItem>
                    <NavItem to="/prompt">
                        Create Prompt
                    </NavItem>
                    <NavItem to="/help">
                        Help
                    </NavItem>
                </nav>
               
                {/* Right: role reset (only when applicable) */}
                <div className="flex items-center justify-end gap-3">
                    {role && (
                        <button
                            type="button"
                            onClick={clearRole}
                            className="text-xs text-white hover:underline"
                            title={`Role: ${role.role}`}
                        >
                            Reset Role / Clear Session
                        </button>
                    )}
                </div>
            </div>
        </header>
    );
}

function NavItem({
    to,
    end,
    children,
}: {
    to: string;
    end?: boolean;
    children: React.ReactNode;
}) {
    return (
        <NavLink
            to={to}
            end={end}
            className={({ isActive }) =>
                [
                    "px-3 py-1.5 text-white",
                    isActive
                        ? "underline underline-offset-4"
                        : "text-neutral-600 hover:underline hover:underline-offset-4",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}
