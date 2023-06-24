import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Satoshi Agent - AI Chat Bot",
  description:
    "The Satoshi Agent is an AI Chat Bot powered by GPT, with knowledge of everything Satoshi Nakamoto.",
  openGraph: {
    title: "Satoshi Agent - AI Chat Bot",
    description:
      "The Satoshi Agent is an AI Chat Bot powered by GPT, with knowledge of everything Satoshi Nakamoto.",
    image: "https://satoshiagent.com/og-image.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="luxury">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
