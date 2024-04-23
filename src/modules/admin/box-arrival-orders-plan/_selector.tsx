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
import { AcSelect } from '@jswork/antd-components';
import { useQuery } from '@tanstack/react-query';

export default () => {
  const qyList = useQuery<any>(['arrival_orders_location_undo_list'], nx.$api.arrival_orders_location_undo_list, {
    onSuccess: (e) => nx.$set('boxArrivalOrders.planList', e)
  });

  return (
    <AcSelect
      style={{ width: 240 }}
      allowClear
      items={qyList.data}
      size="small"
      loading={qyList.isLoading}
      disabled={qyList.isLoading}
      onChange={(e) => {
        const { value } = e.target;
        nx.$set('boxArrivalOrders.currentPlanId', value);
      }}
    />
  );
};
