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
import { Modal, InputNumber, Alert, Space, Form, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';

export default (props) => {
  const { visible, data } = nx.$modal.value('print-set-number');
  const [printCount, setCount] = useState<number>(0);
  const mtPrint = useMutation((data) => nx.$api.product_arrival_orders_item_sn_undo_print(data));
  const handleOk = async () => {
    await mtPrint.mutateAsync({ printCount, ...data });
    message.success('Print success!');
    nx.$modal.dismissAll();
  };

  return (
    <Modal
      open={visible}
      title={<span className="capitalize">Print</span>}
      onCancel={nx.$modal.dismissAll}
      onOk={handleOk}
      okButtonProps={{ loading: mtPrint.isLoading, disabled: mtPrint.isLoading }}
      closable>
      <Space direction="vertical" className="w-full">
        <Alert message="Please enter the number of copies to print" type="info" showIcon />
        <InputNumber
          className="w-full"
          size="large"
          addonBefore="+"
          defaultValue={printCount}
          onChange={(e) => setCount(e)}
        />
      </Space>
    </Modal>
  );
};
