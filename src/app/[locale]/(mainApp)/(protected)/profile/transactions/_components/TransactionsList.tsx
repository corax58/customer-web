"use client";
import { useCallback, useEffect, useState } from "react";

import { Loader } from "lucide-react";
import { useTranslations } from "next-intl";

import { getTransactionsList } from "@/actions/profile.actions";
import { Card, CardContent } from "@/components/ui/card";
import { PaginatedDateTable } from "@/components/ui/paginated-data-table";
import { useAuth } from "@/contexts/AuthContext";
import { Transaction } from "@/types/profile.types";

import useTransactionColumns from "./useTransactionsColumns";

const TransactionsList = () => {
  const { user } = useAuth();
  const t = useTranslations("profile.transactions");
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { transactionColumns } = useTransactionColumns();
  const fetchTransactions = useCallback(async () => {
    setIsLoading(true);
    if (!user) return;
    const { data, success, error } = await getTransactionsList(
      user?.id.toString(),
    );
    if (success && data) {
      setTransactions(data);
    } else if (error) {
      setError(error);
    }

    setIsLoading(false);
  }, [user]);

  useEffect(() => {
    if (!user) return;
    fetchTransactions();
  }, [user, fetchTransactions]);

  if (isLoading)
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <Loader size={30} className="animate-spin" />
      </div>
    );

  if (error) {
    return (
      <Card className="border shadow-none">
        <CardContent className="flex h-28 items-center justify-center">
          <div className="text-muted-foreground text-lg">
            {t("error.something_went_wrong")}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (transactions)
    return (
      <div>
        {transactions.length > 0 ? (
          <div className="space-y-4">
            <PaginatedDateTable
              columns={transactionColumns}
              data={transactions}
            />
          </div>
        ) : (
          <Card className="border shadow-none">
            <CardContent className="flex h-28 items-center justify-center">
              <div className="text-muted-foreground text-lg">
                {t("no_transactions")}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
};

export default TransactionsList;
