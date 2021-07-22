// import request from 'umi-request';
import { request } from 'umi';
import type { TableListParams } from './data.d';

export async function querySubs(params?: TableListParams) {
  // console.log('params', params);
  params.filter.client_id = params.client_id;
  params.filter.id = params.id;
  params.filter.ip = params.ip;
  params.filter.protocol = params.protocol;
  params.filter.session_at = params.session_at;
  params.filter.status = params.status;

  return request('/api/clients', {
    params,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
