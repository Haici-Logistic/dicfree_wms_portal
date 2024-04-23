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
import { Button, Space, Tag, Spin } from 'antd';

export default (props) => {
  const accessToken = nx.$get('auth.token');
  const { id } = props;

  return (
    <nav className="flex p-3 rounded-md bg-slate-200 justify-end mb-2">
      <Space>
        <Button
          icon={`📙`}
          size="small"
          target="_blank"
          href={`/api/ads/collectionTask/boxDeliveryOrder/snOutboundLog?access_token=${accessToken}`}>
          LOG Export
        </Button>
        <Button
          icon={`🌏`}
          disabled={!id}
          size="small"
          target="_blank"
          href={`/api/ads/collectionTask/snDownload?access_token=${accessToken}&id=${id}`}>
          Export
        </Button>
      </Space>
    </nav>
  );
};
