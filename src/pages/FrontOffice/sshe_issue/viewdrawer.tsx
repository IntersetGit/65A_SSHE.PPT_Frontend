import { ProDescriptions } from '@ant-design/pro-components';
import { Drawer } from 'antd';
import { status } from './enums';

type ViewDrawerPropsType = {
  visible: boolean;
  data: APITypes.SSHEIssueApitype | null;
  onClose: () => void;
};

const ViewDrawer: React.FC<ViewDrawerPropsType> = (props) => {
  return (
    <>
      <Drawer
        visible={props.visible}
        onClose={props.onClose}
        title={props.data?.location}
        width={800}
      >
        <ProDescriptions column={2} bordered>
          <ProDescriptions.Item label="Date" valueType="date">
            {props.data?.date}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Project Name" valueType="text">
            {props.data?.project_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Location" valueType="text">
            {props.data?.location}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Hazard" valueType="text">
            {props.data?.hazard_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Primary Case" valueType="text">
            {props.data?.issue_type_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Officer" valueType="text">
            {props.data?.user_name}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Lat" valueType="text">
            {props.data?.lat}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Long" valueType="text">
            {props.data?.long}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Description" valueType="textarea">
            {props.data?.description}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Suggestion" valueType="textarea">
            {props.data?.suggestion}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Status" request={async () => status}>
            {props.data?.status}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="Due Date" valueType="date">
            {props.data?.due_date}
          </ProDescriptions.Item>
          <ProDescriptions.Item
            label="Close"
            request={async () => [
              { label: 'Not Closed', value: 0 },
              { label: 'Closed', value: 1 },
            ]}
          >
            {props.data?.close}
          </ProDescriptions.Item>
        </ProDescriptions>
      </Drawer>
    </>
  );
};

export default ViewDrawer;
