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
export default {
  // productArrivalOrder
  // 未完成入库订单列表/ads/productArrivalOrder/undoList
  // 未完成入库订单产品统计/ads/productArrivalOrder/itemUndoCalcList
  // 已完成入库订单产品统计/ads/productArrivalOrder/itemDoneCalcList
  // 单个SKU下的SN批量打印/ads/productArrivalOrder/itemSnUndoPrint
  // 第三方（飞鹅）数据打印Open_printLabelMsg
  // Sn入库/ads/productArrivalOrder/snInbound
  // 产品未到货明细列表/ads/productArrivalOrder/itemSnUndoList

  product_arrival_orders_undo_list: ['post', '/ads/productArrivalOrder/undoList'],
  product_arrival_orders_undo_calc_list: [
    'post',
    '/ads/productArrivalOrder/itemUndoCalcList?id={id}'
  ],
  product_arrival_orders_done_calc_list: [
    'post',
    '/ads/productArrivalOrder/itemDoneCalcList?id={id}'
  ],
  product_arrival_orders_item_sn_undo_print: ['post', '/ads/productArrivalOrder/itemSnUndoPrint'],
  product_arrival_orders_item_sn_undo_list: ['post', '/ads/productArrivalOrder/itemSnUndoList'],
  product_printer_print: ['post', '/ads/productArrivalOrder/snInbound']
};
