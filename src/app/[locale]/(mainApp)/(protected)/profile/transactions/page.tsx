import { getTranslations } from "next-intl/server";

import TransactionsList from "./_components/TransactionsList";

const TransactionsPage = async () => {
  const t = await getTranslations("profile.transactions");
  return (
    <div className="w-full space-y-6 px-1 py-5 md:px-10">
      <div>
        <h1 className="text-3xl font-bold">{t("title")}</h1>
        <p className="text-muted-foreground mt-2">{t("description")} </p>
      </div>
      <TransactionsList />
    </div>
  );
};

export default TransactionsPage;
