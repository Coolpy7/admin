import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { Descriptions } from 'antd';
import type { TableListItem } from './data.d';
import { queryRule } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '连接信息(个)',
      children: [
        {
          title: '数量',
          dataIndex: 'connections_count',
          key: 'connections_count',
          width: 100,
        },
        {
          title: '历史最大值',
          dataIndex: 'connections_max',
          key: 'connections_max',
          width: 100,
        },
      ],
    },
    {
      title: '订阅信息(个)',
      children: [
        {
          title: '数量',
          dataIndex: 'subscriptions_count',
          key: 'subscriptions_count',
          width: 100,
        },
        {
          title: '历史最大值',
          dataIndex: 'subscriptions_max',
          key: 'subscriptions_max',
          width: 100,
        },
      ],
    },
    {
      title: '字节信息(Bytes)',
      children: [
        {
          title: '接收',
          dataIndex: 'bytes_received',
          key: 'bytes_received',
          width: 100,
        },
        {
          title: '发送',
          dataIndex: 'bytes_sent',
          key: 'bytes_sent',
          width: 100,
        },
      ],
    },
    {
      title: '消息信息(个)',
      children: [
        {
          title: '接收',
          dataIndex: 'messages_received',
          key: 'messages_received',
          width: 100,
        },
        {
          title: 'retained',
          dataIndex: 'messages_retained',
          key: 'messages_retained',
          width: 100,
        },
        {
          title: '发送',
          dataIndex: 'messages_sent',
          key: 'messages_sent',
          width: 100,
        },
      ],
    },
  ];
  return (
    <>
      <ProTable<TableListItem>
        options={false}
        pagination={false}
        actionRef={actionRef}
        rowKey="current"
        search={false}
        request={(params) => queryRule({ ...params })}
        columns={columns}
        tableExtraRender={(_, data) => (
          <Descriptions size="small">
            <Descriptions.Item>
              <h3>运行统计({data.length})</h3>
            </Descriptions.Item>
          </Descriptions>
        )}
      />
    </>
  );
};

export default TableList;
