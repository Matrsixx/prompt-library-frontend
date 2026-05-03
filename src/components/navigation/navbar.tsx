import { Link, NavLink } from "react-router-dom";
import { useSessionRole } from "../../context/SessionRoleContext";

export function Navbar() {
    const { role, clearRole } = useSessionRole();

    return (
        <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto grid max-w-5xl grid-cols-3 items-center px-6 py-3">
                {/* Left: brand */}
                <div className="justify-self-start">
                    <Link
                        to="/"
                        className="text-lg font-semibold tracking-tight text-neutral-900 hover:text-indigo-600"
                    >
                        <span className="lowercase">Accenture</span>
                    </Link>
                </div>

                {/* Center: nav */}
                <nav className="flex items-center justify-center gap-1 text-sm font-medium">
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
                            className="text-xs text-neutral-600 hover:text-indigo-600 hover:underline"
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
                    "rounded-md px-3 py-1.5 transition-colors",
                    isActive
                        ? "bg-indigo-600/10 text-indigo-700"
                        : "text-neutral-600 hover:text-neutral-900",
                ].join(" ")
            }
        >
            {children}
        </NavLink>
    );
}
