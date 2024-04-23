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
import { BaseForm } from '@/shared/base/base-form';
import { withRouter } from '@/shared/base/with-router';
import { FORM_LAYOUT } from '@/shared/constants';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';

class Form extends BaseForm {
  resources = 'collection_tasks';
  state = {
    meta: {
      formItemLayout: FORM_LAYOUT,
      initialValues: {},
      fields: [
        { key: 'collectionNoVirtual', label: 'CollectionNoVirtual', disabled: true },
        { key: 'collectionNoReal', label: 'CollectionNoReal', required: true },
        {
          key: 'departureDate',
          label: 'Departure Date',
          widget: 'ac:date-picker',
          required: true,
          widgetProps: {
            disabledDate: (date) => date.isBefore(dayjs())
          }
        },
        {
          key: 'boxDeliveryOrderIdList',
          label: 'Deliver To',
          widget: 'ac:select',
          required: true,
          widgetProps: {
            mode: 'multiple'
          }
        }
      ]
    }
  };

  init() {
    const isShow = location.hash.includes('/show/');
    this.viewMode = isShow;
  }

  loader = () => {
    // todo: delivery_order_list urlencoded
    const { meta } = this.state;
    const params = this.isEdit ? { collectionTaskId: this.params.id } : null;
    return Promise.all([
      nx.$api.delivery_order_list(params),
      nx.$api[`collection_tasks_${this.action}_init`](this.params)
    ]).then(([res1, res2]) => {
      const targetField2 = nx.get(meta, 'fields[3]');
      const targetProps = { mode: 'multiple', items: res1 };
      nx.set(targetField2, 'widgetProps', targetProps);
      this.setState({ meta });
      return res2;
    });
  };

  dataDidSave() {
    nx.$event.emit('collection_tasks:refresh');
  }
}

export default withRouter(Form as any);
