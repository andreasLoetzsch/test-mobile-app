import { StandardButton } from "@/components/buttons"
import { logout } from '@/utils/auth'
import { useRouter } from "expo-router"
import { StyleSheet, Text, View } from "react-native"
import { queries } from "@/hooks/quries"

export default function profileScreen () {
    const router = useRouter()
    const {data: session} = queries.useAuthStatus()
    const {mutate} = queries.useDeleteAuth()
    const handleDeleteAccount = (userId?: number | null) => {
        if(!userId) return 
        mutate(userId)
    }
    return (
    <View style={styles.profileContainer}>
        <Text>Profile</Text>
        <StandardButton title={'logout'} onPress={()=>logout(router)} isDanger/>
        <StandardButton title={'Delete account'} onPress={()=>handleDeleteAccount(session?.userId)} isDanger/>
    </View>
)
}

const styles = StyleSheet.create({
    profileContainer: {
        flexDirection: "column",
        top: 100,
        alignItems: 'center',
        gap: 30,
    }
})