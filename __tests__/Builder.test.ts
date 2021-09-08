import HttpCookie from '../src/index';

test('Test CookieObject to CookieString', () => {
  let testCookieObject = {
    name:'Shopper-Pref',
    value:'3E4B882B9425CFE2B9B20B049B31C5359B43825A-1631682025524-x%7B%22cur%22%3A%22INR%22%7D',
    expires:'Wed, 15 Sep 2021 05:00:25 GMT',
    path:'/',
    httpOnly:true,
    secure:false,
    sameSite:'Lax' as 'Lax',
    domain:undefined,
    maxAge: undefined,
  };
  expect(HttpCookie.build([testCookieObject])).toEqual("Shopper-Pref=3E4B882B9425CFE2B9B20B049B31C5359B43825A-1631682025524-x%7B%22cur%22%3A%22INR%22%7D; HttpOnly; expires=Wed, 15 Sep 2021 05:00:25 GMT; SameSite=Lax; Path=/");
});
