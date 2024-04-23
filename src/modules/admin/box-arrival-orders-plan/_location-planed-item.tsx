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
import styled from 'styled-components';
import ReactDraggableList from '@jswork/react-draggable-list';
import Item from './_item';
import { Badge, Empty, Progress, Space } from 'antd';

interface Props {
  title: string;
  locKey: string;
  items: Item[];
}

const Container = styled.div`
  border: 1px solid #eee;
  border-radius: 5px;
  padding: 10px;
  min-height: 500px;
  transition: 0.3s;

  &[data-disabled='true'] {
    pointer-events: none;
    filter: grayscale(1);
    opacity: 0.3;
  }

  &.is-active {
    background: #e6f4ff;
    border-color: #91caff;
  }

  .is-title {
    font-size: 16px;
    border-left: 3px solid #ccc;
    padding: 0 10px;
  }

  .is-grid-list {
    display: grid;
    grid-auto-flow: column;
    grid-template-rows: repeat(10, 1fr);
    gap: 10px;
    .is-item {
      width: 60px;
    }
  }
`;

export default (props: Props) => {
  const { title, items, locKey } = props;
  const totalKey = nx.camelize(`total.${locKey}.Count`);
  const total = nx.$get(`boxArrivalOrders.selectedPlan.${totalKey}`);
  const ilength = items.length;
  const activeLocKey = nx.$get('boxArrivalOrders.activeLocKey');
  const isActived = activeLocKey === locKey;
  const disabled = total === 0;
  const percent = parseFloat(((100 * ilength) / total).toFixed(1));
  const handleSort = (e) => {
    const keys = e.target.value;
    if (locKey === 'whole') nx.$call('boxArrivalOrders.updateWholeItems', keys);
    if (locKey === 'bulk') nx.$call('boxArrivalOrders.updateBulkItems', keys);
  };

  return (
    <Container
      data-disabled={disabled}
      onClick={(e) => nx.$set('boxArrivalOrders.activeLocKey', locKey)}
      className={isActived ? 'is-active' : ''}>
      <h3 className="flex flex-row justify-between is-title">
        <div className="flex-1 basis-1/2">
          <Badge showZero count={`${ilength}/${total}`} size="small">
            <span>{title}</span>
          </Badge>
        </div>
        <div className="basis-1/2">
          <Progress percent={percent} size="small" />
        </div>
      </h3>
      <nx.ife value={items.length}>
        <ReactDraggableList
          className="is-grid-list"
          items={items}
          rowKey="code"
          template={({ item, index }) => <Item canRemove key={index} model={item} />}
          onChange={handleSort}
        />
        <Empty />
      </nx.ife>
    </Container>
  );
};
