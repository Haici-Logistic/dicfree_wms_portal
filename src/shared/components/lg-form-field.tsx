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
import React from 'react';
import { Form, Button, Input, Select } from 'antd';
import styled from 'styled-components';
import { AcSelect } from '@jswork/antd-components';

export const LgSelect = styled<any>(AcSelect)`
  font-size: 40px;
  min-width: 240px;
`;

export const LgInput = styled<any>(Input)`
  padding: 40px 20px;
  font-size: 60px;
  font-weight: 800;
`;

export const LgButton = styled<any>(Button)`
  &.ant-btn-lg {
    padding: 10px 120px;
    height: 100px;
    font-size: 40px;
  }
`;
