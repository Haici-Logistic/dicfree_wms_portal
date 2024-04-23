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
import { useNavigate, useRoutes } from 'react-router-dom';
import routes from '@/modules/routes';
import { LocaleProvider } from '@jswork/react-ant-i18n';
import { useTokenCheck } from './shared/hooks/use-token-check';

function App() {
  const navigate = useNavigate();
  nx.set(nx, 'navigate', navigate);
  useTokenCheck();
  return useRoutes(routes);
}

function AppProvider() {
  const lng = nx.$get('app.language');

  return (
    <LocaleProvider harmony options={{ debug: false, lng }} onInit={(opts) => nx.mix(nx, opts)}>
      <App />
    </LocaleProvider>
  );
}

export default AppProvider;
