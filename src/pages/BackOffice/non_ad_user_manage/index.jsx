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
      title: 'ชื่อเข้าใช้ระบบ',
      dataIndex: 'user_name',
      key: '2',
      align: 'center',
      sorter: (record1, record2) => {
        return record1.user_name > record2.user_name;
      },
    },
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
      title: 'อีเมล์',
      dataIndex: 'e_mail',
      key: '4',
      align: 'center',
      sorter: (record1, record2) => {
        return record1.e_mail > record2.e_mail;
      },
    },
    {
      title: 'กลุ่มผู้ใช้งาน',
      dataIndex: 'roles_name',
      key: '5',
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
      title: 'แหล่งที่มาจากผู้ใช้งาน',
      dataIndex: 'is_ad',
      key: '6',
      sorter: (record1, record2) => {
        return record1.is_ad > record2.is_ad;
      },
      render: (item1, item2) =>
        item1 ? 'AD' : <span style={{ color: 'red' }}>Non AD</span>,
    },
    {
      title: 'จัดการ',
      key: '7',
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
        console.log(res);
        let arrData = [];
        res.items.forEach((v, k) => {
          arrData.push({ label: v.company_name, value: v.company_id });
        });
        setcompany(arrData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    reload();
    formCrete.setFieldsValue({ password: 'user@123!!!' });
  }, []);

  const showDrawer = (type) => {
    setdrawerType(type);
    setShowDrawer(true);
  };

  const showDrawers = () => {
    setShowDrawers(true);
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
            data: values,
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

  const handleCancel = () => {
    setShowDrawer(false);
    setStatusValidation({
      validateStatus: '',
      help: '',
    });
    formCrete.resetFields();
    formEdit.resetFields();
    formAD.resetFields();
    setLoading(false);
  };

  const onSearch = async (value) => {
    setStatusValidation({
      help: `กำลังโหลดข้อมูล...`,
    });
    setLoading(true);
    request(`system/findUserAD?user_name=${value}`, { method: 'get' }).then(
      (res) => {
        console.log(res);
        setStatusValidation({
          help: `${res.data.items.username}`,
        });
        console.log(res);
        setLoading(false);
      },
    );
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

  const handleDelete = async (id) => {
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

  const handleCancelAD = () => {
    formAD.resetFields();
    setShowDrawer(false);
    setIdUser(null);
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

  return (
    <>
      <Card style={{ marginTop: '1rem' }} bordered={true}>
        <Search
          placeholder="input search text"
          allowClear
          enterButton
          onSearch={(search) => {
            reload(search);
          }}
          style={{ width: 400 }}
        />
        <Button
          onClick={() => {
            reload();
          }}
          style={{ marginLeft: 10 }}
        >
          <RedoOutlined />
        </Button>

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
        <Col span={24}>
          <div>
            <Table
              columns={columns}
              dataSource={data}
              style={{ marginTop: 20 }}
              scroll={{
                y: 240,
              }}
              pagination={{}}
            />
          </div>
        </Col>
      </Card>

      <Drawer
        onClose={handleCancel}
        onCancel={handleCancel}
        visible={isShowDrawer}
        closable={true}
        maskClosable={false}
        keyboard={false}
        width="40%"
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
                  <Select placeholder="รหัสบริษัท" options={company}></Select>
                </Form.Item>

                <Form.Item
                  label="ชื่อผู้ใช้"
                  name="username"
                  rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
                >
                  <Input />
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

                <Form.Item label="Email" name="e_mail">
                  <Input />
                </Form.Item>

                <Form.Item
                  name="roles_id"
                  label="กลุ่มผู้ใช้งาน"
                  rules={[{ required: true, message: 'กรุณาเลือกข้อมูล' }]}
                >
                  <Select placeholder="กลุ่มผู้ใช้งาน" options={roles} />
                </Form.Item>

                <Form.Item>
                  <Space style={{ float: 'right' }}>
                    <Button type="primary" htmlType="sumbit">
                      ตกลง
                    </Button>
                    <Button type="primary" onClick={handleCancelAD}>
                      ยกเลิก
                    </Button>
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
                    // onFinish={onFinishCrete}
                    size="large"
                    initialValues={{}}
                  >
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={[{ required: true }]}
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
                    // onFinish={onFinishEdit}
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
        closable={false}
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
            columns={columns}
          />
        )}
      </Drawer>
    </>
  );
};

export default NonadUsermanage;
