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
  arrival_orders_index: ['post', '/ads/boxArrivalOrder/page'],
  arrival_orders_item_list: ['post', '/ads/boxArrivalOrder/itemList?id={id}'],
  box_arrival_orders_undo_list: ['post', '/ads/boxArrivalOrder/undoList'],
  arrival_orders_undo_calc_list: ['post', '/ads/boxArrivalOrder/itemUndoCalcList?id={id}'],
  arrival_orders_done_calc_list: ['post', '/ads/boxArrivalOrder/itemDoneCalcList?id={id}'],
  arrival_orders_item_sn_undo_list: ['post', '/ads/boxArrivalOrder/itemSnUndoList'],
  arrival_orders_item_sn_undo_print: ['post', '/ads/boxArrivalOrder/itemSnUndoPrint'],
  arrival_orders_box_sn_undo_print: ['post', '/ads/boxArrivalOrder/boxSnUndoPrint'],
  arrival_orders_item_sn_undo_print_all: ['post', '/ads/boxArrivalOrder/itemSnUndoPrintAll'],

  // box-arrival-orders-plan
  arrival_orders_location_list: ['post', '/common/wms/locationList'],
  arrival_orders_location_undo_list: ['post', '/ads/boxArrivalOrder/locationUndoList'],
  arrival_orders_location_lock: ['post', '/ads/boxArrivalOrder/locationLock']
};
