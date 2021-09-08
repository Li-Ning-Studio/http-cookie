
export type CookieObject = {
  name:string,
  value:string,
  secure:boolean,
  httpOnly:boolean,
  domain:string | undefined,
  path:string,
  expires: string | undefined,
  maxAge:string | undefined,
  sameSite: 'Strict' | 'Lax' | 'None',
};
export default class HttpCookie {

  static parse(str:string): CookieObject[] {
    //Remove commas from Expires to allow us to delimit cookies using the commas
    str = this.removeExpiresCommas(str);
    let cookieStrings = str.split(", ");
    return cookieStrings.map(this.parseSingle)
  }

  static build(cookies:CookieObject[]):string {
    let cookieStringArray = cookies.map(this.buildSingle);
    return cookieStringArray.join(", ");
  }

  private static removeExpiresCommas(cookieString: string): string {
    return cookieString.replace(/((expires)=[A-Za-z]{3}\,)(\s)/gi, (match) => {
      return match.replace(" ", "");
    });
  }

  private static buildSingle(cookie:CookieObject):string {
    let str = `${cookie.name}=${cookie.value};`;
    if(cookie.secure) {
      str = `${str} Secure;`
    }
    if(cookie.domain != undefined) {
      str = `${str} Domain=${cookie.domain};`
    }
    if(cookie.httpOnly) {
      str = `${str} HttpOnly;`
    }
    if(cookie.expires != undefined) {
      str = `${str} expires=${cookie.expires};`
    }
    if(cookie.maxAge != undefined) {
      str = `${str} Max-Age=${cookie.maxAge};`
    }
    if(cookie.sameSite != undefined) {
      str = `${str} SameSite=${cookie.sameSite};`
    }
    if(cookie.path != undefined) {
      str = `${str} Path=${cookie.path}`
    }
    return str;
  }

  private static parseSingle(str: string):CookieObject {
    let keyValues = str.split('; ');
    if(keyValues.length == 0) {
      throw "Invalid Cookie String";
    }
    let name = keyValues[0].split("=")[0];
    let value = keyValues[0].split("=")[1];
    let secure = keyValues.find((item) => {
      return item.toLowerCase() == "secure"
    });
    let httpOnly = keyValues.find((item) => {
      return item.toLowerCase() == "httponly"
    });
    let domain = keyValues.find((item) => {
      return item.split('=')[0].toLowerCase() == 'domain'
    });
    let path = keyValues.find((item) => {
      return item.split('=')[0].toLowerCase() == 'path'
    });
    let expires = keyValues.find((item) => {
      return item.split('=')[0].toLowerCase() == 'expires'
    });
    let maxAge = keyValues.find((item) => {
      return item.split('=')[0].toLowerCase() == 'max-age'
    });
    let sameSite = keyValues.find((item) => {
      return item.split('=')[0].toLowerCase() == 'samesite'
    });

    return {
      name,
      value,
      secure: secure != undefined ? true: false,
      httpOnly: httpOnly != undefined ? true: false,
      domain: domain != undefined ? domain.split('=')[1] : undefined,
      path: path != undefined ? path.split('=')[1] : '/',
      expires: expires != undefined ? expires.split('=')[1].replace(",", ", ") : undefined,
      maxAge: maxAge != undefined ? maxAge.split('=')[1] : undefined,
      sameSite: sameSite != undefined ? sameSite.split('=')[1] : 'Lax' as any,
    };

  }


} 