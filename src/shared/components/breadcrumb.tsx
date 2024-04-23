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
import ReactBreadcrumb from '@jswork/react-breadcrumb';
import useBreadcrumbs from 'use-react-router-breadcrumbs';
import { HomeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { Space } from 'antd';

const FILTERED_PATHS = ['/modules', '/edit', '/add', '/show'];
const getValidBreadcrumb = (inItems) => {
  return inItems.filter((item) => !FILTERED_PATHS.some((path) => item.key.endsWith(path))).slice(1);
};

export const Breadcrumbs = () => {
  const items = getValidBreadcrumb(useBreadcrumbs());
  const template = ({ item, plain }, cb) => {
    const { key, breadcrumb } = item;
    if (plain) return breadcrumb;
    return (
      <Link key={key} to={key} className="is-item">
        {breadcrumb}
        {cb()}
      </Link>
    );
  };

  return (
    <Space>
      <HomeOutlined />
      <section className="is-right">
        <ReactBreadcrumb items={items} template={template} separator="/" />
      </section>
    </Space>
  );
};
