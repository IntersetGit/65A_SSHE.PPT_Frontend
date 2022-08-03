import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  MoreOutlined,
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

const NonadUsermanage = (props) => {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [company, setcompany] = useState([]);
  const [project, setproject] = useState([]);
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [statusValidation, setStatusValidation] = useState([]);
  const [isShowDrawer, setShowDrawer] = useState(false);
  const [isShowDrawers, setShowDrawers] = useState(false);

  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [formCrete] = Form.useForm();
  const [formEdit] = Form.useForm();
  const [usertype, setusertype] = useState(undefined);
  const [filteredproject, setfilteredproject] = useState(undefined);
  const isMobile = true;
  const [inputValue, setInputValue] = useState('');

  const handleUserInput = (e) => {
    setInputValue(e.target.value);
  };

  const resetInputField = () => {
    setInputValue('');
  };

  const onCompanychange = async (value) => {
    let arr = [];
    const result_comp = await request('master/getCompany', { method: 'get' });
    const comp = result_comp.items.find((e) => e.id === value);
    comp.project.forEach((v, k) => {
      arr.push({ value: v.project_id, label: v.project_name });
    });
    setfilteredproject(arr);
  };

  const menus = [
    {
      key: 'edit',
      icon: <EditOutlined />,
      label: 'แก้ไข',
    },
    {
      key: 'view',
      icon: <EyeOutlined />,
      label: 'ดู',
    },
    {
      key: 'delete',
      icon: <DeleteOutlined />,
      label: 'ลบ',
    },
  ];

  const onMenuClick = async (event, id) => {
    const { key } = event;
    if (key === 'edit') {
      await handleCancel();
      await setMode('edit');
      await handleEdit(id);
    } else if (key === 'view') {
      showDrawers();
      setselectedrow(id);
    } else {
      handleDelete(id);
    }
  };

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'number',
      key: '1',
      align: 'center',
      sorter: (record1, record2) => {
        return record1.number > record2.number;
      },
    },
    {
      title: 'อีเมล์',
      dataIndex: 'e_mail',
      key: '2',
      align: 'center',
      sorter: (record1, record2) => {
        return record1.e_mail > record2.e_mail;
      },
    },
    // {
    //   title: 'ชื่อเข้าใช้ระบบ',
    //   dataIndex: 'user_name',
    //   key: '2',
    //   align: 'center',
    //   sorter: (record1, record2) => {
    //     return record1.user_name > record2.user_name;
    //   },
    // },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'firstlast',
      key: '3',
      align: 'center',
      sorter: (record1, record2) => {
        return record1.firstlast > record2.firstlast;
      },
    },
    {
      title: 'กลุ่มผู้ใช้งาน',
      dataIndex: 'roles_name',
      key: '4',
      align: 'center',
      filters: [
        {
          text: 'Administrator',
          value: 'Administrator',
        },
        {
          text: 'Superadmin',
          value: 'Superadmin',
        },
        {
          text: 'Contractor',
          value: 'Contractor',
        },
        {
          text: 'Viewer',
          value: 'Viewer',
        },
        {
          text: 'Editor',
          value: 'Editor',
        },
      ],
      onFilter: (value, record) => record.roles_name.indexOf(value) === 0,
      sorter: (record1, record2) => {
        return record1.roles_name > record2.roles_name;
      },
    },
    {
      title: 'สถานะ',
      dataIndex: 'isuse',
      key: '5',
      align: 'center',
      sorter: (a, b) => a.isuse - b.isuse,
      render: (record) => {
        return <p>{record === 1 ? `ใช้งาน` : `ไม่ใช้งาน`}</p>;
      },
    },
    {
      title: 'แหล่งที่มาจากผู้ใช้งาน',
      dataIndex: 'is_ad',
      key: '6',
      align: 'center',
      sorter: (record1, record2) => {
        return record1.is_ad > record2.is_ad;
      },
      render: (item1, item2) =>
        item1 ? 'AD' : <span style={{ color: 'red' }}>Non AD</span>,
    },
    {
      title: 'จัดการ',
      key: '7',
      align: 'center',
      valueType: 'option',
      render: (id) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={<Menu items={menus} onClick={(e) => onMenuClick(e, id)} />}
        ></Dropdown.Button>
      ),
    },
  ];

  const reload = (search = null) => {
    request(
      'system/users/info',
      { method: 'get', params: { search: search } },
      // search != null ? { search: search } : {}
    )
      .then((res) => {
        let tempDataArray = [];
        res.items.users.forEach((data, key) => {
          tempDataArray = [
            ...tempDataArray,
            {
              number: key + 1,
              key: key + 1,
              isuse: 0,
              ...data,
            },
          ];
        });
        request('system/roles', { method: 'get' }).then((res) => {
          let arrData = [];
          res.items.roles.forEach((v, k) => {
            console.log(v);
            arrData.push({ label: v.roles_name, value: v.id });
          });
          console.log(arrData);
          setRoles(arrData);
        });
        setData(tempDataArray);
        console.log(tempDataArray);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });

    request('master/getCompany', { method: 'get' })
      .then((res) => {
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.company_name, value: v.id });
        });
        setcompany(arrData);
        console.log(arrData);
      })
      .catch((error) => {
        console.log(error);
      });

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

  useEffect(() => {
    reload();
    formCrete.setFieldsValue({ password: 'user@123!!!' });
    formCrete.setFieldsValue({ isuse: 0 });
  }, []);

  const showDrawer = async (type) => {
    await formCrete.resetFields();
    await formEdit.resetFields();
    await formAD.resetFields();

    if (type == 1) {
      formCrete.setFieldsValue({ password: 'user@123!!!' });
      formCrete.setFieldsValue({ isuse: 0 });
      formAD.setFieldsValue({ isuse: 0 });
    }
    setdrawerType(type);
    setShowDrawer(true);
  };

  const showDrawers = () => {
    setShowDrawers(true);
  };

  const onFinishCreate = async (value) => {
    // let filterRoles = await roles.find(
    //   (data) => data.value === value.roles_id,
    // );
    setLoading(true);
    Swal.fire({
      title: 'บันทึกข้อมูล',
      text: 'ยืนยันการบันทึกข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then((result) => {
      if (result.isConfirmed) {
        request('system/addUserAD', {
          method: 'post',
          data: {
            username: value.username,
            roles_id: value.roles_id,
            is_ad: 'true',
          },
        })
          .then((data) => {
            reload();
            Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success');
          })
          .catch((error) => {
            Swal.fire('', 'มีบางอย่างผิดพลาด หรือมีผู้ใช้ในระบบแล้ว', 'error');
            setLoading(false);
            formAD.resetFields();
            reload();
          });
      }
    });
    handleCancel();
  };

  const onFinishEdit = async (value) => {
    Swal.fire({
      title: 'กรุณายืนยันการแก้ไขข้อมูล',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#218838',
      cancelButtonColor: '#d33',
      confirmButtonText: 'ยืนยัน',
      cancelButtonText: 'ยกเลิก',
    }).then(async (result) => {
      if (result.isConfirmed) {
        request('system/updateRoleUser', {
          method: 'put',
          data: {
            id: dataEdit.id,
            roles_id: value.roles_id,
          },
        })
          .then((res) => {
            if (res.status_code === 403) throw Error();
            Swal.fire('', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
            reload();
          })
          .catch((error) => {
            console.log(error);
            Swal.fire('', 'ไม่มีสิทธิ์ในการแก้ไขข้อมูลนี้', 'error');
          });
      }
    });
    handleCancel();
  };

  const onFinishAD = (values) => {
    console.log(drawerType);
    if (drawerType == 1) {
      Swal.fire({
        title: 'บันทึกข้อมูล',
        text: 'ยืนยันการบันทึกข้อมูล',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          request('system/addUserAD', {
            method: 'post',
            data: {
              ...values,
              is_ad: false,
            },
          }).then((data) => {
            reload();
            Swal.fire('บันทึกข้อมูลสำเร็จ', '', 'success');
          });
        }
      });
    } else if (drawerType == 2) {
      Swal.fire({
        title: 'แก้ไขข้อมูล',
        text: 'ยืนยันการแก้ไขข้อมูล',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then((result) => {
        if (result.isConfirmed) {
          request('system/editUser', {
            method: 'put',
            data: { ...values, id: dataEdit.id },
          }).then((data) => {
            reload();
            Swal.fire('แก้ไขข้อมูลสำเร็จ', '', 'success');
          });
        }
      });
    }
    handleCancel();
  };

  const handleCancel = async () => {
    setStatusValidation({
      validateStatus: '',
      help: '',
    });
    setShowDrawer(false);
    setIdUser(null);
    setLoading(false);
  };

  const onSearch = async (value) => {
    setStatusValidation({
      help: `กำลังโหลดข้อมูล...`,
    });
    setLoading(true);
    request(`system/search/user/ad?username=${value}`, { method: 'get' })
      .then((data) => {
        console.log(data);
        setStatusValidation({
          help: `${data.items.displayName}`,
        });
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setStatusValidation({
          validateStatus: 'error',
          help: 'ไม่พบรหัสผู้ใช้ใน AD ',
        });
        setLoading(false);
      });
  };

  const handleEdit = async ({ id }) => {
    let filterData = data.find((data) => data.id === id);
    setIdUser(id);
    console.log(id);
    console.log('Filter', filterData);
    if (filterData.is_ad) {
      setDataEdit(filterData);
      showDrawer(2);
      setMode('edit');
      setusertype('ad');
      formEdit.setFieldsValue(filterData);
    } else {
      setDataEdit(filterData);
      setusertype('nonad');
      setMode('edit');
      showDrawer(2);
      filterData.username = filterData.user_name;
      formCrete.setFieldsValue(filterData);
    }
  };

  const handleDelete = async ({ id }) => {
    try {
      Swal.fire({
        title: 'กรุณายืนยันการลบข้อมูล?',
        text: 'เมื่อยืนยันแล้วจะไม่สามารถเรียกคืนได้',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#218838',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ยืนยัน',
        cancelButtonText: 'ยกเลิก',
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await request('system/delUserAD/' + id, {
            medthod: 'get',
          });
          console.log(resp);
          reload();
          Swal.fire('', 'ลบข้อมูลเรียบร้อยแล้ว', 'success');
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('', 'มีบางอย่างผิดพลาด', 'error');
    }
  };

  /**
   * โหมด add , edit , view
   * @type {String} mode
   */
  const [mode, setMode] = useState('add');
  const [idUser, setIdUser] = useState(null);

  const [formAD] = Form.useForm();

  const handleOkAD = () => {
    formAD.submit();
  };

  const onFinishFailedAD = (error) => {
    console.log('error :>> ', error);
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

  const display = [
    {
      title: 'ชื่อบริษัท',
      dataIndex: 'company_name',
      key: 'company_name',
    },
    {
      title: 'โปรเจคที่รับผิดชอบ',
      dataIndex: 'project_name',
      key: 'project_name',
    },
  ];

  return (
    <>
      <Col span={24}>
        <Card style={{ marginTop: '1rem' }} bordered={true}>
          <Row gutter={[10, 10]}>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
              <Search
                placeholder="input search text"
                allowClear
                enterButton
                value={inputValue}
                onChange={handleUserInput}
                onSearch={(search) => {
                  reload(search);
                }}
              />
            </Col>

            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
              <Button
                onClick={() => {
                  reload();
                  resetInputField();
                }}
                style={{ marginLeft: 10 }}
              >
                <RedoOutlined />
              </Button>
            </Col>
            <Col xs={8} sm={8} md={8} lg={8} xl={8} xxl={8}>
              <Button
                style={{ float: 'right' }}
                type="primary"
                onClick={() => {
                  setMode('add');
                  showDrawer(1);
                }}
              >
                + เพิ่มผู้ใช้ระบบ
              </Button>
            </Col>
            <Col span={24}>
              <div>
                <Table
                  scroll={{ x: true }}
                  columns={columns}
                  dataSource={data}
                  style={{ marginTop: 20 }}
                  pagination={{
                    pageSize: 8,
                  }}
                />
              </div>
            </Col>
          </Row>
        </Card>
      </Col>

      <Drawer
        onClose={handleCancel}
        onCancel={handleCancel}
        visible={isShowDrawer}
        closable={true}
        maskClosable={false}
        keyboard={false}
        width={isMobile ? '40%' : '100'}
      >
        <Tabs defaultActiveKey="1">
          {(mode === 'add' || usertype === 'nonad') && (
            <TabPane tab="นอก AD" key="1">
              <Form
                {...formItemLayout}
                layout="vertical"
                name="nonadform"
                id="nonadform"
                size="large"
                form={formCrete}
                onFinish={onFinishAD}
                initialValues={{}}
              >
                <Form.Item
                  label="รหัสบริษัท"
                  name="company_id"
                  rules={[{ required: true, message: 'กรุณากรอกรหัสบริษัท' }]}
                >
                  <Select onChange={onCompanychange} options={company}></Select>
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="e_mail"
                  tooltip="Username"
                  rules={[{ required: true, message: 'กรุณากรอกอีเมล' }]}
                >
                  <Input type="email" />
                </Form.Item>

                <Form.Item
                  label="รหัสผ่าน"
                  name="password"
                  rules={[
                    { required: true, message: 'กรุณากรอกรหัสผ่าน' },
                    {
                      min: 8,
                      message: 'รหัสผ่านมีความยาวอย่างน้อย 8 ตัวอักษร',
                    },
                  ]}
                  hasFeedback
                >
                  <Input.Password />
                </Form.Item>

                <Form.Item
                  label="ชื่อจริง"
                  name="first_name"
                  rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="นามสกุล"
                  name="last_name"
                  rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  name="roles_id"
                  label="กลุ่มผู้ใช้งาน"
                  rules={[{ required: true, message: 'กรุณาเลือกข้อมูล' }]}
                >
                  <Select options={roles} />
                </Form.Item>

                <Form.Item
                  name="project_id"
                  label="ชื่อโครงการ"
                  rules={[{ required: true, message: 'กรุณาเลือกโครงการ' }]}
                >
                  <Select options={filteredproject} allowClear />
                </Form.Item>

                <Form.Item name="isuse" label="สถานะ">
                  <Radio.Group>
                    <Radio.Button value={1}>Active</Radio.Button>
                    <Radio.Button value={0}>Non Active</Radio.Button>
                  </Radio.Group>
                </Form.Item>

                <Form.Item>
                  <Space style={{ float: 'right' }}>
                    <Button type="primary" htmlType="sumbit">
                      ตกลง
                    </Button>
                    <Button onClick={handleCancel}>ยกเลิก</Button>
                  </Space>
                </Form.Item>
              </Form>
            </TabPane>
          )}

          {(mode === 'add' || usertype === 'ad') && (
            <TabPane tab="AD" key="2">
              {mode === 'add' ? (
                <>
                  <Form
                    {...formItemLayout}
                    layout="vertical"
                    name="adform"
                    id="adform"
                    form={formAD}
                    onFinish={onFinishCreate}
                    size="large"
                    initialValues={{}}
                  >
                    <Form.Item
                      name="username"
                      label="รหัสผู้ใช้ (AD)"
                      rules={[{ required: true }]}
                      {...statusValidation}
                    >
                      <Search
                        placeholder="Username"
                        enterButton="ค้นหา"
                        onSearch={onSearch}
                      />
                    </Form.Item>

                    <Form.Item
                      name="roles_id"
                      label="กลุ่มผู้ใช้งาน"
                      rules={[
                        {
                          required: true,
                          message: 'กรุณากรอกข้อมูล กลุ่มผู้ใช้งาน',
                        },
                      ]}
                    >
                      <Select placeholder="กลุ่มผู้ใช้งาน" options={roles} />
                    </Form.Item>

                    <Form.Item name="isuse" label="สถานะ">
                      <Radio.Group>
                        <Radio.Button value={1}>Active</Radio.Button>
                        <Radio.Button value={0}>Non Active</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                      <Space style={{ float: 'right' }}>
                        <Button type="primary" htmlType="sumbit">
                          ตกลง
                        </Button>
                        <Button type="primary" onClick={handleCancel}>
                          ยกเลิก
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </>
              ) : (
                <>
                  <Form
                    form={formEdit}
                    layout="vertical"
                    size="large"
                    onFinish={onFinishEdit}
                    onFinishFailed={onFinishFailedAD}
                    initialValues={{
                      username: dataEdit.user_name,
                      roles_id: dataEdit.roles_name,
                    }}
                  >
                    <Form.Item label="รหัสผู้ใช้ (AD)" name="username">
                      <Input disabled={true} />
                    </Form.Item>
                    <Form.Item
                      name="roles_id"
                      label="กลุ่มผู้ใช้งาน"
                      rules={[
                        {
                          required: true,
                          message: 'กรุณากรอกข้อมูล กลุ่มผู้ใช้งาน',
                        },
                      ]}
                    >
                      <Select placeholder="กลุ่มผู้ใช้งาน" options={roles} />
                    </Form.Item>

                    <Form.Item name="isuse" label="สถานะ">
                      <Radio.Group>
                        <Radio.Button value={1}>Active</Radio.Button>
                        <Radio.Button value={0}>Non Active</Radio.Button>
                      </Radio.Group>
                    </Form.Item>

                    <Form.Item>
                      <Space style={{ float: 'right' }}>
                        <Button type="primary" htmlType="sumbit">
                          ตกลง
                        </Button>
                        <Button type="primary" onClick={handleCancel}>
                          ยกเลิก
                        </Button>
                      </Space>
                    </Form.Item>
                  </Form>
                </>
              )}
            </TabPane>
          )}
        </Tabs>
      </Drawer>

      <Drawer
        width={700}
        visible={isShowDrawers}
        onClose={() => {
          setselectedrow(undefined);
          setShowDrawers(false);
        }}
        closable={true}
      >
        {selectedrow?.id && (
          <ProDescriptions
            column={1}
            bordered
            title={selectedrow?.user_name}
            request={async () => ({
              data: selectedrow || {},
            })}
            params={{
              id: selectedrow?.user_name,
            }}
            columns={[...columns, ...display]}
          />
        )}
      </Drawer>
    </>
  );
};

export default NonadUsermanage;
