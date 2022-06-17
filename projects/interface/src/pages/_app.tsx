import "@/assets/styles/global.css";
import { DefaultLayout } from "@/components/Layout/DefaultLayout";
import React from "react";

function MyApp({
  Component,
  pageProps,
}: {
  Component: React.FC;
  pageProps: any;
}) {
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default MyApp;
