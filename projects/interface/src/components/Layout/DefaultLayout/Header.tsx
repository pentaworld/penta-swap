import { Account } from "../../Account";
import { IconLink, Logo } from "../../Elements";
import { NavBar } from "./Navbar";

export const Header = () => {
  return (
    <header className="fixed top-0 w-full">
      <div className="navbar mx-auto max-w-screen-lg justify-between gap-4 sm:px-4">
        <div className="flex-1">
          <IconLink to="/swap" className="py-0">
            <Logo />
          </IconLink>
        </div>
        <div className="hidden justify-center sm:flex sm:flex-1 ">
          <NavBar />
        </div>
        <div className="flex-1 justify-end">
          <Account />
        </div>
      </div>
    </header>
  );
};
