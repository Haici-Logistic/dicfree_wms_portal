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
import hotkeys from 'hotkeys-js';

const UPLOAD_ACTION = 'https://admin.moban.work/weibo_api/interface/pic_upload.php';
const COS_BASE_URL = 'https://wms-dicfree-cn-1319335595.cos.ap-chengdu.myqcloud.com';
const IMG_BASE_URL = '/upload';
export const DEFAULT_REST_PASSWORD = '123456';
export const FORM_LAYOUT = [3, 21];
export const ID_NAME_PAIRS = { id: 'value', name: 'label' };
export const KV_NAME_PAIRS = { value: 'id', label: 'name' };

export const GLOBAL_FORM_PRESETS = {
  fields: {
    rawJSON: {
      label: 'Result',
      widget: 'ac:codeflask'
    },
    privilegeIdList: {
      label: 'Privilege',
      widget: 'ac:transfer',
      widgetProps: {
        height: 500
      }
    },
    roleIdList: {
      label: 'Role',
      widget: 'ac:select',
      multiple: true,
      widgetProps: {
        multiple: true
      }
    },
    imageArray: {
      label: 'Pictures',
      widget: 'ac:upload-picture-card',
      widgetProps: { action: UPLOAD_ACTION, multiple: true }
    },
    avatar: {
      label: 'Avatar',
      widget: 'ac:upload-picture',
      widgetProps: {
        transformResponse: (v) => v[0],
        transformURL: (pid) => `/upload/${pid}`,
        customRequest: async (option) => {
          const [err, res] = await nx.to(nx.$api.sys_upload({ file: option.file, actionName: 'sys-admin-users-add' }));
          option.onSuccess(res, option.file);
          option.onError(err, option.file);
        }
      }
    },
    username: {
      label: 'Username',
      required: true,
      tooltip: '确认后无法修改'
    },
    nickname: {
      label: 'Nickname'
    },
    password: {
      label: 'Password'
    }
  },
  widgets: {
    'ac:tree-select': {
      widgetProps: {
        treeDefaultExpandAll: true
      }
    },
    'ac:upload-picture': {
      widgetProps: {
        action: UPLOAD_ACTION,
        transformResponse: (v) => {
          return v.map((item) => item.pid)[0];
        }
      }
    },
    'ac:upload-picture-card': {
      widgetProps: {
        multiple: false,
        maxCount: 1
      }
    }
  }
};

export const toImg = (inPid) => {
  return `${IMG_BASE_URL}/${inPid}`;
};

export const toOssImg = (inPid) => {
  // https://wms-dicfree-cn-1319335595.cos.ap-chengdu.myqcloud.com/assets/images/
  return `${COS_BASE_URL}/assets/images/${inPid}`;
};

export const KB_ACTIONS = [
  {
    id: 'skus',
    icon: '📕',
    section: 'Skus',
    name: '01/Sku list',
    subtitle: 'Keywords: box-skus',
    shortcut: ['s'],
    keywords: 'box-skus',
    perform: () => {
      nx.$modal.present('sku-batch-create');
      nx.navigate('/admin/box-skus');
    }
  },
  {
    id: 'inbounds',
    icon: '🤖',
    section: 'Inbounds',
    name: '02/Inbound list',
    subtitle: 'Keywords: inbounds',
    shortcut: ['i'],
    keywords: 'inbounds',
    perform: () => {
      nx.$modal.dismissAll();
      nx.navigate('/admin/inbounds');
    }
  },
  {
    id: 'outbounds',
    icon: '🤖',
    section: 'Outbounds',
    name: '03/Outbound list',
    subtitle: 'Keywords: outbounds',
    shortcut: ['o'],
    keywords: 'outbounds',
    perform: () => {
      nx.$modal.dismissAll();
      nx.navigate('/admin/outbounds');
    }
  }
];

export const ERROR_MESSAGES = {
  defaults: 'Unknown Error'
};

export const PRINTER_STATUS = {
  ONLINE: {
    label: 'Online',
    color: 'green'
  },
  OFFLINE: {
    label: 'Offline',
    color: 'gray'
  },
  ERROR: {
    label: 'Error',
    color: 'orange'
  }
};

export const STOCKTAKE_TYPE = [
  { value: 'SUPPLIER_BOX_SN_CODE', label: 'SUPPLIER_BOX_SN_CODE' },
  { value: 'BOX_SN_CODE', label: 'BOX_SN_CODE' },
  { value: 'SUPPLIER_BOX_CODE', label: 'SUPPLIER_BOX_CODE' }
];

export const OUTBOUND_TYPE = [
  { value: 'BOX_SN_CODE', label: 'BOX_SN_CODE' },
  { value: 'BOX_SKU_CODE', label: 'BOX_SKU_CODE' },
  { value: 'SUPPLIER_BOX_CODE', label: 'SUPPLIER_BOX_CODE' }
];

// STRING/INTEGER/DATE/BOOLEAN
export const PARAM_TYPES = [
  { value: 'STRING', label: 'STRING' },
  { value: 'INTEGER', label: 'INTEGER' },
  { value: 'DATE', label: 'DATE' },
  { value: 'BOOLEAN', label: 'BOOLEAN' }
];

export const LOCALES = [
  { value: 'en-US', label: 'English' },
  { value: 'zh-CN', label: '中文' }
  // { value: 'ru-RU', label: 'Русский' }
];

export const COURIER_TYPES = [
  { value: 'C3X', label: 'C3X' },
  { value: 'LOGISTIQ', label: 'LOGISTIQ' },
  { value: 'QUARTER', label: 'QUARTER' }
];
