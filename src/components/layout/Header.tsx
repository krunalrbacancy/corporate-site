import { NavLink } from "react-router-dom";
import { ROUTES, NAV_ROUTES } from "../../routes/routePaths";

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  isActive
    ? "text-blue-600 font-semibold"
    : "text-gray-700 hover:text-blue-600";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex items-center justify-between gap-6 p-4">
        <NavLink to={ROUTES.HOME} className="text-xl font-bold text-gray-900">
          Corporate
        </NavLink>

        <nav className="flex gap-6">
          <NavLink to={ROUTES.HOME} className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to={ROUTES.ABOUT} className={navLinkClass}>
            About
          </NavLink>
          <NavLink to={ROUTES.SERVICES} className={navLinkClass}>
            Services
          </NavLink>
          <NavLink to={ROUTES.BLOG} className={navLinkClass}>
            Blog
          </NavLink>
          <NavLink to={NAV_ROUTES.CAREERS} className={navLinkClass}>
            Careers
          </NavLink>
          <NavLink to={ROUTES.CONTACT} className={navLinkClass}>
            Contact
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
