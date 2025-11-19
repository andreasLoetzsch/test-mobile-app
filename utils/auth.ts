import { useRouter } from "expo-router"
import {persister, queryClient} from '@/utils/queryClient'

export const logout = async (router: ReturnType<typeof useRouter>) => {
    // Pause all outgoing queries
      await queryClient.cancelQueries();
      // Clears all cached data from React Query's in-memory cache
      queryClient.clear();
      // Removes the persisted cache from storage (e.g., AsyncStorage, localStorage)
      await persister.removeClient();
    router.replace('/auth/login')
}