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
import { Button, Space, Tag, Spin, Switch, Tooltip } from 'antd';

export default (props) => {
  const { label } = props;
  const isWebPrint = nx.$use('app.isWebPrint');

  return (
    <nav className="flex p-3 rounded-md bg-slate-200 items-center justify-between mb-2">
      <span>Courier: {label}</span>
      <Space>
        <a href="/web-assets/files/SilencePrintAgent.zip" download>
          🔗 SilencePrintAgent.zip
        </a>
        <Tooltip title="Use web print for manual printing">
          <Switch
            checked={isWebPrint}
            onChange={(e) => {
              nx.$set('app.isWebPrint', e);
            }}
          />
        </Tooltip>
      </Space>
    </nav>
  );
};
