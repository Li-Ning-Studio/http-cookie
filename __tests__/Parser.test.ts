import HttpCookie from '../src/index';

test('Test Cookie String to CookieObject', () => {
  let testCookieString = "Shopper-Pref=3E4B882B9425CFE2B9B20B049B31C5359B43825A-1631682025524-x%7B%22cur%22%3A%22INR%22%7D; Expires=Wed, 15 Sep 2021 05:00:25 GMT; Path=/; HttpOnly, SHOP_SESSION_TOKEN=ha74u9rdd0ukr2hstu7om56fp6; expires=Wed, 15-Sep-2021 05:00:25 GMT; path=/; Secure; HttpOnly; SameSite=none";
  expect(HttpCookie.parse(testCookieString)).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        name:'Shopper-Pref',
        value:'3E4B882B9425CFE2B9B20B049B31C5359B43825A-1631682025524-x%7B%22cur%22%3A%22INR%22%7D',
        expires:'Wed, 15 Sep 2021 05:00:25 GMT',
        path:'/',
        httpOnly:true,
        secure:false,
        sameSite:'Lax',
        domain:undefined,
        maxAge: undefined,
      }),
      expect.objectContaining({
        name:'SHOP_SESSION_TOKEN',
        value:'ha74u9rdd0ukr2hstu7om56fp6',
        expires:'Wed, 15-Sep-2021 05:00:25 GMT',
        path:'/',
        httpOnly:true,
        secure:true,
        sameSite:'none',
        domain:undefined,
        maxAge: undefined,
      })
    ])
  );
});
