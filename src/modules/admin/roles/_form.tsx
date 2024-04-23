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

class Form extends BaseForm {
  resources = 'roles';
  state = {
    meta: {
      formItemLayout: FORM_LAYOUT,
      initialValues: {},
      fields: [
        { key: 'code', label: 'Code', required: true },
        { key: 'name', label: 'Name' },
        { key: 'privilegeIdList' }
      ]
    }
  };

  loader = () => {
    const { meta } = this.state;
    const apis = this.isEdit
      ? [nx.$api.privileges_list(), nx.$api.roles_show(this.params)]
      : [nx.$api.privileges_list()];
    return Promise.all(apis).then((res) => {
      const [privileges, data] = res;
      nx.set(meta, 'fields[2].widgetProps.items', privileges);
      this.setState({ meta });
      return data;
    });
  };
}

export default withRouter(Form as any);
