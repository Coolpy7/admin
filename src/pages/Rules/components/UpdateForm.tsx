import React from 'react';
import { Input, Modal, Form } from 'antd';
import ProDescriptions from '@ant-design/pro-descriptions';
import ProForm, { ProFormText, ProFormTextArea } from '@ant-design/pro-form';
import { Row, Col, Card } from 'antd';

import { TableListItem } from '../data';

export interface FormValueType extends Partial<TableListItem> {}

export interface UpdateFormProps {
  onCancel: (flag?: boolean, formVals?: FormValueType) => void;
  onSubmit: (values: FormValueType) => Promise<void>;
  updateModalVisible: boolean;
  values: Partial<TableListItem>;
}

const FormItem = Form.Item;

const style = {
  background: 'rgba(0, 0, 0, 0);',
  padding: '8px 0',
};

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
  <>
    <Modal
      width={890}
      bodyStyle={{ padding: '32px 40px 48px' }}
      destroyOnClose
      title="规则编辑"
      visible={props.updateModalVisible}
      footer={false}
      onCancel={() => props.onCancel()}
    >
      <Row gutter={16}>
        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Card>
              <ProForm
                initialValues={{
                  ruledesc: props.values.ruledesc,
                  ruleName: props.values.ruleName,
                  // rule: props.values.rule,
                  _id: props.values._id,
                }}
                onFinish={async (values) => {
                  props.onSubmit(values);
                }}
              >
                <ProFormText
                  name="ruleName"
                  label="ID"
                  rules={[{ required: true, message: '请输入ID！' }]}
                />
                <FormItem
                  name="ruledesc"
                  label="规则描述"
                  rules={[{ required: true, message: '请输入规则描述！' }]}
                >
                  <Input.TextArea autoSize={true} />
                </FormItem>
                <FormItem style={{ display: 'none' }} name="_id" label={false}>
                  <Input type="hidden" />
                </FormItem>
              </ProForm>
            </Card>
          </div>
        </Col>

        <Col className="gutter-row" span={12}>
          <div style={style}>
            <Card title="示例">
              <ProDescriptions size="middle" column={1}>
                <ProDescriptions.Item valueType="code">
                  {' '}
                  {`
//规则名称为rule1，规则备注，执行优先级
rule "rule1" "rule-describtion" salience  1
begin
  //过滤主题为aaa的消息才进行处理
  if Message.Topic == "aaa" {
    //反序列化消息中的载体
    payload = Core.FromJson(Message.Payload)
    //判断消息载体是否为空
    if isNil(payload) {
        println("parse error")
        return
    }
    //实例化一个map用于转换消息体格式
    res = Core.MakeMap()
    //把原消息的msg内容付值到新消息体的m键中
    res["m"] = payload["msg"]
    //序列化新的消息体为json
    reMsg = Core.ToJson(res)
    //传送序列化是否失败
    if isNil(reMsg) {
        println("format error")
        return
    }
    //打印序列化结果于服务端
    println(Core.String(reMsg))
    //实例化mqtt消息体
    newMsg = Core.MakeMessage()
    //设置新的接收主题
    newMsg.Topic = "bbb/#"
    //消息质量控制
    newMsg.QOS = 0
    newMsg.Retain = false
    //把新的载体付值到新消息载体中
    newMsg.Payload = reMsg
    //通过内核发布新消息
    err = Core.Publish(newMsg)
    if err != "" {
        println(err)
    }
  }
end
          `}
                </ProDescriptions.Item>
              </ProDescriptions>
            </Card>
          </div>
        </Col>
      </Row>
    </Modal>
  </>
);

export default UpdateForm;
