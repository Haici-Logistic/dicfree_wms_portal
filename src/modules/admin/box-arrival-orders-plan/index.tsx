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
import { Button, Row, Col, Space, Card, Empty } from 'antd';
import LocationList from './_location-list';
import LocationPlaned from './_location-planed';

export default () => {
  return (
    <Row gutter={20}>
      <Col span={12}>
        <LocationList />
      </Col>
      <Col span={12}>
        <LocationPlaned />
      </Col>
    </Row>
  );
};
