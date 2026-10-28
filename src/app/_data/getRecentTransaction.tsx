import type { TransactionModel } from "@/src/generated/prisma/models/Transaction";
import { prisma } from "../_lib/prisma";
import { auth } from "@/src/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export const getRecentTransactions = async (): Promise<TransactionModel[]> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const userId = session?.user?.id;
  if (!userId) {
    redirect("/sign-in");
  }

  const transactions = await prisma.transaction.findMany({
    where: { userId },
    orderBy: { date: "desc" },
    take: 3,
  });
  return transactions;
};
