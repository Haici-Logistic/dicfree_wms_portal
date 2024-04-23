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
import { Table, Modal, Button, message } from 'antd';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';

export default () => {
  const { visible, data } = nx.$modal.value('product-inbound-undo');
  const { id, productArrivalOrderItemId } = data || {};
  const qyResource = useQuery(
    ['product_arrival_orders_item_sn_undo_list', id, productArrivalOrderItemId],
    () => nx.$api.product_arrival_orders_item_sn_undo_list({ id, productArrivalOrderItemId }),
    { enabled: !!id }
  );

  const dataSource = qyResource.data || [];
  const columns = nx.antColumn([
    { title: 'Id', key: 'id', options: { width: 100 } },
    { key: 'productSkuCode', title: 'MallSKUCode' },
    { title: 'productSnCode', key: 'code' }
  ]);

  return (
    <Modal
      width={1000}
      open={visible}
      footer={false}
      title={<span className="capitalize">outbound undo</span>}
      onCancel={nx.$modal.dismissAll}
      closable>
      <Table
        size="small"
        loading={qyResource.isLoading}
        bordered
        pagination={false}
        scroll={{ y: 400 }}
        dataSource={dataSource}
        columns={columns}
      />
    </Modal>
  );
};
