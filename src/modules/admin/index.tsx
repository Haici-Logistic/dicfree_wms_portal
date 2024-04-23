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
import { TimelineX } from '@/shared/components/timeline-x';
import { Row, Space, Alert } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
  width: 80%;
  margin: 50px auto 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  > img {
    width: 200px;
  }

  > p {
    color: #999;
  }
`;

export default () => {
  const { t } = nx.$useIntl();

  return (
    <Container>
      <p className="text-5xl">⏰</p>
      <Alert message={nx.t('comming')} type="info" showIcon className="w-full m-4" />
      <table className="wsui-table w-full">
        <thead>
          <tr>
            <th>Shortcuts</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <kbd>alt</kbd> + <kbd>0</kbd>
            </td>
            <td>Navigate to dashboard</td>
          </tr>
          <tr>
            <td>
              <kbd>alt</kbd> + <kbd>1</kbd>
            </td>
            <td>Navigate to sku list</td>
          </tr>
          <tr>
            <td>
              <kbd>alt</kbd> + <kbd>2</kbd>
            </td>
            <td>Navigate to inbounds</td>
          </tr>
          <tr>
            <td>
              <kbd>alt</kbd> + <kbd>3</kbd>
            </td>
            <td>Navigate to outbounds</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
};
