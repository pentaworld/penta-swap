import { NavLink as RouterNavLink } from "react-router-dom";

const NavLink: React.FC<{ to: string; children: React.ReactNode }> = ({
  to,
  children,
}) => {
  return (
    <RouterNavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "btn-sm btn" : "btn btn-sm btn-secondary"
      }
    >
      {children}
    </RouterNavLink>
  );
};

export const NavBar = () => {
  return (
    <div className="card flex-row gap-2 rounded-lg bg-base-100 shadow-lg">
      <NavLink to="/swap">Swap</NavLink>
      <a className="btn btn-ghost btn-sm">Pool</a>
      <a className="btn btn-ghost btn-sm">Penta</a>
    </div>
  );
};
