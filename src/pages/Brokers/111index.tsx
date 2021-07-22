import { PageContainer } from '@ant-design/pro-layout';
import { useState, useEffect } from 'react';
import { Spin } from 'antd';
import styles from './index.less';
import { Row, Col, Card, Select } from 'antd';
import NodeTable from './NodeTable';
import StatsTable from './StatsTable';
import RuntimeTable from './RuntimeTable';
import ConfigTable from './ConfigTable';
const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const style = {
  background: 'rgba(0, 0, 0, 0);',
  padding: '8px 0',
};

export default () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);
  return (
    <PageContainer extra>
      <>
        <div className={styles.select}>
          <Select defaultValue="lucy" style={{ width: 120 }} onChange={handleChange}>
            {/* <Option  value="jack">Jack</Option>
      <Option value="lucy">Lucy</Option>
      <Option value="disabled" disabled>
        Disabled
      </Option>
      <Option value="Yiminghe">yiminghe</Option> */}
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
                    <NodeTable />
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
