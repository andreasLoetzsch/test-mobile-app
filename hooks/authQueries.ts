import { logInUser, registerUser } from "@/services/authService";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "expo-router";

const useAuth = () =>  {
    const router = useRouter()
    return useMutation({
        mutationFn: ({username , password, register}: {username: string, password: string, register: boolean }) => {
            if(register){
                return registerUser(username, password)
            }
            return logInUser(username, password)
        }, 
        onSuccess: () => {
            router.replace('/')
        },
        onError: () => {
            console.log('error')
            return 
        }
    })
}
const useAuthStatus = () => {
    return useQuery({
        queryKey: ['authStatus'],
        queryFn: () => {
           // return isUserLoggedIn()
        }
    })
}
export const authQueries = {
    useAuth,
    useAuthStatus
}