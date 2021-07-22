import { PlusOutlined } from '@ant-design/icons';
import { Button, message, Drawer } from 'antd';
import React, { useState, useRef } from 'react';
import { PageContainer, FooterToolbar } from '@ant-design/pro-layout';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import ProDescriptions from '@ant-design/pro-descriptions';
import CreateForm from './components/CreateForm';
import type { FormValueType } from './components/UpdateForm';
import UpdateForm from './components/UpdateForm';
import type { TableListItem } from './data.d';
import { queryRule, updateRule, addRule, removeRule, editRule } from './service';

/**
 * 添加节点
 *
 * @param fields
 */
const handleAdd = async (fields: TableListItem) => {
  const hide = message.loading('正在添加');
  try {
    await addRule({ ...fields });

    console.log(fields);
    hide();
    message.success('操作成功');
    return true;
  } catch (error) {
    hide();
    message.error('操作失败');
    return false;
  }
};

/**
 * 更新节点
 *
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
  const hide = message.loading('正在更新');
  try {
    await updateRule({
      // rulename: fields.rulename,
      _id: fields._id,
      ruleName: fields.ruleName,
      rule: fields.rule,
    });

    // await  updateRule({...fields});

    hide();

    message.success('更新成功');
    return true;
  } catch (error) {
    hide();
    message.error('更新失败请重试！');
    return false;
  }
};

/**
 * 删除节点
 *
 * @param selectedRows
 */
const handleRemove = async (selectedRows: TableListItem[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    // console.log(selectedRows);
    await removeRule({
      // key: selectedRows.map((row) => row.key),
      ids: selectedRows.map((row) => row._id),
    });
    hide();
    message.success('删除成功，即将刷新');
    return true;
  } catch (error) {
    hide();
    message.error('删除失败，请重试');
    return false;
  }
};

const TableList: React.FC<{}> = () => {
  const [createModalVisible, handleModalVisible] = useState<boolean>(false);
  const [updateModalVisible, handleUpdateModalVisible] = useState<boolean>(false);
  const [stepFormValues, setStepFormValues] = useState({});
  const actionRef = useRef<ActionType>();
  const [row, setRow] = useState<TableListItem>();
  const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
  const columns: ProColumns<TableListItem>[] = [
    {
      title: 'ID',
      dataIndex: 'ruleName',
      formItemProps: {
        rules: [
          {
            required: true,
            message: 'ID为必填项',
          },
        ],
      },
      render: (dom, entity) => {
        // console.log(entity);
        return <a onClick={() => setRow(entity)}>{dom}</a>;
      },
    },
    {
      title: '规则描述',
      dataIndex: 'rule',
      hideInTable: true,
      valueType: 'code',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '规则描述为必填项',
          },
        ],
      },
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      render: (_, record) => [
        <a
          onClick={() => {
            updateRule({
              _id: record._id,
            }).then((res) => {
              // console.log(res.data)
              // return
              record.ruledesc = res.data.rule;
              handleUpdateModalVisible(true);
              setStepFormValues(record);
            });
          }}
        >
          编辑
        </a>,
      ],
    },
  ];

  return (
    <>
      <PageContainer>
        <ProTable<TableListItem>
          pagination={{ defaultPageSize: 10 }}
          options={false}
          actionRef={actionRef}
          rowKey="_id"
          search={false}
          toolBarRender={() => [
            <Button type="primary" key="ruleName" onClick={() => handleModalVisible(true)}>
              <PlusOutlined /> 新建
            </Button>,
          ]}
          request={(params) => queryRule({ ...params })}
          columns={columns}
          rowSelection={{
            onChange: (_, selectedRows) => setSelectedRows(selectedRows),
          }}
        />
        {selectedRowsState?.length > 0 && (
          <FooterToolbar
            extra={
              <div>
                已选择 <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a> 项&nbsp;&nbsp;
              </div>
            }
          >
            <Button
              onClick={async () => {
                await handleRemove(selectedRowsState);
                setSelectedRows([]);
                actionRef.current?.reloadAndRest?.();
              }}
            >
              批量删除
            </Button>
          </FooterToolbar>
        )}
        <CreateForm onCancel={() => handleModalVisible(false)} modalVisible={createModalVisible}>
          <ProTable<TableListItem, TableListItem>
            onSubmit={async (value) => {
              const success = await handleAdd(value);
              if (success) {
                handleModalVisible(false);
                if (actionRef.current) {
                  actionRef.current.reload();
                }
              }
            }}
            rowKey="_id"
            type="form"
            columns={columns}
          />
        </CreateForm>
        {stepFormValues && Object.keys(stepFormValues).length ? (
          <UpdateForm
            onSubmit={async (value) => {
              let obj = {};
              obj.ruleName = value.ruleName;
              obj.rule = value.ruledesc;
              editRule(obj).then((res) => {
                if (res) {
                  handleUpdateModalVisible(false);
                  setStepFormValues({});
                }
              });
            }}
            onCancel={() => {
              handleUpdateModalVisible(false);
              setStepFormValues({});
            }}
            updateModalVisible={updateModalVisible}
            values={stepFormValues}
          />
        ) : null}
      </PageContainer>
    </>
  );
};

export default TableList;
