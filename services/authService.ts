import AsyncStorage from "@react-native-async-storage/async-storage"


export const logInUser = async (username: string, password: string) => {
    try {
        if(!username || !password){
        throw new Error('Username and password required')
    }
    const stored = await AsyncStorage.getItem(`user:${username}`)
    if(!stored){
        throw new Error('user not found')
    } 
    const user = JSON.parse(stored)
    if(user.password !== password){
        throw new Error('Invalid credentials')
    }
    console.log({ user }, 'login')
    return user
    }catch(err){
        console.error(err)
        throw err
    }
    
}

export const registerUser = async (username: string, password: string) => {
    if(!username || !password) {
        throw new Error('Username and password required')
    }
    try{
        const user = { username, password } 
        await AsyncStorage.setItem(`user:${username}`, JSON.stringify(user))
        console.log({user}, 'register')
        return user
    }catch(err){
        console.error(err)
        throw err
    }
}

export const isUserLoggedIn = async () => {
    
}