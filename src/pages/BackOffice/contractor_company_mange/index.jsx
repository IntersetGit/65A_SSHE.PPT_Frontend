import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
  PlusOutlined,
  RedoOutlined,
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
import { office_type } from '../../../../dummy_data/office_type';

const { Search } = Input;
const { Option } = Select;
const { TextArea } = Input;

const ContractorCompanyManage = (props) => {
  const [comusermanage, setcomusermanage] = useState([]);
  const [subcontract, setsubcontract] = useState([]);
  const [project, setproject] = useState([]);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [form] = Form.useForm();
  const [inputValue, setInputValue] = useState('');

  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  const resetInputField = () => {
    setInputValue('');
  };

  useEffect(() => {
    reload();
  }, []);

  const reload = (search) => {
    request('master/getCompany', { method: 'get', params: { search: search } })
      .then((res) => {
        console.log(res);
        res.items.forEach((v, k) => {
          v.key = k + 1;
          v.number = k + 1;
          v.subcontract = v.subcontract_name;
        });
        setcomusermanage(res.items);
      })
      .catch((err) => console.error(err));

    request('master/getSubCompany', { method: 'get' })
      .then((res) => {
        console.log(res);
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.subcontract_name, value: v.id });
        });
        setsubcontract(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));

    request('master/getProject', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.project_name, value: v.id });
        });
        setproject(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));
  };

  const AddComData = (type, _data) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...comusermanage,
          { key: comusermanage.length + 1, ..._data },
        ]);
        setcomusermanage([
          ...comusermanage,
          { key: comusermanage.length + 1, ..._data },
        ]);
        break;

      case 'UPDATE':
        console.log(_data);
        const indexs = comusermanage.findIndex((e) => e.key == _data.key);
        if (indexs != -1) {
          let arr = [...comusermanage];

          arr[indexs] = _data;

          setcomusermanage(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...comusermanage];
        const newArr = newState.filter((e) => e.id != _data.id);

        setcomusermanage(newArr);
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
    setShowModal(false);
  };

  const onFinish = (values) => {
    drawerType === 1
      ? Swal.fire({
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
            request('master/manageCompany', {
              method: 'post',
              data: values,
            }).then((res) => {
              if (res.status_code) {
                AddComData('ADD', {
                  id: res.items,
                  number: comusermanage.length + 1,
                  subcontract_id: values.subcontract,
                  ...values,
                });
                console.log(res);
                reload();
                Swal.fire('??????????????????????????????????????????????????????', '', 'success');
              }
            });
          }
        })
      : Swal.fire({
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
            request('master/manageCompany', {
              method: 'post',
              data: {
                ...values,
                id: selectedrow.id,
              },
            }).then((res) => {
              console.log(res);
              if (res.status_code === 201) {
                AddComData('UPDATE', {
                  ...values,
                  key: selectedrow.key,
                  id: selectedrow.id,
                  number: selectedrow.number,
                  subcontract_id: values.subcontract,
                });
                reload();
                Swal.fire('???????????????????????????????????????????????????', '', 'success');
              }
            });
          }
        });
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
    // record = record.props.record;
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
          request(`master/updateCompany/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddComData('DELETE', record);
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
      title: 'Project Name',
      dataIndex: 'project',
      key: 'Project Name',
      render: (record) => {
        return (
          <>
            {record.map((v, k) => {
              return <div key={v.project_id}>{v.project_name}</div>;
            })}
          </>
        );
      },
    },
  ];

  const columns = [
    {
      title: 'Company ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      hideInSearch: true,
      sorter: (a, b) => a.number - b.number,
    },
    { ...Table.EXPAND_COLUMN, hideInDescriptions: true },
    {
      title: 'Company',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
    },
    {
      title: 'Subcontract',
      dataIndex: 'subcontract_id',
      key: 'subcontract_id',
      align: 'center',
      render: (record) => {
        const data = subcontract.find((e) => e.value === record);
        return <>{<div key={data?.value}>{data?.label}</div>}</>;
      },
    },
    {
      title: '?????????????????????',
      dataIndex: 'address',
      key: 'address',
      align: 'center',
    },
    {
      title: '??????????????????',
      key: '??????????????????',
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
            <Col xs={22} sm={16} md={12} lg={12} xl={8} xxl={8}>
              <Form.Item label="??????????????????????????????">
                <Search
                  placeholder="Search"
                  // style={{ marginBottom: 10 }}
                  enterButton
                  value={inputValue}
                  onChange={handleUserInput}
                  allowClear
                  onSearch={(search) => {
                    reload(search);
                  }}
                />
              </Form.Item>
            </Col>

            <Col xs={24} sm={4} md={8} lg={8} xl={8} xxl={8}>
              <Button
                onClick={() => {
                  reload();
                  resetInputField();
                }}
              >
                <RedoOutlined />
              </Button>
            </Col>

            <Col xs={24} sm={4} md={4} lg={4} xl={8} xxl={8}>
              <Button
                type="primary"
                style={{ float: 'right' }}
                icon={<PlusOutlined />}
                onClick={() => showModal(1)}
              >
                ???????????????
              </Button>
            </Col>

            <Col span={24}>
              <Table
                columns={columns}
                dataSource={comusermanage}
                expandable={{
                  expandedRowRender: (record) => (
                    <>
                      {record.project.map((v, k) => {
                        return (
                          <span style={{ margin: 0 }} key={v.project_id}>
                            {' '}
                            {v.project_name} ,{' '}
                          </span>
                        );
                      })}
                    </>
                  ),
                  rowExpandable: (record) =>
                    record.company_name !== 'Not Expandable',
                }}
                pagination={{
                  pageSize: 8,
                }}
              />
            </Col>
          </Row>
        </Card>
      </Col>

      <Drawer
        title="????????????????????????????????????????????????"
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
          name="complocform"
          id="complocform"
          form={form}
          onFinish={onFinish}
          size="large"
          initialValues={
            {
              // key: props.data && props.data.key,
              // id: props.data && props.data.id,
              // company_type: props.data && props.data.company_type,
              // company_name: props.data ? props.data.company_name : '',
              // address: props.data ? props.data.address : '',
              // status: props.data ? props.data.status : '',
            }
          }
        >
          <Col>
            <Form.Item label="">
              <Form.Item
                name="company_name"
                label="?????????????????????????????? (TH) :"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
                rules={[
                  {
                    required: true,
                    message: '?????????????????????????????????????????????????????????',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="">
              <Form.Item
                name="company_type"
                label="????????????????????????????????????/???????????? :"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
              >
                <Select options={office_type}></Select>
              </Form.Item>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="">
              <Form.Item
                name="address"
                label="????????????????????? (TH)"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
                rules={[
                  {
                    required: true,
                    message: '??????????????????????????????????????????????????????????????????',
                  },
                ]}
              >
                <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
              </Form.Item>
            </Form.Item>
          </Col>

          <Col>
            <Form.Item label="">
              <Form.Item
                name="subcontract"
                label="???????????? Subcontract ?????????"
                labelCol={{ span: 24 }}
                style={{
                  display: 'inline-block',
                  width: 'calc(100% - 12px)',
                }}
              >
                <Select allowClear options={subcontract}></Select>
              </Form.Item>
            </Form.Item>
          </Col>

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
            title={selectedrow?.company_name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.company_name,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default ContractorCompanyManage;
