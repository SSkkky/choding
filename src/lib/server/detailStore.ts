import axios, { AxiosResponse } from "axios";

export default async function detailStore(type: string, colName: string, postData?: any, idx?: number) {
    let res: AxiosResponse | null = null;

    console.log(type, colName, idx)

    switch (type) {
        case 'get':
            res = await axios.get(`/api/mongodb/${idx}`, {
                params: { colName }
            });
            break;

        // case 'post':
        //     res = await axios.post(`/api/mongodb/${idx}`, {
        //         params: { colName }
        //     });
        //     break;

        case 'delete':
            res = await axios.delete(`/api/mongodb/${idx}`, {
                params: { colName }
            });
            break;

        case 'put':
            console.log('put 진입~~')
            res = await axios.put(`/api/mongodb/${idx}?colName=${colName}`, postData);

            break;
    }

    return res;
}
