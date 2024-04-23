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
import ReactDOM from 'react-dom/client';
import StateProvider from '@jswork/react-tiny-state';
import { useRegisterSW } from 'virtual:pwa-register/react';
import App from '@/app';
import Provider from '@/shared/providers';
import VitePwaPromotion from '@jswork/vite-pwa-promotion';
import '@/assets/styles/index.scss';
import '@/shared/bootstrap';
import stores from '@/shared/stores';
import { worker } from '@/__mocks__/browser';

const element = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(element);
const env = import.meta.env;

// if (env.DEV) worker.start({ onUnhandledRequest: 'bypass' });

root.render(
  <Provider>
    <StateProvider store={stores}>
      <App />
    </StateProvider>
    <VitePwaPromotion useRegisterSW={useRegisterSW} />
  </Provider>
);
