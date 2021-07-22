import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '配置',
      dataIndex: 'configtype',
      valueType: 'textarea',
    },
    {
      //  title: '',
      dataIndex: 'configdata',
      valueType: 'textarea',
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        showHeader={false}
        options={false}
        pagination={false}
        actionRef={actionRef}
        rowKey="configtype"
        search={false}
        request={(params) => queryRule({ ...params })}
        columns={columns}
        size="small"
      />
    </>
  );
};

export default TableList;
