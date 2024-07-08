import { AxiosResponse } from "axios";
import { RESTMethod } from "../types/MethodEnum";
import client from "./client";

interface Props{
    uri: string;
    method: RESTMethod;
    item?: object;
    id?: string;
}

export const HttpRequest = async ({ uri, method, item = {}, id = "" }: Props) => {
    let res: AxiosResponse<unknown, unknown>;
    switch (method) {
        case RESTMethod.Get:
            res = await client.get(uri);
            break;
        case RESTMethod.GetById:
            res = await client.get(uri + "/" + id);
            break;
        case RESTMethod.Post:
            res = await client.post(uri, item);
            break;
        case RESTMethod.Delete:
            res = await client.delete(uri + "/" + id);
            break;
        case RESTMethod.Put:
            res = await client.put(uri + "/" + id, item);
            break;
        default:
            throw "Bad request";
    }
    if (res.status >= 400) {
        throw res.statusText;
    }
    return res;
}