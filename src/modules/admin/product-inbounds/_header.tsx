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
import { Button, Space, Tag, Spin, message } from 'antd';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PRINTER_STATUS } from '@/shared/constants';

const RETRY_OPTS = {
  refetchInterval: 3e4
};

export default (props) => {
  const { id } = props;
  const qyStatus = useQuery(['printer_status'], nx.$api.printer_status, RETRY_OPTS);
  const qyInfo = useQuery<KeyIsString>(['printer_info'], nx.$api.printer_info);
  const mtClear = useMutation(nx.$api.printer_status_clear);
  const statusItem = PRINTER_STATUS[qyStatus.data as string];

  return (
    <nav className="flex p-3 rounded-md bg-slate-200 justify-between mb-2">
      <Spin spinning={qyStatus.isLoading}>
        <span className="mr-2">Status ({qyInfo.data?.name}):</span>
        <Tag color={statusItem?.color}>{statusItem?.label}</Tag>
      </Spin>
      <Space>
        <Button
          className="capitalize"
          icon={`🗑`}
          size="small"
          onClick={(e) => {
            mtClear.mutate();
            message.success('Success');
          }}>
          clear printer status
        </Button>
      </Space>
    </nav>
  );
};
