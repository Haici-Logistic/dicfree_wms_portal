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
import { Table, Space, Button, Input } from 'antd';

export default (props) => {
  const { ctx } = props;
  return (
    <Space className="mb-2 flex justify-end">
      <Input.Search
        allowClear
        onSearch={ctx.handleSearch.bind(null, 'thirdOrderNo')}
        onChange={(e) => {
          console.log('value', e.target.value);
          nx.set(ctx, 'searchData.thirdOrderNo', e.target.value);
        }}
        placeholder="Search by thirdOrderNo"
        enterButton
        size="small"
      />
      <Input.Search
        allowClear
        onSearch={ctx.handleSearch.bind(null, 'waybill')}
        onChange={(e) => {
          nx.set(ctx, 'searchData.waybill', e.target.value);
        }}
        placeholder="Search by waybill"
        enterButton
        size="small"
      />
    </Space>
  );
};
