import Rangepicker from '@/components/RangePicker';
import {
  getSummaryIssue,
  getSummayIssueTop5,
  getUnsafeIssue,
} from '@/service/FrontoffceApi/ssheAnalysis';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row, Typography } from 'antd';
import _ from 'lodash';
import { useCallback, useEffect, useState } from 'react';
import BargraphPage, { BargraphT } from './BargraphIssue/BargraphPage';
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
  const [dataSourcesSummaryTop5, setDataSourcesSummaryTop5] =
    useState<BargraphT>([]);
  const [storageOnchange, setStorageOnchange] = useState<string>(``);

  const handleSubmit = async () => {
    if (selectDateRange && !storageOnchange)
      setParamQurey(
        `?start_date=${selectDateRange[0].toISOString()}&end_date=${selectDateRange[1].toISOString()}`,
      );
    else setParamQurey(``);

    if (storageOnchange && !selectDateRange)
      setParamQurey(
        (e) => (e += `?issue_id=${encodeURIComponent(storageOnchange)}`),
      );
    else setParamQurey(``);
    if (selectDateRange && storageOnchange)
      setParamQurey(
        `?issue_id=${encodeURIComponent(
          storageOnchange,
        )}&start_date=${selectDateRange[0].toISOString()}&end_date=${selectDateRange[1].toISOString()}`,
      );
  };

  const beginProcess = useCallback(async () => {
    const { items: responseUnsafe } = await getUnsafeIssue(paramQuery);
    const { items: responseSummary } = await getSummaryIssue(paramQuery);
    const { items: responseTop5 } = await getSummayIssueTop5(paramQuery);

    if (_.size(responseUnsafe) > 0) {
      setDataSources(
        responseUnsafe.map(({ issue_type_name, quantity }) => {
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

    if (_.size(responseSummary) > 0) {
      setDataSourcesSummary(
        responseSummary.map(({ hazard_name, quantity }) => {
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
    if (_.size(responseTop5) > 0) {
      setDataSourcesSummaryTop5(
        responseTop5.map(({ task_location, quantity }) => {
          return {
            type: task_location,
            sales: Number(quantity),
          };
        }),
      );
    } else {
      setDataSourcesSummaryTop5([
        {
          type: 'empty',
          sales: 0,
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
            <SelectProject onChange={setStorageOnchange} />
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
            <BargraphPage dataBargraph={dataSourcesSummaryTop5} />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default SsheAnalysis;
