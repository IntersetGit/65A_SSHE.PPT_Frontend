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

const ProcedureJsea = (props) => {
  const [procedurejsea, setprocedurejsea] = useState([]);
  const [impacttype, setimpacttype] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = useForm();

  useEffect(() => {
    reload();
  }, []);

  const reload = (search = null) => {
    request('risk/getProcedures', {
      medthod: 'get',
      params: { search: search },
    })
      .then((res) => {
        res.items.forEach((v, k) => {
          v.number = `TP${k + 1}`;
          v.key = k + 1;
        });
        setprocedurejsea(res.items);
        console.log(res.items);
      })
      .catch((err) => console.error(err));

    request('risk/getImpact', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.name, value: v.id });
        });
        setimpacttype(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));
  };

  const AddProcedureJsea = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...procedurejsea,
          {
            key: procedurejsea.length + 1,
            ..._data,
          },
        ]);
        setprocedurejsea([
          ...procedurejsea,
          {
            key: procedurejsea.length + 1,
            ..._data,
          },
        ]);
        break;

      case 'UPDATE':
        const indexs = procedurejsea.findIndex((e) => e.key == _data.key);
        if (indexs != -1) {
          let arr = [...procedurejsea];

          arr[indexs] = _data;

          setprocedurejsea(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...procedurejsea];
        const newArr = newState.filter((e) => e.key != _data.key);

        setprocedurejsea(newArr);
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
          request('risk/addProcedures', {
            method: 'post',
            data: values,
          }).then((res) => {
            if (res.status_code) {
              AddProcedureJsea('ADD', {
                id: res.items,
                key: res.items,
                number: `TP${procedurejsea.length + 1}`,
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
          request('risk/updateProcedures', {
            method: 'post',
            data: {
              ...values,
              id: selectedrow.id,
            },
          }).then((res) => {
            if (res.status_code === 200) {
              AddProcedureJsea('UPDATE', {
                ...values,
                key: selectedrow.key,
                id: selectedrow.id,
                number: selectedrow.number,
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
          request(`risk/deleteProcedures/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddProcedureJsea('DELETE', record);
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
      title: 'ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      width: '10%',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Treatment Plan',
      dataIndex: 'name',
      key: 'name',
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
      title: 'Hazard',
      dataIndex: 'impact_id',
      key: 'impact_id',
      align: 'center',
      render: (record) => {
        const data = impacttype.find((e) => e.value === record);
        console.log(record);
        return (
          <p align="left" key={data?.value}>
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
                ??????????????? Treatment Plan
              </Button>
            </Col>

            <Col span={24}>
              <Table
                columns={columns}
                dataSource={procedurejsea}
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
        title="Treatment Plan"
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
          name="procedurejseaform"
          id="procedurejseaform"
          form={form}
          onFinish={onFinish}
          size="large"
          initialValues={{}}
        >
          <Form.Item
            label="Hazard"
            name="impact_id"
            rules={[{ required: true, message: '???????????????????????????????????? Hazard' }]}
          >
            <Select options={impacttype}></Select>
          </Form.Item>

          <Form.Item
            label="Treatment Plan"
            name="name"
            rules={[{ required: true, message: '???????????????????????????????????? Treatment Plan' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="?????????????????????" name="name_thai">
            <Input />
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
            title={selectedrow?.name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.name,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default ProcedureJsea;
