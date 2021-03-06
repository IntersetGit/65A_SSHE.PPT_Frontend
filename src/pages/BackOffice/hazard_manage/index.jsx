import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import { ProDescriptions } from '@ant-design/pro-components';
import {
  Button,
  Card,
  Col,
  Drawer,
  Dropdown,
  Form,
  Input,
  Menu,
  Row,
  Select,
  Space,
  Table,
} from 'antd';
import { useForm } from 'antd/lib/form/Form';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';

const { Search } = Input;
const { TextArea } = Input;

const HazardManage = (props) => {
  const [hazard, sethazard] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [type, settype] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    reload();
  }, []);

  const reload = (search = null) => {
    request('master/getHazardIssue', {
      medthod: 'get',
      params: { search: search },
    })
      .then((res) => {
        res.items.forEach((v, k) => {
          v.number = `ST-00${k + 1}`;
          v.key = k + 1;
        });
        sethazard(res.items);
        console.log(res.items);
      })
      .catch((err) => console.error(err));

    request('master/getIssueType', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.issue_type_name, value: v.id });
        });
        settype(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));
  };

  const AddHazard = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([...hazard, { key: hazard.length + 1, ..._data }]);
        sethazard([...hazard, { key: hazard.length + 1, ..._data }]);
        break;

      case 'UPDATE':
        const indexs = hazard.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...hazard];

          arr[indexs] = _data;

          sethazard(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...hazard];
        const newArr = newState.filter((e) => e.key != _data.key);

        sethazard(newArr);
        break;

      default:
        break;
    }
  };

  const showModal = (type) => {
    setdrawerType(type);
    setShowModal(true);
  };

  const showDrawer = () => {
    setShowDrawer(true);
  };

  const hideModal = () => {
    form.resetFields();
    setselectedrow(null);
    setShowModal(false);
  };

  const onFinish = (values) => {
    if (drawerType == 1) {
      Swal.fire({
        title: '????????????????????????????????????',
        text: '???????????????????????????????????????????????????????????????',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '??????????????????',
        cancelButtonText: '??????????????????',
      }).then((result) => {
        if (result.isConfirmed) {
          request('master/manageHazardIssue', {
            method: 'post',
            data: values,
          }).then((res) => {
            if (res.status_code) {
              AddHazard('ADD', {
                id: res.items,
                key: res.items,
                number: `ST-00${hazard.length + 1}`,
                issue_type_name: type.find(
                  (e) => e.value === values.issue_type_id,
                ).label,
                ...values,
              });
              reload();
              Swal.fire('??????????????????????????????????????????????????????', '', 'success');
            }
          });
        }
      });
    } else if (drawerType == 2) {
      Swal.fire({
        title: '?????????????????????????????????',
        text: '????????????????????????????????????????????????????????????',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '??????????????????',
        cancelButtonText: '??????????????????',
      }).then((result) => {
        if (result.isConfirmed) {
          request('master/manageHazardIssue', {
            method: 'post',
            data: {
              ...values,
              id: selectedrow.id,
            },
          }).then((res) => {
            if (res.status_code === 201) {
              AddHazard('UPDATE', {
                ...values,
                key: selectedrow.key,
                id: selectedrow.id,
                number: selectedrow.number,
                issue_type_name: type.find(
                  (e) => e.value === values.issue_type_id,
                ).label,
              });
              reload();
              Swal.fire('???????????????????????????????????????????????????', '', 'success');
            }
          });
        }
      });
    }
    hideModal();
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  };

  const menus = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: '???????????????',
    },
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: '??????',
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: '??????',
    },
  ];

  const onMenuClick = async (event, record) => {
    const { key } = event;
    if (key === 'edit') {
      showModal(2);
      setselectedrow(record);
      form.setFieldsValue(record);
    } else if (key === 'view') {
      showDrawer();
      setselectedrow(record);
    } else {
      Swal.fire({
        title: '????????????????????????',
        text: '???????????????????????????????????????????????????',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '??????????????????',
        cancelButtonText: '??????????????????',
      }).then((result) => {
        if (result.isConfirmed) {
          request(`master/deleteHazardIssue/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddHazard('DELETE', record);
              reload();
              Swal.fire('??????????????????????????????????????????', '', 'success');
            }
          });
        }
      });
    }
  };

  const display = [
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description',
    },
  ];

  const columns = [
    {
      title: 'Hazard ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'IssueType',
      dataIndex: 'issue_type_name',
      key: 'issue_type_id',
      align: 'center',
    },
    {
      title: 'Hazard',
      dataIndex: 'hazard_name',
      key: 'hazard_id',
      align: 'center',
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      valueType: 'option',
      render: (record) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu items={menus} onClick={(e) => onMenuClick(e, record)} />
          }
        ></Dropdown.Button>
      ),
    },
  ];

  return (
    <>
      <Col span={24}>
        <Card style={{ marginTop: '1rem' }} bordered={true}>
          <Row gutter={[10, 10]}>
            <Col xs={18} sm={16} md={12} lg={12} xl={8} xxl={8}>
              <Form.Item label="???????????????????????????????????????">
                <Search
                  placeholder="Search"
                  // style={{ marginBottom: 10 }}
                  enterButton
                  allowClear
                  onSearch={(search) => {
                    reload(search);
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={4} sm={8} md={12} lg={12} xl={16} xxl={16}>
              <Button
                type="primary"
                style={{ float: 'right' }}
                icon={<PlusOutlined />}
                onClick={() => showModal(1)}
              >
                ??????????????? Hazard
              </Button>
            </Col>

            <Col span={24}>
              <Table
                columns={columns}
                dataSource={hazard}
                expandable
                size={'middle'}
                pagination={{
                  pageSize: 8,
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Drawer
        title="HAZARD (From ISSUE)"
        headerStyle={{ textAlign: 'center' }}
        onClose={hideModal}
        onCancel={hideModal}
        visible={isShowModal}
        closable={true}
        maskClosable={false}
        keyboard={false}
        width="40%"
      >
        <Form
          {...formItemLayout}
          layout="vertical"
          name="activityform"
          id="activityform"
          form={form}
          onFinish={onFinish}
          size="large"
          initialValues={{}}
        >
          <Form.Item
            label="Hazard"
            name="hazard_name"
            rules={[{ required: true, message: '???????????????????????????????????? Hazard' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Issue Type" name="issue_type_id">
            <Select options={type}></Select>
          </Form.Item>

          <Form.Item label="????????????????????????" name="description">
            <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
          </Form.Item>

          <Form.Item>
            <Space style={{ float: 'right' }}>
              <Button type="primary" htmlType="sumbit">
                ????????????
              </Button>
              <Button onClick={hideModal}>??????????????????</Button>
            </Space>
          </Form.Item>
        </Form>
      </Drawer>

      <Drawer
        width={700}
        visible={isShowDrawer}
        onClose={() => {
          setselectedrow(undefined);
          setShowDrawer(false);
        }}
        closable={true}
      >
        {selectedrow?.id && (
          <ProDescriptions
            column={1}
            bordered
            title={selectedrow?.hazard_name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.hazard_name,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default HazardManage;
