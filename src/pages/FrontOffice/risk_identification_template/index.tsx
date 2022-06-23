import { PlusOutlined } from '@ant-design/icons';
import {
  ActionType,
  EditableProTable,
  ProColumns,
  ProForm,
} from '@ant-design/pro-components';
import { Button } from 'antd';
import React, { useRef, useState } from 'react';
import { simple_data } from './simple_data';

const RiskIdenTemPlate: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [dataSource, setDataSource] = useState<
    APITypes.RiskIdentifierTemplateType[]
  >([]);
  const [form] = ProForm.useForm();
  const onExpand = (
    expanded: boolean,
    record: APITypes.RiskIdentifierTemplateType,
  ) => {
    console.log(expanded, record);
  };

  const columns: ProColumns<APITypes.RiskIdentifierTemplateType>[] = [
    {
      title: 'No.',
      key: 'risk_no',
      dataIndex: 'risk_no',
      fixed: 'left',
      valueType: 'digit',
      width: 100,
      render(dom, entity, index, action, schema) {
        return (
          <>
            <p>{entity.risk_no ? entity.risk_no : ''}</p>
          </>
        );
      },
    },
    {
      title: 'Works Activity',
      key: 'work_activity',
      dataIndex: 'work_activity',
      width: 400,
      valueType: 'select',
      valueEnum: {
        'Working closely existing facility': {
          text: 'Working closely existing facility',
        },
        'Transportation of workers/ Road accidents': {
          text: 'Transportation of workers/ Road accidents',
        },
        'Working in deep excavation': {
          text: 'Working in deep excavation',
        },
        'Trench excavation': { text: 'Trench excavation' },
        Lifting: { text: 'Lifting' },
        'Work at height': { text: 'Work at height' },
      },
      render(dom, entity, index, action, schema) {
        return (
          <>
            <p>{entity.work_activity ? entity.work_activity : ''}</p>
          </>
        );
      },
    },
    {
      title: 'Hazard',
      key: 'hazard',
      dataIndex: 'hazard',
      width: 600,
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
        onChange: (e: any) => {
          let formVal: APITypes.RiskIdentifierTemplateType =
            form.getFieldsValue();
          if (!formVal[editableKeys[0]].children)
            formVal[editableKeys[0]].children = [];
          formVal[editableKeys[0]].children?.push({
            key: `${editableKeys}-${
              formVal[editableKeys[0]].children.length + 1
            }`,
            keys: `${editableKeys}-${
              formVal[editableKeys[0]].children.length + 1
            }`,
            hazard: e[0],
          });
          console.log(formVal[editableKeys[0]]);
          form.setFieldsValue(formVal);
          form.submit();
        },
      },
      valueEnum: {
        'Gas release and Fire causing Personal injury and property damage': {
          text: 'Gas release and Fire causing Personal injury and property damage',
        },
        'Accident transportation cause property damage': {
          text: 'Accident transportation cause property damage',
        },
        'injury to workman': { text: 'injury to workman' },
        'Injury to public/people': { text: 'Injury to public/people' },
        'Excavation collapse due to not enough shoring and protection causing injury':
          {
            text: 'Excavation collapse due to not enough shoring and protection causing injury',
          },
        'Lifting equipment and material': {
          text: 'Lifting equipment and material',
        },
        'Falling object': { text: 'Falling object' },
        'Refer to item 12 confined space entry': {
          text: 'Refer to item 12 confined space entry',
        },
        Flooding: { text: 'Flooding' },
        'Access is not enough': { text: 'Access is not enough' },
        'Damage to under ground utility': {
          text: 'Damage to under ground utility',
        },
        'Water jetting injury': { text: 'Water jetting injury' },
        'Drowning/water logging inside the trench': {
          text: 'Drowning/water logging inside the trench',
        },
        'Operator not competent': { text: 'Operator not competent' },
        'Load fall while lifting cauing damage to property and injury to people':
          {
            text: 'Load fall while lifting cauing damage to property and injury to people',
          },
        'Crane topple over injury to people and property damage': {
          text: 'Crane topple over injury to people and property damage',
        },
        'Lifting equipment failure': { text: 'Lifting equipment failure' },
        'Pinch points on body part while lifting': {
          text: 'Pinch points on body part while lifting',
        },
        'Heavy rain during lifting cause crane topple, load drop on work crew and property':
          {
            text: 'Heavy rain during lifting cause crane topple, load drop on work crew and property',
          },
        'Worker falling': { text: 'Worker falling' },
      },
      render(dom, entity, index, action, schema) {
        return (
          <>
            <p>{entity.hazard ? entity.hazard : ''}</p>
          </>
        );
      },
    },
    {
      title: 'Existing control',
      key: 'existingControl',
      dataIndex: 'existingControl',
      width: 300,
      valueType: 'select',
      fieldProps: {
        mode: 'multiple',
      },
      valueEnum: {
        'Conduct Sub-contractor training before work on site for Supervisor and Worker':
          {
            text: 'Conduct Sub-contractor training before work on site for Supervisor and Worker',
          },
        'Conduct daily tool box meeting': {
          text: 'Conduct daily tool box meeting',
        },
        'Close supervision by Main Contrcactor Supervisor': {
          text: 'Close supervision by Main Contrcactor Supervisor',
        },
        'Provide gas detector to be monitoring (ISBL)': {
          text: 'Provide gas detector to be monitoring (ISBL)',
        },
        'Provide fire extinguisher': { text: 'Provide fire extinguisher' },
        'Assign fire watchman during the work activity (ISBL)': {
          text: 'Assign fire watchman during the work activity (ISBL)',
        },
        'Make the fence to isolate area': {
          text: 'Make the fence to isolate area',
        },
      },
      render(dom, entity, index, action, schema) {
        return (
          <>
            {console.log(action?.pageInfo)}
            <div>
              {entity.existingControl
                ? entity.existingControl.map((v: any, k: any) => {
                    return (
                      <p>
                        {k + 1}.{v}
                      </p>
                    );
                  })
                : ''}
            </div>
          </>
        );
      },
    },
    {
      title: 'Action',
      key: 'actions',
      valueType: 'option',
      fixed: 'right',
      width: 150,
      render: (text, record, _, action) => [
        <a
          color="lime"
          key="editable "
          onClick={() => {
            action?.startEditable?.(record.keys);
          }}
        >
          แก้ไข
        </a>,
        // <EditableProTable.RecordCreator
        //   key="copy"
        //   record={{
        //     ...record,
        //     keys: dataSource.length + 1,
        //   }}
        // >
        //   <a> คัดลอกเทมเพลต </a>
        // </EditableProTable.RecordCreator>,
      ],
    },
  ];

  return (
    <>
      <EditableProTable<APITypes.RiskIdentifierTemplateType>
        headerTitle="Risk Identification Template Data"
        actionRef={actionRef}
        bordered
        rowKey="keys"
        size="small"
        scroll={{ x: 1500, y: 600 }}
        columns={columns}
        recordCreatorProps={false}
        request={async () => ({
          data: simple_data,
          total: simple_data.length,
          success: true,
        })}
        cardBordered
        value={dataSource}
        onChange={setDataSource}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
        }}
        search={{
          labelWidth: 'auto',
        }}
        editable={{
          form,
          editableKeys,
          onSave: async (key, record) => {
            console.log('saved', record);
          },
          onChange: setEditableRowKeys,
          actionRender: (row, config, dom) => [dom.save, dom.cancel],
        }}
        toolBarRender={() => [
          <Button
            key="add-btn"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              actionRef.current?.addEditRecord?.({
                keys: dataSource.length + 1,
                risk_no: dataSource.length + 1,
              });
            }}
          >
            เพิ่มข้อมูล Template
          </Button>,
        ]}
        expandable={{
          onExpand,
        }}
      />
    </>
  );
};

export default RiskIdenTemPlate;
