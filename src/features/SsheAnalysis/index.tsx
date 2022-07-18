import { Card } from 'antd';
import KpisPage from './Kpis/KpisPage';
import styled from './styled.css';
import UnsafePage from './UnsafeIssue/UnsafePage';

const SsheAnalysis = () => {
  return (
    <>
      <div className={styled.columnTools}>
        <div>
          <span className={styled.headerTitle}>KPIs</span>
          <Card style={{ width: '100%', height: '90%' }}>
            <KpisPage />
          </Card>
        </div>
        <div>
          <span className={styled.headerTitle}>Unsafe Issue</span>
          <Card style={{ width: '100%', height: '90%' }}>
            <UnsafePage />
          </Card>
        </div>
      </div>

      {/*       
      <Row gutter={8}>
        <Col xl={12}>
          <Card size="small" title={'Recently Unsafe Table'}>
            {isLoading ? (
              <Table
                columns={columns}
                dataSource={_data}
                expandable
                size={'middle'}
              />
            ) : (
              <Skeleton active />
            )}
          </Card>
        </Col>
        <Col xl={12}>
          <Card size="small" title={'Unsafe Statistic'}>
            {isLoading ? <Pie {...config} /> : <Skeleton active />}
          </Card>
        </Col>
        <Col xl={12}>
          <Card size="small" title={'Unsafe Statistic'}>
            {isLoading ? <Pie {...config} /> : <Skeleton active />}
          </Card>
        </Col>
      </Row> */}
    </>
  );
};

export default SsheAnalysis;
