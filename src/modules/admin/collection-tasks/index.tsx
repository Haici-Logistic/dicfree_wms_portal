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
import React, { useEffect, useState } from 'react';
import { Button, Tag, Space, Card, Row, Col } from 'antd';
import { UnorderedListOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons';
import ResourceTable from './_resource-table';
import ResourceTableDetail from './_resource-table-detail';

export default () => {
  const handleAdd = () => nx.navigate('/admin/collection-tasks/add');
  const titleView = (
    <Space>
      <UnorderedListOutlined />
      <span className="capitalize">List Management</span>
      <Tag>collection tasks</Tag>
    </Space>
  );

  const extraView = (
    <Space>
      <Button size={'small'} onClick={handleAdd}>
        <PlusOutlined />
        <span>Add</span>
      </Button>
    </Space>
  );

  return (
    <Card title={titleView} extra={extraView}>
      <Row gutter={20}>
        <Col span={12}>
          <ResourceTable />
        </Col>
        <Col span={12}>
          <ResourceTableDetail />
        </Col>
      </Row>
    </Card>
  );
};
