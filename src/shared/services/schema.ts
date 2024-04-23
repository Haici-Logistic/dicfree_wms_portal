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
import productArrivalOrders from './modules/product-arrival-orders';
import boxArrivalOrders from './modules/box-arrival-orders';
import collectionTasks from './modules/collection-tasks';
import users from './modules/users';
import roles from './modules/roles';
import params from './modules/params';

export default {
  request: ['/api', 'urlencoded'],
  items: [
    {
      items: {
        // auth
        login: ['post', '/sso/admin/login'],
        logout: ['post', '/sso/admin/logout'],
        profile: ['post', '/self/profile/loginInfo'],
        password_reset: ['post', '/self/password/reset'],
        menu: ['post', '/self/menu'],

        users_index: ['post', '/ads/adminUser/page'],
        users_reset_pwd: ['post', '/ads/user/password/reset'],

        // /ads/resource/privilege/list
        privileges_list: ['post', '/ads/resource/privilege/list'],

        // - SKU批量导入
        skus_inbound_batch: ['post', '/ads/boxSku/addBatch'],
        // SKU批量修改
        skus_edit_batch: ['post', '/ads/boxSku/editBatch'],
        // 导出当前新增的数据
        skus_latest_download: ['post', '/ads/boxSku/download'],
        // 导出全量数据
        skus_fulldata_download: ['post', '/ads/boxSku/downloadAll'],
        // SKU列表
        box_skus_index: ['post', '/ads/boxSku/page'],
        box_sns_index: ['post', '/ads/boxSn/page'],
        // - SKU出库
        skus_outbound: ['post', '/ads/collectionTask/snOutbound'],

        // 打印标签
        printer_print: ['post', '/ads/boxArrivalOrder/snInbound'],
        printer_info: ['post', '/ads/devicePrinter/info'],

        // 查询客户
        skus_supplier_list: ['post', '/ads/boxSku/supplierList'],
        // 目的地列表
        delivery_to_list: ['post', '/ads/boxDeliveryOrder/undoDeliveryToList'],
        // 查询目的地出库订单列表 (按照目的地查询)
        delivery_order_list: ['post', '/ads/boxDeliveryOrder/undoList'],

        member_product_delivery_orders_index: ['post', '/self/productDeliveryOrder/page'],
        member_product_delivery_orders_destroy: ['post', '/self/productDeliveryOrder/delete'],
        member_product_delivery_orders_upload: ['post', '/self/productDeliveryOrder/addBatch'],
        member_product_delivery_orders_trace: ['post', '/self/productDeliveryOrder/trace?id={id}'],

        product_delivery_orders_index: ['post', '/ads/productDeliveryOrder/page'],
        product_delivery_orders_dispatch: ['post', '/ads/productDeliveryOrder/dispatch'],
        product_delivery_orders_dispatch_batch: ['post', '/ads/productDeliveryOrder/dispatchBatch'],
        // product-outbounds-verify
        product_delivery_orders_info: ['post', '/ads/productDeliveryOrder/info?waybill={waybill}'],
        product_delivery_orders_item_undo_calc_list: ['post', '/ads/productDeliveryOrder/itemUndoCalcList?id={id}'],
        product_delivery_orders_item_done_calc_list: ['post', '/ads/productDeliveryOrder/itemDoneCalcList?id={id}'],
        product_delivery_orders_item_sn_undo_list: ['post', '/ads/productDeliveryOrder/itemSnUndoList'],
        product_delivery_orders_sn_verify: ['post', '/ads/productDeliveryOrder/snVerify'],
        product_delivery_orders_trace: ['post', '/ads/productDeliveryOrder/trace?id={id}'],
        product_delivery_orders_waybill_print: ['post', '/ads/productDeliveryOrder/waybillPrint'],

        // /admin/product-outbounds-sorting
        product_wave_task_info: ['post', '/ads/productWaveTask/info'], // uniqueNo
        product_wave_task_item_undo_calc_list: ['post', '/ads/productWaveTask/orderUndoCalcList?id={id}'],
        product_wave_task_item_done_calc_list: ['post', '/ads/productWaveTask/orderDoneCalcList?id={id}'],
        product_wave_task_item_sn_undo_list: ['post', '/ads/productWaveTask/orderSnUndoList'],
        product_wave_task_sn_sorting: ['post', '/ads/productWaveTask/snSorting'],

        // 查询集货列表
        ...collectionTasks,
        ...boxArrivalOrders,
        ...productArrivalOrders
      }
    },
    {
      request: ['/api', 'json'],
      items: {
        // users
        ...users,
        ...roles,
        ...params,

        // /ads/resource/privilege/list
        privileges_create: ['post', '/ads/resource/privilege/add'],

        // printer
        printer_bind: ['post', '/ads/devicePrinter/bind'],
        pda_bind: ['post', '/ads/devicePda/bind'],
        // 打印机状态查询
        printer_status: ['post', '/ads/devicePrinter/status'],
        // 打印机状态清空
        printer_status_clear: ['post', '/ads/devicePrinter/clear'],
        collection_tasks_create: ['post', '/ads/collectionTask/add'],
        collection_tasks_update: ['post', '/ads/collectionTask/edit']
      }
    },
    {
      request: ['/api', 'multipart'],
      items: {
        // system
        sys_upload: ['post', '/common/oss/upload']
      }
    }
  ]
};
