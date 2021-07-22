// import request from 'umi-request';
import { request } from 'umi';
import type { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/topics', {
    params,
    headers: {
      // "Authorization": localStorage.getItem("token")
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/topics', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/topics', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/topics', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}
