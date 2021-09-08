export declare type CookieObject = {
    name: string;
    value: string;
    secure: boolean;
    httpOnly: boolean;
    domain: string | undefined;
    path: string;
    expires: string | undefined;
    maxAge: string | undefined;
    sameSite: 'Strict' | 'Lax' | 'None';
};
export default class HttpCookie {
    static parse(str: string): CookieObject[];
    static build(cookies: CookieObject[]): string;
    private static removeExpiresCommas;
    private static buildSingle;
    private static parseSingle;
}
