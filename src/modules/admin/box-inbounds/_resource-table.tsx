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
// import { useState } from 'react'
import noop from '@jswork/noop';
import { AcConfirmButton } from '@jswork/antd-components';
import SearchBox from './_search-box';

const ResourceTable = (props) => {
  const { id } = props;
  const { ts } = nx.$use('app');
  // const [itemId, setItemId] = useState(-1);
  const qyResource = useQuery(
    ['arrival_orders_undo_calc_list', ts, id],
    () => nx.$api.arrival_orders_undo_calc_list({ id }),
    {
      enabled: !!id,
      onSuccess: (data) => {
        nx.$set('boxInbound.undoList', data);
        nx.$set('boxInbound.rawUndoList', data);
      }
    }
  );
  const mtPrintAll = useMutation(() => nx.$api.arrival_orders_item_sn_undo_print_all({ id }));
  const mtPrint = useMutation((boxArrivalOrderItemId) =>
    nx.$api.arrival_orders_item_sn_undo_print({ id, boxArrivalOrderItemId })
  );
  const handlePrint = async (boxArrivalOrderItemId) => {
    await mtPrint.mutateAsync(boxArrivalOrderItemId);
    await qyResource.refetch();
    message.success('Print success!');
  };
  const dataSource = nx.$use('boxInbound.undoList');
  const printAllPrinted = nx.$use('boxInbound.printAllPrinted');
  const columns = nx.antColumn([
    'id',
    { key: 'boxSkuCode', title: 'BoxSKUCode' },
    { key: 'boxSku.location', title: 'location' },
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
        const { id: boxArrivalOrderItemId } = record;
        return (
          <Space>
            <Button
              onClick={() => {
                nx.$invalidQuery('arrival_orders_item_sn_undo_list');
                nx.$modal.present('box-inbound-undo', {
                  id,
                  boxArrivalOrderItemId
                });
              }}
              size="small">
              undo
            </Button>
            <Button
              disabled={record.printed}
              onClick={() => handlePrint(boxArrivalOrderItemId)}
              size="small">
              print
            </Button>
          </Space>
        );
      }
    }
  ]);

  const handlePrintAll = async () => {
    await mtPrintAll.mutateAsync();
    await qyResource.refetch();
    message.success('Print success!');
  };

  return (
    <Card
      size="small"
      title="UndoList"
      extra={
        <Space>
          <SearchBox />
          <AcConfirmButton
            type="primary"
            childProps={{
              loading: mtPrintAll.isLoading,
              disabled: printAllPrinted || mtPrintAll.isLoading
            }}
            lang="en-US"
            onClick={handlePrintAll}>
            Print All
          </AcConfirmButton>
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
