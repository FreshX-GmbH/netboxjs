// netboxjs.d.ts
declare module 'netboxjs' {
  import { AxiosRequestConfig, AxiosResponse } from 'axios';

  interface NetboxOptions {
    host: string;
    token: string;
  }

  class Netbox {
    constructor(options: NetboxOptions);

    get(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    post(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    put(url: string, data: any, config?: AxiosRequestConfig): Promise<AxiosResponse>;
    delete(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse>;
  }

  export = Netbox;
}

