import { Row , Col , Card , Skeleton} from 'antd'

const AnalysisGraph = () =>{
    return (
        <>
            <Row gutter={8}>
                <Col xl={12}>
                    <Card >
                        <p>Card content</p>
                        <p>Card content</p>
                        <p>Card content</p>
                    </Card>
                </Col>
                <Col xl={12}>
                    <Card>
                        <Skeleton/>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default AnalysisGraph