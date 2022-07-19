import { Spinner } from "@/components/Elements";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import { ThemeBox } from "../ThemeBox";
import { BottomNav } from "./BottomNav";
import { Header } from "./Header";

export const DefaultLayout = () => {
  return (
    <ThemeBox className="min-h-screen bg-base-200">
      <Header />
      <div className="flex flex-col items-center py-24 h-full">
        <Suspense fallback={<Spinner />}>
          <Outlet />
        </Suspense>
      </div>
      <BottomNav />
    </ThemeBox>
  );
};
