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
import '@jswork/next-admin-kits';
import dayjs from 'dayjs';
import * as AcComponents from '@jswork/antd-components';
import { QueryClient } from '@tanstack/react-query';
import { installWidgets } from '@jswork/antd-form-builder';
import ife from '@jswork/react-if-else';
import rsm from '@jswork/react-status-manager';
import rcm from '@jswork/react-condition-manager';

// next packages
import '@jswork/next-toggle';
import '@jswork/next-toggle-to';

import '@/shared/services/api';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
      staleTime: 60 * 1000,
      retry: 0
    }
  }
});

const invalidQuery = (key) => {
  queryClient.invalidateQueries({
    queryKey: [key]
  });
};

// set defaults
installWidgets(AcComponents);
AcComponents.AcDatePicker.defaultProps.dayjs = dayjs;

nx.AdminKits.create({ prefix: location.host });
nx.sets({ $client: queryClient, $invalidQuery: invalidQuery });
nx.npdone = window['NProgress'].done.bind(window['NProgress']);

nx.sets({ ife, rsm, rcm });
