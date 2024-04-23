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
  users_show: ['post', '/ads/adminUser/editInit?id={id}'],
  users_create: ['post', '/ads/adminUser/add'],
  users_update: ['post', '/ads/adminUser/edit'],
  users_destroy: ['post', '/ads/adminUser/delete?id={id}'],
  users_enable: ['post', '/ads/user/enable?id={id}'],
  users_disable: ['post', '/ads/user/disable?id={id}']
};
