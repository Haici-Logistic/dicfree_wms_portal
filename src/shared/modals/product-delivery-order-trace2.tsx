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
import React, { useMemo } from 'react';
import { Alert, Button, Modal, Space, Spin } from 'antd';
import { TimelineX } from '@/shared/components/timeline-x';
import { useQuery } from '@tanstack/react-query';

export default (props) => {
  const { visible, data } = nx.$modal.value('product-delivery-order-trace');
  if (!data) return null;
  const id = data?.id;
  // const abortCtrl = React.useRef(new AbortController());
  const traceQuery = useQuery(
    ['product_delivery_orders_trace', id],
    ({ signal }) => nx.$api.product_delivery_orders_trace({ id }, { signal }),
    { enabled: !!id }
  );

  const Tips = useMemo(() => {
    return (
      <Spin spinning={traceQuery.isLoading}>
        <Space>
          <span>courier: {traceQuery.data?.courier}</span>
          <span>waybill: {traceQuery.data?.waybill}</span>
        </Space>
      </Spin>
    );
  }, [traceQuery.data]);

  return (
    <Modal
      open={visible}
      width={1000}
      footer={null}
      title={<span className="capitalize">product-delivery-order-trace</span>}
      onCancel={() => {
        nx.$client.cancelQueries({ queryKey: ['product-delivery-order-trace'] });
        nx.npdone();
        nx.$modal.dismissAll();
      }}
      closable>
      {/* <Alert className="mb-2" description={Tips} type="info" showIcon /> */}
      <Spin spinning={traceQuery.isLoading} tip="Querying...">
        <div className=" min-h-[200px] max-h-[400px] rounded transition-all border-gray-200 bg-slate-50 hover:bg-slate-100 border-1 border-dashed p-3 overflow-y-auto">
          {traceQuery.isSuccess && <TimelineX items={traceQuery.data.tracingList} />}
          {traceQuery.isError && (
            <Button
              type="primary"
              onClick={(e) => {
                traceQuery.refetch();
              }}>
              Retry
            </Button>
          )}
        </div>
      </Spin>
    </Modal>
  );
};
