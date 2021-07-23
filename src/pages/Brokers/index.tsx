import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import { Row, Col, Card, Select } from 'antd';
import StatsTable from './StatsTable';
import RuntimeTable from './RuntimeTable';
import ConfigTable from './ConfigTable';
import React, { useRef } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { Descriptions } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProTable from '@ant-design/pro-table';
import type { TableListItem } from './data.d';
import { queryRule } from './service';

const { Option } = Select;
function handleChange(value) {
  localStorage.setItem('ip', value);
  history.go(0);
  // let url = "http://"+value+":18083";
  // window.open(url);
  // localStorage.setItem('ip', value);
}
let initUrl = localStorage.getItem('ip');
const style = {
  padding: '8px 0',
};

const TableList: React.FC<{}> = () => {
  const actionRef = useRef<ActionType>();
  const [UrLs, setUrLs] = useState();

  const columns: ProColumns<TableListItem>[] = [
    {
      title: '节点地址',
      dataIndex: 'addr',
      valueType: 'textarea',
      initialValue: '192.168.101.180',
    },
    {
      title: '节点名称',
      key: 'name',
      dataIndex: 'name',
      valueType: 'textarea',
    },

    {
      title: '版本号',
      dataIndex: 'version',
      valueType: 'textarea',
    },
    {
      title: '启动时间',
      dataIndex: 'uptime',
      valueType: 'dateTime',
    },
    {
      title: '当前时间',
      dataIndex: 'datetime',
      valueType: 'dateTime',
    },
    {
      title: '是否本地',
      dataIndex: 'is_local',
      valueType: 'textarea',
      renderText: (val: string) => (val ? '是' : '否'),
    },
  ];

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  return (
    <PageContainer>
      <>
        <div className={styles.select}>
          <Select defaultValue={initUrl} style={{ width: 300 }} onChange={handleChange}>
            {UrLs?.map((l) => (
              <Option key={l?.addr} value={l?.addr}>
                {l.addr}
              </Option>
            ))}
          </Select>
        </div>
        <div className={styles.container}>
          <div id="components-grid-demo-gutter">
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col className="gutter-row" span={24}>
                <div style={style}>
                  <Card>
                    <>
                      <ProTable<TableListItem>
                        options={false}
                        pagination={false}
                        actionRef={actionRef}
                        rowKey="addr"
                        search={false}
                        //  request={(params) => queryRule({ ...params})}
                        request={(params) =>
                          queryRule({ ...params }).then((res) => {
                            setUrLs(res.data);
                            return res;
                          })
                        }
                        columns={columns}
                        tableExtraRender={(_, data) =>
                          data
                            .filter((v) => v.is_local)
                            .map((v2) => (
                              <>
                                <div>
                                  <Descriptions size="middle" key={v2.addr}>
                                    <Descriptions.Item>
                                      <h3>系统信息</h3>
                                    </Descriptions.Item>
                                  </Descriptions>
                                </div>
                                <div>
                                  <Row gutter={16}>
                                    <Col span={6}>
                                      <Card title="节点名称">
                                        <Descriptions size="small" column={1} key={v2.name}>
                                          <Descriptions.Item>{v2.name}</Descriptions.Item>
                                        </Descriptions>
                                      </Card>
                                    </Col>

                                    <Col span={6}>
                                      <Card title="版本">
                                        <Descriptions size="small" column={1} key={v2.version}>
                                          <Descriptions.Item>{v2.version}</Descriptions.Item>
                                        </Descriptions>
                                      </Card>
                                    </Col>

                                    <Col span={6}>
                                      <Card title="运行时间">
                                        <ProDescriptions size="small" column={1} key={v2.uptime}>
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
                                        <ProDescriptions size="small" column={1} key={v2.datetime}>
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
                                  <Descriptions size="small" key={data.length}>
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
                  </Card>
                </div>
              </Col>
            </Row>

            <Row gutter={[16, 24]}>
              <Col className="gutter-row" span={24}>
                <div style={style}>
                  <Card>
                    <StatsTable />
                  </Card>
                </div>
              </Col>
            </Row>

            <Row gutter={16}>
              <Col className="gutter-row" span={12}>
                <div style={style}>
                  <Card title="运行时">
                    <RuntimeTable />
                  </Card>
                </div>
              </Col>

              <Col className="gutter-row" span={12}>
                <div style={style}>
                  <Card title="配置">
                    <ConfigTable />
                  </Card>
                </div>
              </Col>
            </Row>
          </div>
        </div>
      </>

      <div
        style={{
          paddingTop: 100,
          textAlign: 'center',
        }}
      >
        <Spin spinning={loading} size="large" />
      </div>
    </PageContainer>
  );
};

export default TableList;
