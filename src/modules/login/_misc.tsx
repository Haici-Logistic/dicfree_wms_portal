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
import { toOssImg } from '@/shared/constants';
import styled, { css } from 'styled-components';
import ImgLogo from '@/assets/images/yahbb_square.png';

export const Container = styled.section`
  .ant-form {
    user-select: none;
    width: 500px;
    padding: 20px;
    border-radius: 5px;
    background: #fff;
    box-shadow: rgb(0 0 0 / 16%) 0 3px 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -62.5%);
  }
`;

const StyledImg = styled.img`
  width: 160px;
`;

export const header = (
  <header className="text-center relative z-10 rounded overflow-hidden">
    <StyledImg src={ImgLogo} alt="logo child" />
  </header>
);
