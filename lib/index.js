"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var HttpCookie = /** @class */ (function () {
    function HttpCookie() {
    }
    HttpCookie.parse = function (str) {
        //Remove commas from Expires to allow us to delimit cookies using the commas
        str = this.removeExpiresCommas(str);
        var cookieStrings = str.split(", ");
        return cookieStrings.map(this.parseSingle);
    };
    HttpCookie.build = function (cookies) {
        var cookieStringArray = cookies.map(this.buildSingle);
        return cookieStringArray.join(", ");
    };
    HttpCookie.removeExpiresCommas = function (cookieString) {
        return cookieString.replace(/((expires)=[A-Za-z]{3}\,)(\s)/gi, function (match) {
            return match.replace(" ", "");
        });
    };
    HttpCookie.buildSingle = function (cookie) {
        var str = cookie.name + "=" + cookie.value + ";";
        if (cookie.secure) {
            str = str + " Secure;";
        }
        if (cookie.domain != undefined) {
            str = str + " Domain=" + cookie.domain + ";";
        }
        if (cookie.httpOnly) {
            str = str + " HttpOnly;";
        }
        if (cookie.expires != undefined) {
            str = str + " expires=" + cookie.expires + ";";
        }
        if (cookie.maxAge != undefined) {
            str = str + " Max-Age=" + cookie.maxAge + ";";
        }
        if (cookie.sameSite != undefined) {
            str = str + " SameSite=" + cookie.sameSite + ";";
        }
        if (cookie.path != undefined) {
            str = str + " Path=" + cookie.path;
        }
        return str;
    };
    HttpCookie.parseSingle = function (str) {
        var keyValues = str.split('; ');
        if (keyValues.length == 0) {
            throw "Invalid Cookie String";
        }
        var name = keyValues[0].split("=")[0];
        var value = keyValues[0].split("=")[1];
        var secure = keyValues.find(function (item) {
            return item.toLowerCase() == "secure";
        });
        var httpOnly = keyValues.find(function (item) {
            return item.toLowerCase() == "httponly";
        });
        var domain = keyValues.find(function (item) {
            return item.split('=')[0].toLowerCase() == 'domain';
        });
        var path = keyValues.find(function (item) {
            return item.split('=')[0].toLowerCase() == 'path';
        });
        var expires = keyValues.find(function (item) {
            return item.split('=')[0].toLowerCase() == 'expires';
        });
        var maxAge = keyValues.find(function (item) {
            return item.split('=')[0].toLowerCase() == 'max-age';
        });
        var sameSite = keyValues.find(function (item) {
            return item.split('=')[0].toLowerCase() == 'samesite';
        });
        return {
            name: name,
            value: value,
            secure: secure != undefined ? true : false,
            httpOnly: httpOnly != undefined ? true : false,
            domain: domain != undefined ? domain.split('=')[1] : undefined,
            path: path != undefined ? path.split('=')[1] : '/',
            expires: expires != undefined ? expires.split('=')[1].replace(",", ", ") : undefined,
            maxAge: maxAge != undefined ? maxAge.split('=')[1] : undefined,
            sameSite: sameSite != undefined ? sameSite.split('=')[1] : 'Lax',
        };
    };
    return HttpCookie;
}());
exports.default = HttpCookie;
