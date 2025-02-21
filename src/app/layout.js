import { ThemeProvider } from "@/components/common/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Container from "@/components/common/Container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "TextSage AI",
  description: "TextSage AI powered by chrome in-built nano gemini",
  "origin-trial": process.env.NEXT_PUBLIC_Summarization_API_Token,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Language Summarization API */}

        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_Summarization_API_Token}
        />

        {/* Language Translator API */}

        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_Translator_API_Token}
        />

        {/* Language Detector API */}

        <meta
          httpEquiv="origin-trial"
          content={process.env.NEXT_PUBLIC_Language_Detector_API_Token}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-[#FAEBD7] antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Container>{children}</Container>
        </ThemeProvider>
      </body>
    </html>
  );
}
