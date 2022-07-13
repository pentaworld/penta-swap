import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { BrowserRouter } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { RecoilURLSyncJSON } from "recoil-sync";
import { ErrorFallBack, LoadingFallBack } from "./fallback";

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <RecoilRoot>
      <RecoilURLSyncJSON location={{ part: "queryParams" }}>
        <Suspense fallback={<LoadingFallBack />}>
          <ErrorBoundary FallbackComponent={ErrorFallBack}>
            <BrowserRouter>{children}</BrowserRouter>
          </ErrorBoundary>
        </Suspense>
      </RecoilURLSyncJSON>
    </RecoilRoot>
  );
};
