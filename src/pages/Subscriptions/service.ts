// import request from 'umi-request';
import { request } from 'umi';
import type { TableListParams } from './data.d';

export async function querySubs(params?: TableListParams) {
  params.filter.client_id = params.client_id;
  params.filter.node_name = params.node_name;
  params.filter.qos = params.qos;
  params.filter.topic = params.topic;

  return request('/api/topics', {
    params,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}
