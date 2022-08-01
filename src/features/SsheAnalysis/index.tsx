import Rangepicker from '@/components/RangePicker';
import {
  getSummaryIssue,
  getUnsafeIssue,
} from '@/service/FrontoffceApi/ssheAnalysis';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import BargraphPage from './BargraphIssue/BargraphPage';
import KpisPage from './Kpis/KpisPage';
import SelectProject from './SelectProject';
import styled from './styled';
import SummaryPage, { PieeT } from './Summary/SummaryPage';
import UnsafePage, { PieT } from './UnsafeIssue/UnsafePage';

const SsheAnalysis = () => {
  const [paramQuery, setParamQurey] = useState<string>(``);
  const [selectDateRange, setSelectDateRange] = useState<[Date, Date] | null>(
    null,
  );
  const [dataSources, setDataSources] = useState<PieT>([]);
  const [dataSourcesSummary, setDataSourcesSummary] = useState<PieeT>([]);

  const handleSubmit = async () => {
    if (selectDateRange)
      setParamQurey(
        `?start_date=${selectDateRange[0].toISOString()}&end_date=${selectDateRange[1].toISOString()}`,
      );
    else setParamQurey(``);
  };

  const beginProcess = useCallback(async () => {
    const responseUnsafe = await getUnsafeIssue(paramQuery);
    const responseSummary = await getSummaryIssue(paramQuery);
    if (_.size(responseUnsafe.items) > 0) {
      setDataSources(
        responseUnsafe.items.map(({ issue_type_name, quantity }) => {
          return {
            type: issue_type_name,
            value: Number(quantity),
          };
        }),
      );
    } else {
      setDataSources([
        {
          type: 'empty',
          value: 0,
        },
      ]);
    }

    if (_.size(responseSummary.items) > 0) {
      setDataSourcesSummary(
        responseSummary.items.map(({ hazard_name, quantity }) => {
          return {
            type: hazard_name,
            value: Number(quantity),
          };
        }),
      );
    } else {
      setDataSourcesSummary([
        {
          type: 'empty',
          value: 0,
        },
      ]);
    }
  }, [paramQuery]);

  useEffect(() => {
    beginProcess();
  }, [paramQuery]);

  return (
    <>
      <Card style={{ width: '100%', height: '90%' }}>
        <Row justify="center" gutter={[8, 8]}>
          <Col style={styled.cardBarSearch}>
            <Typography>Project Name:</Typography>
            <SelectProject />
          </Col>
          <Col style={styled.cardBarSearch}>
            <Typography>From - To Date:</Typography>
            <Rangepicker onChange={setSelectDateRange} />
          </Col>
          <Col style={styled.cardBarSearch}>
            <Button
              type="primary"
              icon={<SearchOutlined />}
              onClick={handleSubmit}
            >
              Search
            </Button>
          </Col>
        </Row>
      </Card>
      <Row style={{ marginTop: '10px' }} gutter={[16, 16]}>
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
            <UnsafePage dataPie={dataSources} />
          </Card>
        </Col>
        <Col xl={{ span: 12 }}>
          <Typography style={styled.headerTitle}>
            Summary by Criteria of Environmental issue
          </Typography>
          <Card style={styled.cardTool}>
            <SummaryPage dataPiee={dataSourcesSummary} />
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
