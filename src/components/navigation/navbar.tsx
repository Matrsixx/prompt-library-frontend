import { Link, NavLink } from "react-router-dom";
import { useSessionRole } from "../../context/SessionRoleContext";
import accentureIcon from "../../assets/Accenture_Icon.svg";

export function Navbar() {
    const { role, clearRole } = useSessionRole();

    return (
        <header className="border-b border-neutral-200 bg-white">
            <div className="mx-auto grid max-w-5xl grid-cols-[auto_1fr_auto] items-center gap-2 px-4 py-3 sm:gap-4 sm:px-6">
                {/* Left: brand */}
                <div className="justify-self-start">
                    <Link
                        to="/"
                        className="flex items-center gap-2 text-neutral-900 hover:opacity-80"
                        aria-label="Accenture Security — home"
                    >
                        <img src={accentureIcon} alt="" className="h-6 w-auto sm:h-7" />
                    </Link>
                </div>

                {/* Center: nav */}
                <nav className="flex items-center justify-center gap-0.5 text-xs font-medium sm:gap-1 sm:text-sm">
                    <NavItem to="/" end>
                        Home
                    </NavItem>
                    <NavItem to="/prompt">
                        <span className="sm:hidden">Prompt</span>
                        <span className="hidden sm:inline">Create Prompt</span>
                    </NavItem>
                    <NavItem to="/help">
                        Help
                    </NavItem>
                </nav>

                {/* Right: role reset (only when applicable) */}
                <div className="flex items-center justify-end">
                    {role && (
                        <button
                            type="button"
                            onClick={clearRole}
                            className="text-xs text-neutral-600 hover:text-indigo-600 hover:underline"
                            title={`Role: ${role.role}`}
                        >
                            <span className="sm:hidden">Reset</span>
                            <span className="hidden sm:inline">Reset Role / Clear Session</span>
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
                    "rounded-md px-2 py-1.5 transition-colors sm:px-3",
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
