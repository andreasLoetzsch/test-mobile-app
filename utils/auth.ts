import { persister, queryClient } from "@/utils/queryClient"
import { db } from "./sqLiteConfig";
import { session } from "@/schemas/schemas";

export const clearAuth = async () => {
  await queryClient.cancelQueries();
  await persister.removeClient();
  await db.delete(session);

  await queryClient.setQueryData(["auth"], null)
  
  queryClient.clear();
};
