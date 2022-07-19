import { NavBar } from "./Navbar";

export const BottomNav = () => {
  return (
    <div className="fixed bottom-4 flex w-full justify-center sm:hidden">
      <NavBar />
    </div>
  );
};
