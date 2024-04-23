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
interface NxStatic {
  $root: $;
  $api: any;
  $local: any;
  $session: any;
  $event: any;
  $client: any;
  $invalidQuery: any;
  $modal: any;
  $useIntl: import('react-i18next').useTranslation;
  navigate: NavigateFunction;
  LocalStorage: any;
  i18n: import('i18next').i18n;
  t: any;
  npdone: () => void;
  ife: any;
  rsm: any;
  rcm: any;
}

type KeyIsString = Record<string, any>;

declare const process;
