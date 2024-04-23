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
import Auth from './request/auth';
import BusError from './response/bus-error';
import Business from './response/business';
import jzyunqiInterceptors from '@jswork/jzyunqi-interceptors';
import createLoaingIntercepotrs from '@jswork/nprogress-interceptor';
import Kv from './response/kv';

const weappLoadingIntercepotrs = createLoaingIntercepotrs({});

export const interceptors = [
  { type: 'request', fn: Auth },
  { type: 'response', fn: BusError },
  { type: 'response', fn: Business },
  { type: 'response', fn: Kv },
  ...weappLoadingIntercepotrs,
  ...jzyunqiInterceptors
];
