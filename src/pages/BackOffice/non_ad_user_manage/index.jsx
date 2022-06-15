import {
  DeleteOutlined,
  EditOutlined,
  MoreOutlined,
  RedoOutlined,
} from '@ant-design/icons';
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
import { com_id } from '../../../../dummy_data/com_id';
import { datas } from '../../../../dummy_data/data_ad';
import { group_roles } from '../../../../dummy_data/group_roles';
const { Search } = Input;
const { TabPane } = Tabs;
const onSearch = (values, e) => {
  if (values === datas) return datas;
};
const NonadUsermanage = (props) => {
  const [loading, setLoading] = useState(true);
  const [roles, setRoles] = useState([]);
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState([]);
  const [statusValidation, setStatusValidation] = useState([]);
  const [isShowDrawer, setShowDrawer] = useState({
    create: false,
    edit: false,
  });
  const [drawerType, setdrawerType] = useState(1);
  const [selectedrow, setselectedrow] = useState(null);
  const [formCrete, formEdit] = Form.useForm();

  // const AddAdData = (type, _data = {}) => {
  //   console.log('onSaveData', type);
  //   switch (type) {
  //     case 'ADD':
  //       const _num = `${adusermanage.length + 1}`;
  //       console.log([
  //         ...adusermanage,
  //         {
  //           key: adusermanage.length + 1,
  //           number: _num,
  //           is_ad: 'Non-AD',
  //           ..._data,
  //         },
  //       ]);
  //       setadusermanage([
  //         ...adusermanage,
  //         {
  //           key: adusermanage.length + 1,
  //           number: _num,
  //           is_ad: 'Non-AD',
  //           ..._data,
  //         },
  //       ]);
  //       break;
  //     case 'UPDATE':
  //       console.log(_data, adusermanage);
  //       const indexs = adusermanage.findIndex((e) => e.key == _data.key);
  //       if (indexs != -1) {
  //         let arr = [...adusermanage];

  //         arr[indexs] = _data;
  //         setadusermanage(arr);
  //         console.log(arr);
  //       }
  //       break;
  //     case 'DELETE':
  //       console.log(_data);
  //       const newState = [...adusermanage];
  //       const newArr = newState.filter((e) => e.key != _data.key);
  //       setadusermanage(newArr);
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const columns = [
    {
      title: 'ลำดับ',
      dataIndex: 'number',
      key: '1',
      sorter: (record1, record2) => {
        return record1.number > record2.number;
      },
    },
    {
      title: 'ชื่อเข้าใช้ระบบ',
      dataIndex: 'user_name',
      key: '2',
      sorter: (record1, record2) => {
        return record1.user_name > record2.user_name;
      },
    },
    {
      title: 'ชื่อ-นามสกุล',
      dataIndex: 'firstlast',
      key: '3',
      sorter: (record1, record2) => {
        return record1.firstlast > record2.firstlast;
      },
    },
    {
      title: 'อีเมล์',
      dataIndex: 'e_mail',
      key: '4',
      sorter: (record1, record2) => {
        return record1.e_mail > record2.e_mail;
      },
    },
    {
      title: 'กลุ่มผู้ใช้งาน',
      dataIndex: 'roles_name',
      key: '5',
      filters: [
        {
          text: 'Administrator',
          value: 'Administrator',
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
      filters: [
        {
          text: 'AD',
          value: 'AD',
        },
        {
          text: 'Non_AD',
          value: 'Non_AD',
        },
      ],
      onFilter: (value, record) => record.is_ad.indexOf(value) === 0,
      render: (item1, item2) =>
        item1 ? 'AD' : <span style={{ color: 'red' }}>Non AD</span>,
    },
    {
      title: 'จัดการ',
      key: '7',
      render: (id) => (
        <Dropdown.Button
          icon={<MoreOutlined />}
          type="text"
          overlay={
            <Menu>
              <Menu.Item
                key="1"
                icon={<EditOutlined />}
                onClick={async () => {
                  await handleCancel();
                  await handelEdit(id);
                }}
              >
                แก้ไข
              </Menu.Item>
              <Menu.Item
                key="2"
                icon={<DeleteOutlined />}
                onClick={() => handelDelete(id)}
              >
                ลบ
              </Menu.Item>
            </Menu>
          }
        ></Dropdown.Button>
      ),
    },
  ];

  const reload = (search = null) => {
    request(
      'provider/getSearchUser',
      { method: 'get', params: { search: search } },
      // search != null ? { search: search } : {}
    )
      .then((res) => {
        let tempDataArray = [];
        res.items.forEach((data, key) => {
          tempDataArray = [
            ...tempDataArray,
            {
              number: key + 1,
              ...data,
            },
          ];
        });
        request('system/users/info', { method: 'get' }).then((res) => {
          console.log(res);
          setRoles(res.items.users);
        });
        setData(tempDataArray);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    reload();
  }, []);

  const showDrawerr = (value) => {
    setShowDrawer((data) => {
      return { ...data, [value]: true };
    });
  };

  const handleOk = (form) => {
    if (form === 'formCreate') {
      formCrete.submit();
    }
    if (form === 'formAD') {
      formEdit.submit();
    }
  };

  const handleCancel = () => {
    setShowDrawer({ create: false, edit: false });
    setStatusValidation({
      validateStatus: '',
      help: '',
    });
    formCrete.resetFields();
    formEdit.resetFields();
    setLoading(false);
  };

  const onFinishCrete = async (value) => {
    let filterRoles = await roles.find(
      (data) => data,
      roles_name === value.roles_id,
    );
    setLoading(true);
    request(
      'system/addUserAD',
      { medthod: 'post' },
      {
        username: value.username,
        roles_id: filterRoles.id,
        is_ad: true,
      },
    )
      .then((res) => {
        Swal.fire('', 'บันทึกข้อมูลสำเร็จ', 'success');
        setStatusValidation([]);
        setShowDrawer({ create: false, edit: false });
        setLoading(false);
        formCrete.resetFields();
        reload();
      })
      .catch((error) => {
        Swal.fire('', 'มีบางอย่างผิดพลาด หรือมีผู้ใช้ในระบบแล้ว', 'error');
        console.log(error);
        setStatusValidation([]);
        setShowDrawer({ create: false, edit: false });
        setLoading(false);
        formCrete.resetFields();
        reload();
      });
  };

  const onFinishEdit = async (value) => {
    try {
      let filterRoles = await roles.find(
        (data) => data.roles_name === value.roles_id,
      );
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
          let resp = await request(
            'system/updateRoleUser',
            { method: 'put' },
            {
              id: dataEdit.id,
              roles_id: filterRoles.id,
            },
          );
          await Swal.fire('', 'แก้ไขข้อมูลเรียบร้อยแล้ว', 'success');
          reload();
          handleCancel();
        }
      });
    } catch (error) {
      console.log(error);
      Swal.fire('', 'มีบางอย่างผิดพลาด', 'success');
    }
  };

  const onSearch = async (value) => {
    setStatusValidation({
      help: `กำลังโหลดข้อมูล...`,
    });
    setLoading(true);
    request(`system/findUserAD?username=${value}`, { method: 'get' }).then(
      (res) => {
        setStatusValidation({
          help: `${res.data.items.displayName}`,
        });
        setLoading(false);
      },
    );
  };

  const handleEdit = async (id) => {
    let filterData = data.find((data) => data.id === id);
    setIdUser(id);
    if (filterData.is_ad) {
      setDataEdit(filterData);
      showDrawerr('edit');
    } else {
      setMode('edit');
      setIsModalVisibleAS(true);
      filterData.username = filterData.user_name;
      formAD.setFieldsValue(filterData);
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
          const resp = await request('/system/delUserAD/' + id, {
            medthod: 'post',
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

  const [isShowDrawerAD, setShowDrawerAD] = useState(false);

  const handleOkAD = () => {
    formAD.submit();

    const handleCancelAD = () => {
      formAD.resetFields();
      setShowDrawerAD(false);
      setIdUser(null);
    };

    /**
     * Submit Form
     * @param {{username: String, roles_id: String, first_name: String, last_name: String, e_mail: String}} value
     */
    const onFinishAD = async (value) => {
      try {
        // console.log('value :>> ', value);
        value.is_ad = false;
        if (mode == 'edit') {
          value.id = idUser;
          await request('/system/editUser', { method: 'put' }, value);
        } else {
          await request('/system/addUserAD', { method: 'post' }, value);
        }
        Swal.fire('', 'บันทึกข้อมูลเรียบร้อย', 'success');
        handleCancelAD();
        reload();
      } catch (error) {
        Swal.fire('', 'มีบางอย่างผิดพลาด หรือมีผู้ใช้ในระบบแล้ว', 'error');
      }
    };
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
        <h1>
          <p>จัดการผู้ใช้งานระบบ</p>
        </h1>
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
        >
          <RedoOutlined />
        </Button>

        <Button
          style={{ float: 'right' }}
          type="primary"
          onClick={() => showModal('create')}
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
        visible={isShowDrawer.create}
        closable={true}
        maskClosable={false}
        keyboard={false}
        width="40%"
      >
        <Tabs defaultActiveKey="1">
          <TabPane tab="นอก AD" key="1">
            <Form
              {...formItemLayout}
              layout="vertical"
              name="nonadform"
              id="nonadform"
              size="large"
              initialValues={{}}
            >
              <Form.Item
                label="รหัสบริษัท"
                name="company_id"
                rules={[{ required: true, message: 'กรุณากรอกรหัสบริษัท' }]}
              >
                <Select placeholder="รหัสบริษัท" options={com_id}></Select>
              </Form.Item>

              <Form.Item
                label="ชื่อผู้ใช้"
                name="user_name"
                rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="รหัสผ่าน"
                name="password"
                rules={[
                  { required: true, message: 'กรุณากรอกรหัสผ่าน' },
                  { min: 8, message: 'รหัสผ่านมีความยาวอย่างน้อย 8 ตัวอักษร' },
                ]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="ยืนยันรหัสผ่าน"
                name="confirm_password"
                rules={[{ required: true, message: 'กรุณากรอกยืนยันรหัสผ่าน' }]}
                hasFeedback
              >
                <Input.Password />
              </Form.Item>

              <Form.Item
                label="ชื่อจริง-นามสกุล"
                name="firstlast"
                rules={[{ required: true, message: 'กรุณากรอกข้อมูล' }]}
              >
                <Input />
              </Form.Item>

              <Form.Item label="Email" name="e_mail">
                <Input />
              </Form.Item>

              <Form.Item
                name="roles_name"
                label="กลุ่มผู้ใช้งาน"
                rules={[{ required: true, message: 'กรุณาเลือกข้อมูล' }]}
              >
                <Select
                  placeholder="กลุ่มผู้ใช้งาน"
                  options={group_roles}
                ></Select>
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
          </TabPane>

          <TabPane tab="AD" key="2">
            <Form
              {...formItemLayout}
              layout="vertical"
              name="nonadform"
              id="nonadform"
              // onFinish={onFinish}
              form={formAD}
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
                  { required: true, message: 'กรุณากรอกข้อมูล กลุ่มผู้ใช้งาน' },
                ]}
              >
                <Select
                  placeholder="กลุ่มผู้ใช้งาน"
                  options={group_roles}
                ></Select>
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
          </TabPane>
        </Tabs>
      </Drawer>
    </>
  );
};

export default NonadUsermanage;
