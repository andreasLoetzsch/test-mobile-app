import { StandardButton } from "@/components/buttons";
import { useAuth } from '@/hooks/useAuth';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import {useState} from 'react'

export default function loginScreen () {
  const {logIn} = useAuth()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
    return (
        <View style={styles.loginContainer}>
            <Text style={styles.title}>Login</Text>
            <TextInput style={styles.textInput} onChangeText={setUsername} value={username} placeholder="Username"/> 
            <TextInput style={styles.textInput} onChangeText={setPassword} value={password} placeholder="Password"/>
            <StandardButton title="Login" onPress={logIn}/>
        </View> 
)
}
const styles = StyleSheet.create({
  loginContainer: {
    flexDirection: "column",
    alignItems: "center",
    top: 100,
    gap: 30,
  },
  title: {
    fontSize: 40,
  },
  textInput: {
    borderBottomWidth: 2,
    width: 100,
    height: 50,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});