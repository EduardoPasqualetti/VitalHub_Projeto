import AsyncStorage from "@react-native-async-storage/async-storage";

import { jwtDecode } from "jwt-decode";

import {decode, encode} from 'base-64'

if (!global.atob) {
    global.atob = decode
}

if (!global.btoa) {
    global.btoa = encode
}


export const UserDecodeToken = async () => {
    const token = JSON.parse( await AsyncStorage.getItem('token') ).token
    if (token === null) {
        return null
    }

const decode = jwtDecode(token)

return{
    role: decode.role,
    name: decode.name,
    email: decode.email,
    jti: decode.jti,
    token : token
}

}