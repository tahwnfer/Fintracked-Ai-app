'use server'

import { Prisma } from "../../generated/prisma/client"
import { prisma } from "../_lib/prisma"
import { addTransactionSchema } from './schema'
import { auth } from "@/src/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"


type AddTransactionParams = Omit<Prisma.Args<typeof prisma.transaction, 'create'>['data'], 'user' | 'userId'>

export const addTransaction = async (params: AddTransactionParams) => {
  addTransactionSchema.parse(params)

  const session = await auth.api.getSession({
    headers: await headers(),
  })
  const userId = session?.user?.id

  if (!userId) {
    redirect("/sign-in")
  }

  await prisma.transaction.create({
    data: {
      ...params,
      user: { connect: { id: userId } },
    },
  })
}
