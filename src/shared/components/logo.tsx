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
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ImgLogo from '@/assets/images/yahbb_logo_rect.png';

const Container = styled.div`
  border-bottom: 1px dashed #fff;

  > figure {
    &[data-collapsed='true'] {
      width: 52px;
    }

    &[data-collapsed='false'] {
      width: 180px;
    }
  }
`;

export const Logo = () => {
  const { collapsed } = nx.$use('layout');

  return (
    <Container className="logo flex justify-center py-3">
      <figure
        data-collapsed={collapsed}
        className={`wrapper rounded h-[60px] overflow-hidden transition-all`}>
        <Link to="/admin">
          <img alt="" referrerPolicy="no-referrer" src={ImgLogo} width={180} className="bg-white" />
        </Link>
      </figure>
    </Container>
  );
};
