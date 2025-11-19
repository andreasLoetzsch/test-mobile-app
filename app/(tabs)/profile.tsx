import { StandardButton } from "@/components/buttons"
import { logout } from '@/utils/auth'
import { useRouter } from "expo-router"
import { StyleSheet, Text, View } from "react-native"

export default function profileScreen () {
    const router = useRouter()
    return (
    <View style={styles.profileContainer}>
        <Text>Profile</Text>
        <StandardButton title={'logout'} onPress={()=>logout(router)} isDanger/>
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