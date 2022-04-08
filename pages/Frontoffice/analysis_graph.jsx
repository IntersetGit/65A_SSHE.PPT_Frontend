import { useState , useEffect} from "react";
import {Row, Col, Card, Skeleton, Table, Tag, Space} from 'antd'
import { Pie } from '@ant-design/plots'



const AnalysisGraph = () =>{
    const [isLoading,setLoading] = useState(false)

    const data = [
        {
            type: '分类一',
            value: 27,
        },
        {
            type: '分类二',
            value: 25,
        },
        {
            type: '分类三',
            value: 18,
        },
        {
            type: '分类四',
            value: 15,
        },
        {
            type: '分类五',
            value: 10,
        },
        {
            type: '其他',
            value: 5,
        },
    ];
    const config = {
        appendPadding: 10,
        data,
        angleField: 'value',
        colorField: 'type',
        radius: 0.75,
        label: {
            type: 'spider',
            labelHeight: 28,
            content: '{name}\n{percentage}',
        },
        interactions: [
            {
                type: 'element-selected',
            },
            {
                type: 'element-active',
            },
        ],
    };

    const columns = [
        {
            title: 'รหัสบริษัท',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'ชื่อบริษัท',
            dataIndex: 'name',
            key: 'name',
            render: text => <p>{text}</p>,
        },
        {
            title: 'ที่อยู่',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'สถานะ',
            key: 'tags',
            dataIndex: 'tags',
            render: tags => (
                <>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? 'geekblue' : 'green';
                        if (tag === 'loser') {
                            color = 'volcano';
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </>
            ),
        },
        {
            title: 'การกระทำ',
            key: 'action',
            render: (text, record) => (
                <Space size="middle">
                    <p>Invite {record.name}</p>
                    <p>Delete</p>
                </Space>
            ),
        },
    ];

    const _data = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    useEffect(() => {

        let timeout = setTimeout(() =>{
            setLoading(true)

            return clearTimeout(timeout)
        },3000)
    })

    return (
        <>
            <Row gutter={8}>
                <Col xl={12}>
                    <Card size='small' title={'Recently Unsafe Table'}>
                        {isLoading ?
                            <Table columns={columns} dataSource={_data} expandable size={'middle'} />
                            :
                            <Skeleton active/>
                        }
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card size='small' title={'Unsafe Statistic'}>
                        {isLoading ?
                            <Pie {...config} />
                            :
                            <Skeleton active/>
                        }

                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AnalysisGraph