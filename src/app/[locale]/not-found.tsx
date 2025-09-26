import Link from "next/link";

import { useTranslations } from "next-intl";

import BackButton from "@/components/BackButton";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

import Header from "./(marketing)/_components/Header";
import TitleBanner from "./(marketing)/_components/TitleBanner";

function NotFoundPage() {
  const t = useTranslations("not-found");
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <TitleBanner title={""} />
      <section className="content-container mx-auto flex max-w-md flex-col items-center py-24 text-center sm:max-w-xl md:max-w-2xl lg:max-w-3xl">
        <h1 className="font-outfit mt-5 text-4xl font-medium tracking-tight md:text-6xl">
          {t("title")}
        </h1>
        <p className="text-muted-foreground mx-auto mt-6 max-w-md text-center md:max-w-xl md:text-lg lg:max-w-2xl">
          {t("description")}
        </p>
        <div className="mt-6 flex gap-4">
          <BackButton />
          <Button asChild>
            <Link href="/">{t("button")}</Link>
          </Button>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default NotFoundPage;
