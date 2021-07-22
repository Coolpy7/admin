import { request } from 'umi';
import type { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/brokers', {
    params,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
