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
import { Empty, Space, Timeline } from 'antd';

interface TimelineXProps {
  items: any[];
}

const statusMap = {
  init: <span>⚪️</span>,
  finished: <span>🟢</span>,
  running: <span>🚚</span>
};

const generateTimelineItems = (items: any[]) => {
  return items.map((item) => {
    return {
      dot: statusMap[item.status],
      children: (
        <>
          <div className="text-sm mb-2" data-status={item.status}>
            <Space size={20}>
              <strong>🚁 [{item.status}]</strong>
              <span>📍 {item.scanLocation}</span>
              <span>🌈 {item.shipmentDirection}</span>
            </Space>
          </div>
          <div className="text-gray-400">
            <span>⏱</span> <em>{item.timeStamp}</em>
          </div>
        </>
      )
    };
  });
};

export const TimelineX = (props: TimelineXProps) => {
  const { items } = props;
  if (!items?.length) return <Empty />;
  const _items = generateTimelineItems(items);
  return <Timeline items={_items} />;
};
