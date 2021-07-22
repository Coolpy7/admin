import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Card, Descriptions, Row, Col } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule } from './service';
// import moment from 'moment';

const style = {
  background: 'rgba(0, 0, 0, 0);',
  margin: '18px 0',
};

// const options = [
//  {
//   label: '192.168.101.180',
//   value: '192.168.101.180',
// },
//  {
//   label: '192.168.101.204',
//   value: '192.168.101.204',
// },
// ];

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '节点地址',
      dataIndex: 'addr',
      valueType: 'select',
      initialValue: '192.168.101.180',

      // valueEnum: {
      //   local: { text: '192.168.101.180', status: '',},
      //   notlocal: {text: '192.168.101.32',status: '',}

      // },
      fieldProps: {
        options: [
          {
            label: '192.168.101.180',
            value: '192.168.101.180',
          },
          {
            label: '192.168.101.32',
            value: '192.168.101.32',
          },
        ],
      },
    },
    {
      title: '节点名称',
      key: 'name',
      dataIndex: 'name',
      hideInSearch: '{false}',
      valueType: 'textarea',
    },

    {
      title: '版本号',
      dataIndex: 'version',
      hideInSearch: '{false}',
      valueType: 'textarea',
    },
    {
      title: '启动时间',
      dataIndex: 'uptime',
      hideInSearch: '{false}',
      valueType: 'dateTime',
    },
    {
      title: '当前时间',
      dataIndex: 'datetime',
      hideInSearch: '{false}',
      valueType: 'dateTime',
    },
    {
      title: '是否本地',
      dataIndex: 'is_local',
      //valueType: 'select',
      // initialValue: '192.168.101.180',
      // valueEnum: {
      //    all: { text: '全部', status: 'Default' },
      //   true: { text: '是', status: 'Default' },
      //   false: { text: '否', status: 'Processing' },
      //  },
      hideInSearch: '{false}',
      // hideInTable: '{false}',
      valueType: 'textarea',
      renderText: (val: string) => (val ? '是' : '否'),
    },
  ];

  return (
    <>
      <ProTable<TableListItem>
        options={false}
        pagination={false}
        actionRef={actionRef}
        rowKey="addr"
        // search={false}
        request={(params) => queryRule({ ...params })}
        columns={columns}
        tableExtraRender={(_, data) =>
          data
            .filter((v) => v.is_local)
            .map((v2) => (
              <>
                <div>
                  <Descriptions size="middle">
                    <Descriptions.Item>
                      <h3>系统信息</h3>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
                <div>
                  <Row gutter={16}>
                    <Col span={6}>
                      <Card title="节点名称">
                        <Descriptions size="small" column={1}>
                          <Descriptions.Item>{v2.name}</Descriptions.Item>
                        </Descriptions>
                      </Card>
                    </Col>

                    <Col span={6}>
                      <Card title="版本">
                        <Descriptions size="small" column={1}>
                          <Descriptions.Item>{v2.version}</Descriptions.Item>
                        </Descriptions>
                      </Card>
                    </Col>

                    <Col span={6}>
                      <Card title="运行时间">
                        <ProDescriptions size="small" column={1}>
                          <ProDescriptions.Item
                            fieldProps={{
                              format: 'YYYY-MM-DD HH:MM:SS',
                            }}
                            valueType="fromNow"
                          >
                            {v2.uptime}
                          </ProDescriptions.Item>
                        </ProDescriptions>
                      </Card>
                    </Col>
                    <Col span={6}>
                      <Card title="系统时间">
                        <ProDescriptions size="small" column={1}>
                          <ProDescriptions.Item
                            fieldProps={{
                              format: 'YYYY-MM-DD HH:mm:ss',
                            }}
                            valueType="dateTime"
                          >
                            {v2.datetime}
                          </ProDescriptions.Item>
                        </ProDescriptions>
                      </Card>
                    </Col>
                    <Col span={6}></Col>
                  </Row>
                </div>

                <div style={style}>
                  <Descriptions size="small">
                    <Descriptions.Item>
                      <h3>节点信息({data.length})</h3>
                    </Descriptions.Item>
                  </Descriptions>
                </div>
              </>
            ))
        }
      />
    </>
  );
};

export default TableList;
