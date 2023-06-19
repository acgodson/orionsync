import {
  Montserrat,
  Roboto,
  Space_Mono,
  Noto_Emoji,
  Noto_Color_Emoji,
} from "next/font/google";
import "./globals.css";

import RootProvider from "@/providers/provider";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "100", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const notoEmoji = Noto_Emoji({
  subsets: ["emoji"],
  variable: "--font-noto-emoji",
  weight: ["400"],
});

const notoColorEmoji = Noto_Color_Emoji({
  subsets: ["emoji"],
  style: "normal",
  variable: "--font-noto-color-emoji",
  display: "block",
  weight: "400",
});

export const metadata = {
  title: "OrionSync",
  description: "Own your decentralized workspace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      className={`${montserrat.variable} ${roboto.variable} ${spaceMono.variable} ${notoEmoji.variable} ${notoColorEmoji.variable}`}
      lang="en"
    >
      <body className={"flex h-full"}>
        <RootProvider>{children}</RootProvider>
      </body>
    </html>
  );
}
