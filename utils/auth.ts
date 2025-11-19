import { useRouter } from "expo-router"
import {persister, queryClient} from '@/utils/queryClient'
import AsyncStorage from "@react-native-async-storage/async-storage";

export const logout = async (router: ReturnType<typeof useRouter>) => {
    await AsyncStorage.setItem('isLoggedIn', JSON.stringify(false))
    // Pause all outgoing queries
      await queryClient.cancelQueries();
      // Clears all cached data from React Query's in-memory cache
      queryClient.clear();
      // Removes the persisted cache from storage (e.g., AsyncStorage, localStorage)
      await persister.removeClient();
    router.replace('/auth/login')
}