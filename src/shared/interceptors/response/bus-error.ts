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
import { notification } from 'antd';
import { ERROR_MESSAGES } from '@/shared/constants';

export default (options) => {
  const { data, status, config } = options;
  const { $name } = config;
  // todo: redirect_uri feature
  if (status === 401) {
    nx.$local.del('session');
    nx.navigate('/login');
    return options;
  }

  if (status >= 400) {
    const message = data.errorMessage || ERROR_MESSAGES.defaults;
    notification.error({ message });
  }

  return options;
};
