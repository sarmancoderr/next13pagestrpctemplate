import { type AppType } from "next/app";

import { CookiesProvider } from 'react-cookie';
import { api } from "~/utils/api";

import { useEffect } from "react";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  useEffect(() => {
    // addToHomescreen()
  })
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  )
};

export default api.withTRPC(MyApp);
