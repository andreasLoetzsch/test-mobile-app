import { session } from "@/schemas/schemas";
import { isUserLoggedIn, registerUser, logInUser, deleteUser } from "@/services/authService";
import { queryClient } from "@/utils/queryClient";
import { db } from "@/utils/sqLiteConfig";
import { useMutation, useQuery } from "@tanstack/react-query";
import { AsyncStorage } from "@tanstack/react-query-persist-client";
import { useRouter } from "expo-router";

const useAuth = () => {
  return useMutation({
    mutationFn: async ({
      username,
      password,
      register,
    }: {
      username: string;
      password: string;
      register: boolean;
    }) => {
      if (register) {
        return await registerUser(username, password);
      }
      return logInUser(username, password);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
    },
    onError: (err) => {
      console.log(err, ("error"))
      return
    },
  });
};
const useDeleteAuth = () => {
  return useMutation({
    mutationFn: async (userId: number)=> {
      await deleteUser(userId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"]})
    },
    onError:(err) => {
      console.log(err, "delete error")
      return
    }
  })
}
const useAuthStatus = () => {
  return useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      return await isUserLoggedIn();
    },
  });
};
export const authQueries = {
  useAuth,
  useAuthStatus,
  useDeleteAuth, 
};
