import axios, { AxiosRequestConfig } from "axios";
import memoizeOne from "memoize-one";
import { stringify } from "qs";

const DEFAULT_REQUEST_TIMEOUT = 10000;
const BASE_URL = `${import.meta.env.VITE_MOVIE_URL_API}`;

function getApi(config: AxiosRequestConfig = { baseURL: BASE_URL }) {
    const instance = axios.create({
        baseURL: config.baseURL,
        timeout: DEFAULT_REQUEST_TIMEOUT,
        paramsSerializer: {
            encode: (params) => {
                return stringify(params, { arrayFormat: "repeat" });
            },
        },
        ...config,
    });

    instance.interceptors.response.use(
        (response) => response,
        (error) => {
            console.log(error);

            throw error;
        },
    );

    return new Proxy(
        {
            get get() {
                return instance.get;
            },
            get post() {
                return instance.post;
            },
            get put() {
                return instance.put;
            },
            get patch() {
                return instance.patch;
            },
            get delete() {
                return instance.delete;
            },
        },
        {
            get(target, p) {
                return target[p as keyof typeof target].bind(instance);
            },
        },
    );
}

export const useApi = memoizeOne(getApi) as typeof getApi;