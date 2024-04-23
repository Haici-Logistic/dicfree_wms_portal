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
import hotkeys from 'hotkeys-js';
import { useEffect } from 'react';

hotkeys.filter = function (event) {
  return true;
};

export const useHotKeys = () => {
  useEffect(() => {
    hotkeys('alt+0,alt+1,alt+2,alt+3', (e, handler) => {
      nx.$modal.dismissAll();

      switch (handler.key) {
        case 'alt+0':
          nx.navigate('/admin');
          break;
        case 'alt+1':
          nx.$modal.present('sku-batch-create');
          nx.navigate('/admin/skus');
          break;
        case 'alt+2':
          nx.navigate('/admin/inbounds');
          break;
        case 'alt+3':
          nx.navigate('/admin/outbounds');
          break;
      }
    });
  }, []);
};
