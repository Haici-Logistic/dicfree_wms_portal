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
import React from 'react';
import { ID_NAME_PAIRS } from '@/shared/constants';

const KV_APIS = [
  '/ads/user/role/list',
  '/ads/resource/privilege/list',
  '/ads/bsCate/tree',
  '/ads/propName/list'
];

export default (options) => {
  const { config, data } = options;
  const { url, $name } = config;

  console.log(`✅ $name: `, $name);

  const isKvApis = KV_APIS.some((item) => url.includes(item));

  if (isKvApis) {
    data.data = nx.keyMap(data.data, ID_NAME_PAIRS);
  }

  if (url.includes('/ads/bsCate/propName/list')) {
    data.data.forEach((item) => {
      // prop 是辅助数据，后面数据处理完，直接可以删除掉，不用提交到后台。
      const propValue = item.prop;
      delete item.prop;
      item.__prop__ = propValue;
    });
  }

  if ($name === 'menu') {
    data.data = nx.keyMap(data.data, { name: 'label', url: 'key' }, false);
    nx.deepEach(data.data, (key, value, target) => {
      if (typeof value === 'object' && !Array.isArray(value)) {
        delete value['parentId'];
      }
      if (key === 'icon') {
        target[key] = React.createElement('span', null, value);
      }
    });
  }

  return options;
};
