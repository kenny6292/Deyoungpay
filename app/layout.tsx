import "./globals.css";
import type { Metadata } from "next";
export const metadata: Metadata={title:"Global Pay — One Wallet. Global Payments.",description:"A modern global payments and financial platform."};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body>{children}</body></html>}