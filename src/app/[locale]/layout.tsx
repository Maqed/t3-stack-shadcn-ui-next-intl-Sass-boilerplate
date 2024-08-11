import "@/styles/globals.css";
import Navbar from "@/components/navbar/navbar";
import Providers from "@/providers";
import { GeistSans } from "geist/font/sans";
import { Toaster } from "@/components/ui/toaster";
import { type Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { env } from "@/env";
type generateMetadataProps = {
  params: { locale: string };
};
export async function generateMetadata({ params }: generateMetadataProps) {
  const { locale } = params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    metadataBase: new URL(env.NEXTAUTH_URL),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    keywords: ["Sass Boilerplate"],
    description: t("description"),
    openGraph: {
      title: t("title"),
      description: t("description"),
      url: env.NEXTAUTH_URL,
      siteName: t("title"),
      locale: "es-ES",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
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
  } satisfies Metadata;
}

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{ children: React.ReactNode; params: { locale: string } }>) {
  return (
    <Providers>
      <html
        lang={locale}
        dir={locale === "ar" ? "rtl" : "ltr"}
        className={`${GeistSans.variable}`}
      >
        <body>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
