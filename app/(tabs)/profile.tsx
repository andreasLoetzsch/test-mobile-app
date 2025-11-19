import { StandardButton } from "@/components/buttons"
import { useAuth } from '@/hooks/useAuth'
import { StyleSheet, Text, View } from "react-native"
export default function profileScreen () {
    const {logOut} = useAuth()
    return (
    <View style={styles.profileContainer}>
        <Text>Profile</Text>
        <StandardButton title={'logout'} onPress={logOut} isDanger/>
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