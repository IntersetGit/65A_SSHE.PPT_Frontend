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
  Radio,
  Row,
  Select,
  Space,
  Table,
  Tabs,
} from 'antd';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { request } from 'umi';

const { Search } = Input;
const { TabPane } = Tabs;
const { TextArea } = Input;

const ProjectManage = (props) => {
  const [projectdata, setprojectdata] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isShowModal, setShowModal] = useState(false);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [data, setdata] = useState([]);
  const [form] = Form.useForm();
  const [values, setValues] = useState('Favorite');
  const [project, setproject] = useState([]);
  const [companyselectedItems, setcompanySelectedItems] = useState([]);
  const filteredOptions = data.filter((o) => {
    return o;
  });
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

  const reload = (search = null) => {
    request('master/getProject', { method: 'get', params: { search: search } })
      .then((res) => {
        console.log(res);
        res.items.forEach((v, k) => {
          v.key = k + 1;
          v.number = k + 1;
          v.company.forEach((value, key) => {
            value.key = key + 1;
          });
        });
        setprojectdata(res.items);
        setLoading(false);
      })
      .catch((err) => console.error(err));

    request('master/getProjecttype', { medthod: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.name, value: v.id });
        });
        setproject(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));

    request('master/getCompany', { method: 'get' })
      .then((res) => {
        console.log(res);
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.company_name, value: v.id });
        });
        setdata(arrData);
        console.log(arrData);
      })
      .catch((err) => console.error(err));
  };

  const AddProject = (type, _data = {}) => {
    console.log('onSaveData', type);
    switch (type) {
      case 'ADD':
        console.log([
          ...projectdata,
          {
            key: projectdata.length + 1,
            ..._data,
          },
        ]);
        setprojectdata([
          ...projectdata,
          {
            key: projectdata.length + 1,
            ..._data,
          },
        ]);
        break;

      case 'UPDATE':
        const indexs = projectdata.findIndex((e) => e.id == _data.id);
        if (indexs != -1) {
          let arr = [...projectdata];

          arr[indexs] = _data;

          setprojectdata(arr);
          console.log(arr);
        }
        break;

      case 'DELETE':
        console.log(_data);
        const newState = [...projectdata];
        const newArr = newState.filter((e) => e.key != _data.key);

        setprojectdata(newArr);
        break;

      default:
        break;
    }
  };

  const onChange = (checked) => {
    console.log(`switch to ${checked}`);
  };

  const showModal = (type) => {
    form.setFieldsValue({ favorite_status: 0 });
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
          setLoading(true);
          request('master/manageProject', {
            method: 'post',
            data: values,
          }).then((res) => {
            if (res.status_code) {
              AddProject('ADD', {
                id: res.items,
                number: projectdata.length + 1,
                ...values,
              });
              Swal.fire('??????????????????????????????????????????????????????', '', 'success');
              setLoading(false);
              reload();
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
          setLoading(true);
          request('master/manageProject', {
            method: 'post',
            data: { ...values, id: selectedrow.id },
          }).then((res) => {
            if (res.status_code) {
              AddProject('UPDATE', {
                key: selectedrow.key,
                id: selectedrow.id,
                number: selectedrow.number,
                ...values,
              });
              Swal.fire('???????????????????????????????????????????????????', '', 'success');
              setLoading(false);
              reload();
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

  const RadioFavorite = ({ target: { value } }) => {
    console.log(value);
    setValues(value);
  };

  const options = [
    {
      label: 'Active',
      value: 1,
    },
    {
      label: 'Non Active',
      value: 0,
    },
  ];

  const optionsF = [
    {
      label: 'Favorite',
      value: 1,
    },
    {
      label: 'Non Favorite',
      value: 0,
    },
  ];

  const column = [
    {
      title: '??????????????????????????????????????????',
      dataIndex: 'company_name',
      key: 'company_name',
      align: 'center',
    },
  ];

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

  useEffect(() => {
    if (selectedrow != null) {
      console.log(selectedrow);
      let company_arr = [];
      selectedrow.company?.forEach((v) => {
        company_arr.push(v.company_id);
      });
      console.log(company_arr);
      form.setFieldsValue({ company_id: company_arr });
    }
  }, [selectedrow]);

  useEffect(() => {
    console.log(companyselectedItems);
    console.log('optipn', filteredOptions);
  }, [companyselectedItems]);
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
          setLoading(true);
          request(`master/deleteProject/${record.id}`, {
            method: 'delete',
          }).then((res) => {
            if (res.status_code == 200) {
              AddProject('DELETE', record);
              setLoading(false);
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
      title: 'Company Name',
      dataIndex: 'company',
      key: 'Company Name',
      render: (record) => {
        return (
          <>
            {record.map((v, k) => {
              return <div key={v.company_id}>{v.company_name}</div>;
            })}
          </>
        );
      },
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'Description',
    },
    {
      title: 'Favorite Status',
      dataIndex: 'favorite_status',
      key: 'Favorite Status',
    },
  ];

  const columns = [
    {
      title: 'Project ID',
      dataIndex: 'number',
      key: 'number',
      align: 'center',
      sorter: (a, b) => a.number - b.number,
    },
    {
      title: 'Project Name',
      dataIndex: 'project_name',
      key: 'Project Name',
      align: 'center',
      sorter: (a, b) => a.project_name - b.project_name,
    },
    {
      title: '???????????????????????????????????????',
      dataIndex: 'project_type_id',
      key: 'project_type_id',
      align: 'center',
      render: (record) => {
        const data = project.find((e) => e.value === record);
        return <>{<div key={data?.value}>{data?.label}</div>}</>;
      },
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
            <Col xs={24} sm={16} md={14} lg={14} xl={8} xxl={8}>
              <Form.Item label="?????????????????????????????????">
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

            <Col xs={24} sm={4} md={2} lg={2} xl={8} xxl={8}>
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
                loading={loading}
                columns={columns}
                dataSource={projectdata}
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
          form={form}
          name="projectform"
          id="projectform"
          onFinish={onFinish}
          size="large"
          initialValues={{}}
        >
          <Tabs defaultActiveKey="1">
            <TabPane tab="?????????????????????" key="1">
              <Form.Item
                label="?????????????????????????????????"
                name="project_name"
                rules={[{ required: true, message: '?????????????????????????????????????????????????????????' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="???????????????????????????????????????" name="project_type_id">
                <Select options={project}></Select>
              </Form.Item>

              <Form.Item label="??????????????????????????????" name="description">
                <TextArea rows={8} autoSize={{ minRows: 8, width: 12 }} />
              </Form.Item>

              <Form.Item
                label="Favorite"
                name="favorite_status"
                rules={[{ required: true, message: '??????????????????????????????' }]}
              >
                <Radio.Group
                  options={optionsF}
                  onChange={RadioFavorite}
                  value={values}
                  optionType="button"
                />
              </Form.Item>

              <Form.Item>
                <Space style={{ float: 'right' }}>
                  <Button type="primary" htmlType="sumbit">
                    ????????????
                  </Button>
                  <Button onClick={hideModal}>??????????????????</Button>
                </Space>
              </Form.Item>
            </TabPane>

            <TabPane tab="????????????????????????????????????????????????" key="2">
              <Form.Item label="?????????????????????????????????????????????" name="company_id">
                <Select
                  options={filteredOptions}
                  value={companyselectedItems}
                  onChange={setcompanySelectedItems}
                  mode="multiple"
                  allowClear
                ></Select>
              </Form.Item>

              <Form.Item>
                <Table
                  columns={column}
                  expandable
                  dataSource={selectedrow?.company}
                  showHeader={false}
                  size={'middle'}
                  scroll={{
                    y: 240,
                  }}
                  pagination={{
                    pageSize: 8,
                  }}
                />
              </Form.Item>

              <Form.Item>
                <Space style={{ float: 'right' }}>
                  <Button type="primary" htmlType="sumbit">
                    ????????????
                  </Button>
                  <Button type="primary" onClick={hideModal}>
                    ??????????????????
                  </Button>
                </Space>
              </Form.Item>
            </TabPane>
          </Tabs>
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
        {selectedrow?.project_name && (
          <ProDescriptions
            column={1}
            bordered
            title={selectedrow?.project_name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.project_name,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default ProjectManage;
