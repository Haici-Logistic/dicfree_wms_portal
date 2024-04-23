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
  resources = 'users';
  state = {
    meta: {
      formItemLayout: FORM_LAYOUT,
      initialValues: {
        // avatar: []
      },
      fields: [
        { key: 'username', disabled: this.isEdit },
        { key: 'nickname', required: true },
        { key: 'password', type: 'password', required: !this.isEdit },
        { key: 'avatar' },
        { key: 'roleIdList' }
      ]
    }
  };

  loader = () => {
    const { meta } = this.state;
    return Promise.all([this.isEdit ? nx.$api.users_show(this.params) : null, nx.$api.roles_list()]).then((res) => {
      const [data, roles] = res;
      nx.set(meta, 'fields[4].widgetProps.items', roles);
      return data;
    });
  };
}

export default withRouter(Form as any);
