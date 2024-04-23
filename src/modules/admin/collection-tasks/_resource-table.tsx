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
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button, Space, Table, message } from 'antd';
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import noop from '@jswork/noop';
import { AcConfirmButton } from '@jswork/antd-components';
import { Link } from 'react-router-dom';

// {
//     "id": 1,
//     "collectionNoVirtual": "00001",
//     "collectionNoReal": "",
//     "arrivingDate": "2023-09-08 12:03:11",
//     "inboundCount": 0,
//     "totalCount": 6
// },

const ResourceTable = (props) => {
  const { session } = nx.$use('auth');
  const qyResource = useQuery(['collection_tasks', session], () =>
    nx.$api.collection_tasks_index()
  );
  const currentId = nx.$use('collectionTasks.currentId');
  const mtMutate = useMutation((id) => nx.$api.collection_tasks_destroy({ id }));

  const dataSources = qyResource.data?.rows || [];
  const handleDestroy = async (record) => {
    const id = record.id;
    await mtMutate.mutateAsync(id);
    await qyResource.refetch();
    message.success('Delete success!');
    props.onRowClick(null);
    nx.$event.emit('collection_tasks:refresh');
    nx.$set('collectionTasks.currentId', null);
  };

  const columns = nx.antColumn([
    'id',
    'departureDate',
    'collectionNo',
    {
      title: 'Undo/Plan',
      render: (_, record) => {
        const { outboundCount, totalCount } = record;
        const left = totalCount - outboundCount;
        return (
          <span>
            <strong className="text-red">{left}</strong>/{totalCount}
          </span>
        );
      }
    },
    {
      title: 'Actions',
      width: 100,
      render: (_, record) => {
        const showInfo = record.status !== 'PENDING';
        if (showInfo) {
          return (
            <Space>
              <Link to={`/admin/collection-tasks/show/${record.id}`}>Detail</Link>
            </Space>
          );
        }

        return (
          <Space>
            <Link to={`/admin/collection-tasks/edit/${record.id}`}>Edit</Link>
            <AcConfirmButton type="link" lang="en-US" onClick={() => handleDestroy(record)}>
              Delete
            </AcConfirmButton>
          </Space>
        );
      }
    }
  ]);

  useEffect(() => {
    nx.$event.upon('collection_tasks:refresh', () => {
      qyResource.refetch();
    });
  }, []);

  useEffect(() => {
    if (qyResource.isFetched && !currentId) {
      nx.$set('collectionTasks.currentId', dataSources[0]?.id);
    }
  }, [qyResource.isFetched, currentId]);

  return (
    <Table
      size="small"
      bordered
      loading={qyResource.isLoading}
      rowClassName={(record) => {
        return record.id === currentId ? 'highlight-row' : '';
      }}
      dataSource={dataSources}
      columns={columns}
      onRow={(record) => {
        return {
          onClick: () => nx.$set('collectionTasks.currentId', record.id)
        };
      }}
    />
  );
};

// default props
ResourceTable.defaultProps = {
  onRowClick: noop
};

export default ResourceTable;
