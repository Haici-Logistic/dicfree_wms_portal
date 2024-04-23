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
import ReactAntAbstractForm from '@jswork/ant-abstract-form';
import { CardSize } from 'antd/es/card/Card';
import { GLOBAL_FORM_PRESETS } from '@/shared/constants';

export class BaseForm extends ReactAntAbstractForm {
  apiService = nx.$api;
  size: CardSize = 'default';

  get lang() {
    return 'en-US';
  }

  initialState() {
    return {
      meta: {}
    };
  }

  getFormProps() {
    return {
      formItemLayout: [6, 18],
      presets: GLOBAL_FORM_PRESETS
    };
  }

  render() {
    return this.view();
  }
}
