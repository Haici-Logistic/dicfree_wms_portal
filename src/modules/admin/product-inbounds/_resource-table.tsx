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
import { useMutation, useQuery } from '@tanstack/react-query';
import { Table, Button, Space, Card, message } from 'antd';
import noop from '@jswork/noop';
import SearchMall from './_search-box';

const ResourceTable = (props) => {
  const { id } = props;
  const { ts } = nx.$use('app');
  const qyResource = useQuery(
    ['product_arrival_orders_undo_calc_list', ts, id],
    () => nx.$api.product_arrival_orders_undo_calc_list({ id }),
    {
      enabled: !!id,
      onSuccess: (data) => {
        nx.$set('productInbound.undoList', data);
        nx.$set('productInbound.rawUndoList', data);
      }
    }
  );
  const handlePrint = async (productArrivalOrderItemId) => {
    // await mtPrint.mutateAsync(productArrivalOrderItemId);
    // await qyResource.refetch();
    // message.success('Print success!');
    nx.$modal.present('print-set-number', {
      id,
      productArrivalOrderItemId
    });
  };
  const dataSource = nx.$use('productInbound.undoList');
  const columns = nx.antColumn([
    'id',
    { key: 'productSkuCode', title: 'MallSKUCode' },
    {
      title: 'Undo/Plan',
      render: (_, record) => {
        const { inboundCount, totalCount } = record;
        const left = totalCount - inboundCount;
        return (
          <span>
            <strong style={{ color: 'red' }}>{left}</strong>/{totalCount}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      callback: (_, record) => {
        // undo弹出详情modal
        const { id: productArrivalOrderItemId } = record;
        return (
          <Space>
            <Button
              onClick={() => {
                nx.$invalidQuery('arrival_orders_item_sn_undo_list');
                nx.$modal.present('product-inbound-undo', {
                  id,
                  productArrivalOrderItemId
                });
              }}
              size="small">
              undo
            </Button>
            <Button disabled={record.printed} onClick={() => handlePrint(productArrivalOrderItemId)} size="small">
              print
            </Button>
          </Space>
        );
      }
    }
  ]);

  return (
    <Card
      size="small"
      title="UndoList"
      extra={
        <Space>
          <SearchMall />
        </Space>
      }>
      <Table
        size="small"
        bordered
        pagination={false}
        loading={qyResource.isLoading}
        dataSource={dataSource}
        columns={columns}
        rowClassName={(_, index) => {
          return index == 0 ? 'blink-row' : '';
        }}
        onRow={(record) => {
          return {
            onClick: () => {
              return props.onRowClick(record);
            }
          };
        }}
      />
    </Card>
  );
};

// default props
ResourceTable.defaultProps = {
  onRowClick: noop
};

export default ResourceTable;
