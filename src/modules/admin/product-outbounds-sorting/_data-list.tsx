/**
 * Copyright 2024 Wuhan Haici Technology Co., Ltd 
 * <p>
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * <p>
 * http://www.apache.org/licenses/LICENSE-2.0
 * <p>
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import { Card, Row, Col, CardProps, Empty } from 'antd';
import styled from 'styled-components';
import ResourceTable from './_resource-table';
import ResourceTableDetail from './_resource-table-detail';

const Container = styled((props: CardProps) => <Card {...props} />)`
  font-size: 2rem;
  height: 100%;
  align-items: center;
  justify-content: center;
  .ant-card-body {
    height: calc(100% - 38px);
    background: #fafafa;
    align-items: center;
    display: flex;
    justify-content: center;
  }
`;

export default (props) => {
  const { id, basketNo, ts } = props;
  if (!id) return null;
  return (
    <Row gutter={10} className="my-5">
      <Col span={4}>
        <Container title="BasketNo" size="small">
          <nx.ife value={basketNo}>
            {basketNo}
            <Empty />
          </nx.ife>
        </Container>
      </Col>
      <Col span={10}>
        <ResourceTable ts={ts} id={id} />
      </Col>
      <Col span={10}>
        <ResourceTableDetail ts={ts} id={id} />
      </Col>
    </Row>
  );
};
