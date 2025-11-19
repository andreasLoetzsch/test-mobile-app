import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";


export const useAuth = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    
    useEffect(() => {
        const loadLoginState = async () =>{
            const savedState = await AsyncStorage.getItem('@isLoggedIn')
            if(savedState === 'true'){
                setIsLoggedIn(true)
                router.replace('/')
            }
        };
        loadLoginState()
    }, [])

    const logIn = async () => {
        setIsLoggedIn(true)
        await AsyncStorage.setItem('@isLoggedIn', 'true')
        router.replace('/')
    }

    const logOut = async () => {
        setIsLoggedIn(false)
        await AsyncStorage.removeItem('@isLoggedIn')
        router.replace('/auth/login')
    }
    return { isLoggedIn, logIn, logOut }
}