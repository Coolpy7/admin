import { request } from 'umi';
import type { TableListParams } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/rules', {
    params,
    method: 'GET',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });
}

export async function removeRule(params: { ids: string[] }) {
  return request('/api/rules', {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListParams) {
  return request('/api/rules', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function editRule(params: TableListParams) {
  return request('/api/rules', {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      ...params,
      method: 'post',
    },
  });
}
export async function updateRule(params: TableListParams) {
  return request(`/api/rule/${params._id}`, {
    //  return request('/api/rule/rule2', {
    method: 'GET',
    // method: 'PUT',
    headers: {
      // "Authorization": localStorage.getItem("token")
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
    data: {
      ...params,
    },
  });
}
