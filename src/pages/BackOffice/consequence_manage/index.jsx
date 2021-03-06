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
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';
import { consequence_type } from '../../../../dummy_data/consequence_type';
import { consequence_value } from '../../../../dummy_data/consequence_value';

const { Search } = Input;
const { TextArea } = Input;

const ConsequenceManage = (props) => {
  const [consequence, setconsequence] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    reload();
  }, []);

  const reload = (search = null) => {
    request('master/getConsequence', {
      medthod: 'get',
      params: { search: search },
    })
      .then((res) => {
        res.items.forEach((v, k) => {
          v.number = k + 1;
          v.key = k + 1;
          v.type = v.type_consequence;
        });
        setconsequence(res.items);
        console.log(res.items);
      })
      .catch((err) => console.error(err));
  };

  const AddConsequence = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...consequence,
          { key: consequence.length + 1, ..._data },
        ]);
        setconsequence([
          ...consequence,
          { key: consequence.length + 1, ..._data },
        ]);
        break;

      case 'UPDATE':
        const indexs = consequence.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...consequence];

          arr[indexs] = _data;

          setconsequence(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...consequence];
        const newArr = newState.filter((e) => e.key != _data.key);

        setconsequence(newArr);
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
          request('master/manageConsequence', {
            method: 'post',
            data: values,
          }).then((res) => {
            if (res.status_code) {
              AddConsequence('ADD', {
                id: res.items,
                key: res.items,
                number: consequence.length + 1,
                type_consequence: values.type,
                ...values,
              });
              reload();
              Swal.fire('??????????????????????????????????????????????????????', '', 'success');
            }
          });
        }
      });
    } else if (drawerType == 2) {
      console.log(values);
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
          request('master/manageConsequence', {
            method: 'post',
            data: {
              ...values,
              id: selectedrow.id,
            },
          }).then((res) => {
            if (res.status_code === 201) {
              AddConsequence('UPDATE', {
                ...values,
                key: selectedrow.key,
                id: selectedrow.id,
                number: selectedrow.number,
                type_consequence: values.type,
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
          request(`master/deleteConsqeuence/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddConsequence('DELETE', record);
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
      title: 'No',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      width: '10%',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Consequence',
      dataIndex: 'name_eng',
      key: 'name_eng',
      align: 'center',
      render: (record) => {
        return <p align="left">{record}</p>;
      },
    },
    {
      title: '?????????????????????',
      dataIndex: 'name_thai',
      key: 'name_thai',
      align: 'center',
      render: (record) => {
        return <p align="left">{record}</p>;
      },
    },
    {
      title: 'Type',
      dataIndex: 'type_consequence',
      key: 'type_consequence',
      align: 'center',
      width: '20%',
      render: (record) => {
        const data = consequence_type.find((e) => e.value === record);
        return (
          <p align="left" key={data?.value}>
            {data?.label}
          </p>
        );
      },
    },
    {
      title: 'Value',
      dataIndex: 'value',
      key: 'value',
      align: 'center',
      render: (record) => {
        const data = consequence_value.find((e) => e.value === record);
        return (
          <p align="center" key={data?.value}>
            {data?.label}
          </p>
        );
      },
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center',
      valueType: 'option',
      width: '15%',
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
                ??????????????? Consequence
              </Button>
            </Col>

            <Col span={24}>
              <Table
                columns={columns}
                dataSource={consequence}
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
        title="Consequence"
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
          name="consequenceform"
          id="consequenceform"
          form={form}
          onFinish={onFinish}
          size="large"
          initialValues={{}}
        >
          <Form.Item
            label="Consequence"
            name="name_eng"
            rules={[{ required: true, message: '???????????????????????????????????? Consequence' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="?????????????????????" name="name_thai">
            <Input />
          </Form.Item>

          <Form.Item
            label="Type"
            name="type"
            rules={[{ required: true, message: '????????????????????????????????????????????????' }]}
          >
            <Select options={consequence_type}></Select>
          </Form.Item>

          <Form.Item
            label="Value"
            name="value"
            rules={[{ required: true, message: '?????????????????????????????? Value' }]}
          >
            <Select options={consequence_value}></Select>
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
            title={selectedrow?.name_eng}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.name_eng,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default ConsequenceManage;
