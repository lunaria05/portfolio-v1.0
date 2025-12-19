import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Space_Grotesk } from "next/font/google";
import { Poppins } from "next/font/google";
import Script from "next/script";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Hiral Vala | Frontend Developer", 
    template: "%s | Hiral Vala", 
  },
  description: "Explore Hiral Vala's 3D developer portfolio, a cutting-edge web experience showcasing frontend skills and Web3 expertise through immersive hand-gesture controls.",

  openGraph: {
    title: "Hiral Vala | Frontend Developer", 
    description: "Experience Hiral Vala's interactive 3D portfolio and discover frontend development and Web3 content creation.",
    url: "https://www.hiralvala.xyz", 
    images: [
      {
        url: "/ogImage.png", 
        width: 1200,
        height: 630,
      },
    ],
    siteName: "Hiral Vala Portfolio",
    type: "website",
  },
  keywords: ["frontend developer", "web3", "portfolio", "react", "nextjs", "threejs", "hand tracking", "developer portfolio", "UI/UX"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script id="gtm-head" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TJS8G5BZ');
          `}
        </Script>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-ECD8BFEK5M"
        ></Script>
        <Script>
          {`window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-ECD8BFEK5M');`}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.className} ${poppins.className} antialiased`}
      >
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-TJS8G5BZ"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {children}
      </body>
    </html>
  );
}
