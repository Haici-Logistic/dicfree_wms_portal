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
import { Row, Col, Button, Modal, Space, message } from 'antd';
import { AcUploadDragger } from '@jswork/antd-components';

export default (props) => {
  const { visible } = nx.$modal.value('sku-batch-edit');
  const handleRequest = async (file) => {
    const fileName = await nx.$api.sys_upload({ file, actionName: 'dfwms-sku-edit' });
    await nx.$api.skus_edit_batch({ fileName });
    message.success('Batch edit success!');
    nx.$modal.dismissAll();
    nx.$event.emit('skus.index.refresh');
  };

  return (
    <Modal
      open={visible}
      destroyOnClose
      title={<span className="capitalize">Sku batch edit</span>}
      onCancel={nx.$modal.dismissAll}
      closable>
      <AcUploadDragger onRequest={handleRequest} />
    </Modal>
  );
};
