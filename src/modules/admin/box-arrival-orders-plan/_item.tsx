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
import cx from 'classnames';
import styled from 'styled-components';
import { CloseCircleOutlined } from '@ant-design/icons';
import { Tooltip, message } from 'antd';
import { getModalColor } from './_helper';
import { tipsMap, bgMap } from './_constant';

interface Props {
  model: Item;
  canSelect?: boolean;
  canRemove?: boolean;
}

const Container = styled.button`
  border-radius: 4px;
  border: 3px solid transparent;
  padding: 4px 10px;
  transition: 0.3s;

  &.is-active,
  &:not([disabled]):hover {
    background: #c3ecd5;
  }

  &.is-selected {
    border-style: dashed;
    background: #4096ff2e;
    border-color: #4096ff;
  }

  &[disabled] {
    opacity: 0.8;
    cursor: not-allowed;
  }
`;

export default (props: Props) => {
  const { model, canSelect, canRemove } = props;
  const currentPlanId = nx.$get('boxArrivalOrders.currentPlanId');
  const activeLocKey = nx.$get('boxArrivalOrders.activeLocKey');
  const totalKey = nx.camelize(`total.${activeLocKey}.Count`);
  const max = nx.$get(`boxArrivalOrders.selectedPlan.${totalKey}`);
  const color = getModalColor(model);
  const disabled = color === 'gray' || color === 'orange';
  const toggleTo = (val) => {
    const activeLocItems = nx.$get('boxArrivalOrders.activeLocItems');
    const hasReached = activeLocItems.length >= max;
    if (!val) model.selected = val;

    if (val && hasReached) return message.error('The number has reached the maximum.');
    model.selected = val;
    const target = nx.toggleTo(activeLocItems, model, val, 'code');
    nx.$call('boxArrivalOrders.updateActiveItems', target);
    nx.$set('app.ts', Date.now());
  };

  const handleClick = () => {
    if (!canSelect) return;
    if (!currentPlanId) return message.info('Please select a plan first.');
    toggleTo(!model.selected);
  };

  return (
    <Tooltip title={tipsMap[color]}>
      <Container
        disabled={disabled}
        className={cx(bgMap[color], `relative transition-all cursor-pointer is-item`, {
          'is-selected': model.selected && canSelect
        })}
        onClick={handleClick}>
        <nx.ife value={canRemove} only>
          <CloseCircleOutlined className="absolute right-[-10px] top-[-5px]" onClick={(e) => toggleTo(false)} />
        </nx.ife>
        {model.code}
      </Container>
    </Tooltip>
  );
};
