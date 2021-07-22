// @ts-ignore
/* eslint-disable */
//import { request } from 'umi';

/** 发送验证码 POST /api/login/captcha */
//export async function getFakeCaptcha(
// params: {
// query
/** 手机号 */
//    phone?: string;
//  },
// options?: { [key: string]: any },
//) {
// return request<API.FakeCaptcha>('/api/login/captcha', {
//  method: 'POST',
//  params: {
//     ...params,
//   },
//  ...(options || {}),
// });
//}

import { request } from 'umi';

export interface LoginParamsType {
  userName: string;
  password: string;
}

export async function fakeAccountLogin(params: LoginParamsType) {
  return request<API.LoginStateType>('/login/account', {
    method: 'POST',
    data: params,
  });
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/logout/account');
}
