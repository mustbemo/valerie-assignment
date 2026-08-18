import type { Metadata } from "next";
import { Aldrich, DM_Sans } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const aldrich = Aldrich({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-aldrich",
  display: "swap",
});

export const metadata: Metadata = {
  title: "SkyAI - Intelligent Technology",
  description:
    "Advanced AI technology for intelligent automation, data insights, and modern digital experiences.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${dmSans.variable} ${aldrich.variable} h-full scheme-light bg-background font-sans antialiased data-[custom-cursor=true]:cursor-none`}
    >
      <body className="flex min-h-full flex-col bg-background text-foreground">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
