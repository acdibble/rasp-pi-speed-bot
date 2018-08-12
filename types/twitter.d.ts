declare module 'twitter' {
    export class Twitter implements TwitterClient {
        constructor(options: Options);
        post: (url: string, params: any, callback: (err: Error, data: any) => void) => void;
    }

    interface Options {
        consumer_key: string;
        consumer_secret: string;
        access_token_key: string;
        access_token_secret: string;
    }

    interface TwitterClient {
        post: (url: string, params: any, callback: (err: Error, data: any) => void) => void;
    }
}