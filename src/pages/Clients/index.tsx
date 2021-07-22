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
      title: 'id	',
      dataIndex: 'id',
      valueType: 'textarea',
    },
    {
      title: 'Ip地址',
      dataIndex: 'ip',
      valueType: 'textarea',
    },
    {
      title: '协议名称	',
      dataIndex: 'protocol',
      valueType: 'textarea',
    },
    {
      title: '会话时间	',
      dataIndex: 'session_at',
      valueType: 'dateTime',
    },
    {
      title: '连接状态		',
      dataIndex: 'status',
      valueType: 'textarea',
    },
    //  {
    //   title: '操作',
    //   dataIndex: 'option',
    //   valueType: 'option',
    //   render: (_, record) => [
    //    <a
    //      onClick={() => {
    //        handleUpdateModalVisible(true);
    //       setStepFormValues(record);
    //     }}
    //    >
    //      修改
    //    </a>,
    //  ],
    //  },
  ];

  return (
    <PageContainer>
      <ProTable<TableListItem>
        options={false}
        pagination={{ defaultPageSize: 100 }}
        actionRef={actionRef}
        rowKey="client_id"
        search={{
          labelWidth: 120,
        }}
        toolBarRender={() => [
          //    <Button type="primary" onClick={() => handleModalVisible(true)}>
          //     <PlusOutlined /> 新建
          //    </Button>,
        ]}
        request={(params, sorter, filter) => querySubs({ ...params, sorter, filter })}
        columns={columns}
      />
    </PageContainer>
  );
};

export default TableList;
