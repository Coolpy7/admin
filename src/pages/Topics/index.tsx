import React, { useRef } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule } from './service';

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
      title: 'qos',
      dataIndex: 'qos',
      valueType: 'textarea',
    },
    {
      title: '主题名称',
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
        search={false}
        toolBarRender={() => [
          //  <Button type="primary" onClick={() => handleModalVisible(true)}>
          //    <PlusOutlined /> 新建
          //    </Button>,
        ]}
        request={(params) => queryRule({ ...params })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
