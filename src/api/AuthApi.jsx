import axios from "axios";

export const signIn = async (body) => {
    const URL = 'http://192.168.29.9:3000/api/signin';
    const option = {
        method: 'POST',
        url: URL,
        headers: {},
        data: body
        // {
        //     "password": password,
        //     "phone_number": mobile
        // }
    }
    const response = await axios.request(option)
    return response.data
}

export const signUp = async (body) => {
    const URL = 'http://192.168.29.9:3000/api/signup';
    const option = {
        method: 'POST',
        url: URL,
        headers: {},
        data: body
        // {
        //     "name":"MS PARKING STAND", 
        //     "phone_number":"123456789", 
        //     "password":"6381758772"
        //   }
    }
    const response = await axios.request(option)
    return response.data
}