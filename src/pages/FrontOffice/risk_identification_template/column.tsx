import { ProColumns } from '@ant-design/pro-components';

export const columns: ProColumns<APITypes.RiskIdentifierTemplateType>[] = [
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
