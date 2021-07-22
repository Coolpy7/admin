import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule } from './service';

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<TableListItem>[] = [
    {
      title: '运行时',
      dataIndex: 'clientstype',
      valueType: 'textarea',
    },
    {
      //  title: '',
      dataIndex: 'clientsdata',
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
        rowKey="clientstype"
        search={false}
        request={(params) => queryRule({ ...params })}
        columns={columns}
        size="small"
      />
    </>
  );
};

export default TableList;
