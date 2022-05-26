import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Tag, Dropdown, Button, Menu } from 'antd';
import { dataz } from '../../config/data_company';

const ProjectManage = (props) => {
    

    const columns = [
        {
          title: 'รหัสบริษัท',
          dataIndex: 'reg_company_id',
          key: 'reg_company_id',
        },
        {
          title: 'ชื่อบริษัท',
          dataIndex: 'company_name_th',
          key: 'company_name_th',
        },
        {
          title: 'ที่อยู่',
          dataIndex: 'village_building_th',
          key: 'village_building_th',
        },
        {
          title: "สถานะ",
          dataIndex: "status",
          key: "status",
          sorter: (a, b) => a.type - b.type,
          render: (record) => {
            return <p style={{ backgroundColor: record ? '#6CFF60' : '#FF6060', textAlign: 'center', borderRadius: '10px', color: 'white' }}>{record ? "ใช้งาน" : "ไม่ได้ใช้งาน"}</p>;
          },
        },
    ];

    return(
        <>
        <Card style={{ marginTop : '1rem' }} bordered={true}>
            <h1>จัดการข้อมูลโครงการ</h1>
            <Table columns={columns} dataSource={dataz} expandable size={'middle'} />
        </Card>
        </>
    )

    
}

export default ProjectManage
