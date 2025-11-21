import { StandardButton } from "@/components/buttons";
import { queries } from "@/hooks/quries";
import { useRouter } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

const RegisterScreen = () => {
  const router = useRouter();
  const { mutate } = queries.useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = async () => {
    mutate({ username, password, register: true });
  };
  const handleToLogin = () => {
    router.replace("/auth/login");
  };
  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>Register</Text>
      <TextInput
        onChangeText={setUsername}
        value={username}
        placeholder={"Username"}
      />
      <TextInput
        secureTextEntry={true}
        onChangeText={setPassword}
        value={password}
        placeholder={"Password"}
      />
      <StandardButton title="Register" onPress={handleSubmit} />
      <Text onPress={handleToLogin}>Back to login</Text>
    </View>
  );
};

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
    color: "#808080",
    bottom: -90,
    left: -35,
    position: "absolute",
  },
  titleContainer: {
    flexDirection: "row",
    gap: 8,
  },
});

export default RegisterScreen;
