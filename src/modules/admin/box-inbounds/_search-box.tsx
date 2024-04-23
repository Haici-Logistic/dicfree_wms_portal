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
import { Input } from 'antd';

const search = (keywords) => {
  const data = nx.$get('boxInbound.rawUndoList');
  if (!keywords) return data;
  return data.filter((item) => {
    return item.boxSkuCode.toLowerCase().includes(keywords.toLowerCase());
  });
};

export default () => {
  return (
    <Input.Search
      onChange={(e) => {
        const data = search(e.target.value);
        nx.$set('boxInbound.undoList', data);
      }}
      enterButton
      allowClear
      size="small"
      placeholder="Search boxSkuCode..."
    />
  );
};
