import axios from 'axios';

export default function callApi(endpoint: string, method = 'GET', body: any): any {
    return axios({
        method: method,
        url: endpoint,
        data: body
    })
}