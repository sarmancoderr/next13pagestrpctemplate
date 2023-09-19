import { type AppType } from "next/app";

import { api } from "~/utils/api";

import { useEffect } from "react";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // addToHomescreen()
  })
  return (
    <Component {...pageProps} />
  )
};

export default api.withTRPC(MyApp);
