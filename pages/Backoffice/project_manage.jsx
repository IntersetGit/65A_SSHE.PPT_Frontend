import React, { useState , useEffect } from 'react'
import { Card , Space , Table , Tag, Dropdown, Button, Menu } from 'antd';

const ProjectManage = (props) => {
    

    const columns = [
        {
          title: 'ชื่อโครงการ',
          dataIndex: 'project_name_th',
          key: 'project_company_id',
        },
        {
          title: 'ชื่อบริษัท',
          dataIndex: 'company_name_th',
          key: 'company_name_th',
        },
        {
          title: 'ผู้รับเหมา',
          dataIndex: 'contractor_name_th',
          key: 'contractor_name_th',
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
