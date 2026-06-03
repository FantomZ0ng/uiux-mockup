import type { Metadata }  from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import Provider from "./provider";

const appFont = DM_Sans({
  subsets: ['latin']
})



export const metadata: Metadata = {
  title: "UIUX Mockup generator App ",
  description: "Generate High qality Free UIUX Mobile and Web Mockcup ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
    <html lang="en" suppressHydrationWarning>
      <body
      className={appFont.className}
      suppressHydrationWarning
      >
        <Provider>
        {children}
        </Provider>
        


      </body>
    </html>
    </ClerkProvider>
  );
}
