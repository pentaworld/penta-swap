import { Spinner } from "@/components/Elements";
import { ThemeBox } from "@/components/Layout";

export const ErrorFallBack = () => {
  return (
    <ThemeBox className="flex min-h-screen items-center justify-center">
      <h2>Some Error Happen!!!</h2>
    </ThemeBox>
  );
};

export const LoadingFallBack = () => {
  return (
    <ThemeBox className="flex min-h-screen items-center justify-center">
      <Spinner size="lg" />
    </ThemeBox>
  );
};
