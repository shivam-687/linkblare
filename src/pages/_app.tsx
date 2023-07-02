/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { type AppType } from "next/app";
import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import NProgress from "nprogress"
import { api } from "~/utils/api";
import "~/styles/globals.css";
import 'nprogress/nprogress.css'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import LayoutSwitcher from "~/layouts/LayoutSwitcher";
import ThemeProvider from "~/lib/theme/ThemeProvider";
import { Router } from "next/router";


Router.events.on('routeChangeStart', () => void NProgress.start()); 
Router.events.on('routeChangeComplete', () => NProgress.done()); 
Router.events.on('routeChangeError', () => NProgress.done());  


const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <ThemeProvider>
        <LayoutSwitcher>
          <Component {...pageProps} />
        </LayoutSwitcher>
      </ThemeProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
