import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "next-themes";
import { Toaster } from "sonner";
import { VoiceAssistant } from "@/components/VoiceAssistant";
import FooterContainer from "@/components/containers/footer-container";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL('https://apromaxeng.com'),
  title: "AproMax Engineering | Innovative Engineering & Design Solutions",
  description:
    "AproMax Engineering is a leading multidisciplinary firm engaged in engineering, design, and technology. We deliver innovative, client-focused solutions for a rapidly evolving world.",
  keywords:
    "AproMax Engineering, engineering services, design technology, innovation, problem-solving, multidisciplinary firm, client-focused solutions, industrial engineering, software development",
  authors: [{ name: "AproMax Team" }],
  creator: "AproMax Engineering",
  publisher: "AproMax Engineering",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://apromaxeng.com/", // Adjust domain as needed
    title: "AproMax Engineering | Innovative Engineering & Design Solutions",
    description:
      "Combining deep engineering expertise with modern design and technology to solve complex problems.",
    siteName: "AproMax Engineering",
    images: [
      {
        url: "/og-image.jpg", // Ensure this image exists in public folder
        width: 1200,
        height: 630,
        alt: "AproMax Engineering - Innovation & Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AproMax Engineering | Innovative Engineering & Design Solutions",
    description:
      "Multidisciplinary firm delivering engineered solutions in design and technology.",
    images: ["/og-image.jpg"],
    creator: "@AproMaxEng", // Adjust handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://apromaxeng.com",
    languages: {
      "en-US": "https://apromaxeng.com/en-US",
    },
  },
  // Geo tags for local SEO
  other: {
    "geo.region": "US-CA", // Example: California, adjust as needed
    "geo.placename": "Los Angeles", // Example City
    "geo.position": "34.0522;-118.2437", // Example Coordinates
    "ICBM": "34.0522, -118.2437",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-gray-950 text-gray-900 antialiased min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
          forcedTheme="light"
        >
          <Toaster />
          <Navbar />
          {children}
          <FooterContainer />
        </ThemeProvider>
        <VoiceAssistant />
      </body>
    </html>
  );
}
