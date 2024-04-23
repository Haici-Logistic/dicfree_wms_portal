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
export default (opts) => {
  const { config, data } = opts;
  const { $name } = config;
  if ($name === 'skus_supplier_list') {
    data.data = data.data.map((item) => {
      return { value: item.supplier, label: item.supplier };
    });
  }

  if ($name === 'delivery_order_list') {
    data.data = nx.keyMap(data.data, {
      id: 'value',
      addressInfo: 'label'
    });
  }

  // und
  const arrival_orders_undo_list = [
    'box_arrival_orders_undo_list',
    'product_arrival_orders_undo_list',
    'arrival_orders_location_undo_list'
  ];
  if (arrival_orders_undo_list.includes($name)) {
    data.data = nx.keyMap(
      data.data,
      {
        id: 'value',
        thirdOrderNo: 'label'
      },
      true
    );
  }

  if ($name === 'collection_tasks_undo_list') {
    data.data = nx.keyMap(data.data, {
      id: 'value',
      collectionNo: 'label'
    });
  }
  return opts;
};
