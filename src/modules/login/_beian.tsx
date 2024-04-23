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
import styled from 'styled-components';

const Container = styled.div`
  width: 500px;
  margin: 0 auto;
  padding: 20px 0;
  z-index: 10;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translate(-50%, 10px);
  display: flex;
  align-items: center;
  font-size: 14px;
  > * {
    margin-left: 10px;
  }
  a {
    color: #ccc;
    text-decoration: underline;
  }
`;

export default () => {
  return (
    <Container>
      <img
        className="rounded-sm"
        src="https://tva1.js.work/large/da432263gy1hh6efsdgjmj200k00k0mz.jpg"
      />
      <a
        target="_blank"
        href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=42018502006847">
        鄂公网安备 42018502006847号
      </a>
      <a target="_blank" href="https://beian.miit.gov.cn/#/home">
        鄂ICP备2023013823号-1
      </a>
    </Container>
  );
};
