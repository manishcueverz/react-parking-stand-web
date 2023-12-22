import axios from "axios";

export const AddUpdateDeleteEntry = async (body) => {
    const URL = 'http://192.168.29.9:3000/api/company/add-update-delete-entry';
    const option = {
        method: 'POST',
        url: URL,
        headers: {},
        data: body
        // {
        //     "id":"654373561a3cf7c486f76b8c",
        //     "entry":[
        //         {
        //             "MNJD":"ADOPOA"
        //         }
        //     ]
        //   }
    }
    const response = await axios.request(option)
    return response.data
}

export const companyInfo = async (body) => {
    const URL = 'http://192.168.29.9:3000/api/company';
    const option = {
        method: 'GET',
        url: URL,
        headers: {},
        data: body
        // {
        //     "id":"654373561a3cf7c486f76b8c"
        // }
    }
    const response = await axios.request(option)
    return response.data
}