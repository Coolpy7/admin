import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { querySubs } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '客户端ID',
      dataIndex: 'client_id',
    },
    {
      title: '节点名称',
      dataIndex: 'node_name',
      valueType: 'textarea',
    },
    {
      title: 'QoS',
      dataIndex: 'qos',
      valueType: 'textarea',
    },
    {
      title: '主题',
      dataIndex: 'topic',
      valueType: 'textarea',
    },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        options={false}
        pagination={{ defaultPageSize: 10 }}
        actionRef={actionRef}
        rowKey="client_id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          // <Button type="primary" onClick={() => handleModalVisible(true)}>
          //   <PlusOutlined /> 新建
          //  </Button>,
        ]}
        request={(params, sorter, filter) => querySubs({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
