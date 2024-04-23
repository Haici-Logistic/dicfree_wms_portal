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
import { FORM_LAYOUT, PARAM_TYPES } from '@/shared/constants';

class Form extends BaseForm {
  resources = 'params';
  state = {
    meta: {
      formItemLayout: FORM_LAYOUT,
      initialValues: {},
      fields: [
        { key: 'code', label: '代码', required: true },
        { key: 'name', label: '名称', required: true },
        {
          key: 'type',
          label: '类型',
          widget: 'ac:select',
          widgetProps: { items: PARAM_TYPES },
          required: true
        },
        { key: 'value', label: '值', widget: 'textarea', required: true },
        { key: 'defaultItem', label: '默认值', widget: 'textarea', required: true },
        { key: 'remark', label: '备注' }
      ]
    }
  };
}

export default withRouter(Form as any);
