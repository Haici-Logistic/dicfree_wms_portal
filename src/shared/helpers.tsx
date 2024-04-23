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
import { message, type MenuProps } from 'antd';
import { groupBy, uniq } from 'lodash';
import printjs from 'print-js';

type MenuItem = Required<MenuProps>['items'][number];

export const FORM_LAYOUT = [3, 21];
export const Id_NAME_PAIRS = { id: 'value', name: 'label' };
export const KV_NAME_PAIRS = { value: 'id', label: 'name' };

export const getActiveKeys = (inPathname: string, menus) => {
  if (!menus) return [];
  const activeKeys = [inPathname];
  const activeMenu = menus.find((menu) => inPathname.includes(menu.key as string));
  if (activeMenu) activeKeys.push(activeMenu.key as string);
  return uniq(activeKeys);
};

export const getOpenKeys = (inPathname: string, menus) => {
  if (!menus) return [];
  let result = [];
  if (menus.length === 1) return [menus[0].key];
  nx.deepEach(menus, (key, value, target, isary, paths) => {
    if (key === 'key' && value === inPathname) {
      const parent = nx.get(menus, paths.slice(0, -3).join('.'));
      result = [parent.key];
      return nx.BREAKER;
    }
  });
  return result;
};

export const buildDownloadURL = (inUrl: string, inParams: any) => {
  const token = nx.$get('auth.token');
  const params = { ...inParams, access_token: token };
  return nx.param(params, inUrl);
};

export const silencePrint = (data) => {
  return fetch('http://127.0.0.1:8000/silencePrint', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(data)
  });
};

export const webPrint = (data) => {
  const { content: printable, contentType: type, contentBase64: base64 } = data;
  if (printable && base64) {
    return printjs({ printable, type, base64 });
  }
  message.error('Print failed!');
};

export const parseLocationList = (inList?: any[]) => {
  if (!inList) return [];
  const result = [];
  // 1. 按 groupCodde 分组
  const grouped = groupBy(inList, 'groupCode');
  const sortedKeys = Object.keys(grouped).sort();

  sortedKeys.forEach((key) => {
    const sublist = grouped[key];
    // 2. 按 code 的首字母分组
    const res = groupBy(sublist, (item) => item.code.charAt(0));
    const resItems = [];
    nx.forIn(res, (key, item) => {
      const items = item.sort((a, b) => a.code.slice(1) - b.code.slice(1));
      resItems.push({ key, items });
    });
    result.push({ key, items: resItems });
  });
  return result;
};
