import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";

import "../globals.css";


import Topbar from "@/components/shared/Topbar";
import LeftSidebar from "@/components/shared/LeftSidebar";
import RightSidebar from "@/components/shared/RightSidebar";
import Bottombar from "@/components/shared/Bottombar";
import { dark } from "@clerk/themes"
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title:"Threads",
  description:"A Next.JS thread clone project"
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider
      appearance={{
        baseTheme: dark,
      }}>
        <body className={inter.className}>
            <Topbar/>
              <main className="flex flex-row ">
                <LeftSidebar/>

                <section className="main-container">
                  <div className="w-full max-w-4xl ">{children}</div>
                </section>

                <RightSidebar/>
              </main>
            <Bottombar/>
        </body>
        
      </ClerkProvider>
    </html>
  );
}
