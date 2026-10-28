-- Add an optional owner so existing transactions remain valid.
ALTER TABLE "transactions" ADD COLUMN "user_id" TEXT;

CREATE INDEX "transactions_user_id_idx" ON "transactions"("user_id");

ALTER TABLE "transactions"
ADD CONSTRAINT "transactions_user_id_fkey"
FOREIGN KEY ("user_id") REFERENCES "user"("id")
ON DELETE CASCADE ON UPDATE CASCADE;
