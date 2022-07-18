import { Card, Col, Row, Typography } from 'antd';
import BargraphPage from './BargraphIssue/BargraphPage';
import KpisPage from './Kpis/KpisPage';
import styled from './styled';
import SummaryPage from './Summary/SummaryPage';
import UnsafePage from './UnsafeIssue/UnsafePage';

const SsheAnalysis = () => {
  const { Title } = Typography;
  return (
    <>
      <Title level={4}>Paragraph</Title>
      <hr />
      <Row gutter={[16, 16]}>
        <Col xl={{ span: 12 }}>
          <Typography style={styled.headerTitle}>KPIs</Typography>
          <Card style={styled.cardTool}>
            <KpisPage />
          </Card>
        </Col>
        <Col xl={{ span: 12 }}>
          <Typography style={styled.headerTitle}>
            Analyze by Criteria of Unsafe Action/Condition Issues
          </Typography>
          <Card style={styled.cardTool}>
            <UnsafePage />
          </Card>
        </Col>
        <Col xl={{ span: 12 }}>
          <Typography style={styled.headerTitle}>
            Summary by Criteria of Environmental issue
          </Typography>
          <Card style={styled.cardTool}>
            <SummaryPage />
          </Card>
        </Col>
        <Col xl={{ span: 12 }}>
          <Typography style={styled.headerTitle}>
            SHE issue from Weekly Audit (Top5)
          </Typography>
          <Card style={styled.cardTool}>
            <BargraphPage />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SsheAnalysis;
