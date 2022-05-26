import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Tag, Dropdown, Button, Menu } from 'antd';

const ProjectManage = (props) => {
    

    const columns = [
        {
          title: 'รหัสโครงการ',
          dataIndex: 'project_company_id',
          key: 'project_company_id',
        },
        {
          title: 'ชื่อโครงการ',
          dataIndex: 'project_name_th',
          key: 'project_name_th',
        },
        {
          title: 'ผู้รับผิดชอบ',
          dataIndex: 'respon_person',
          key: 'respon_person',
        },
    ];

    return(
        <>
        <Card style={{ marginTop : '1rem' }} bordered={true}>
            <h1>จัดการข้อมูลโครงการ</h1>
            <Table columns={columns} expandable size={'middle'} />
        </Card>
        </>
    )

    
}

export default ProjectManage
