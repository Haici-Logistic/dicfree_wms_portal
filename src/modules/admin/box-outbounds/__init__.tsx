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
import { Form, Button, Input, Select } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { OUTBOUND_TYPE } from '@/shared/constants';
import { LgSelect, LgInput, LgButton } from '@/shared/components/lg-form-field';
import { useStateProxy } from '@/shared/hooks/use-state-proxy';
import Header from './_header';
import DataList from './_data-list';
import { useForm } from 'antd/es/form/Form';

export default () => {
  // useForm
  const [form] = Form.useForm();
  const { session } = nx.$use('auth');
  const { ts } = nx.$use('app');
  const { id } = nx.$use('outbound');
  const mainRef = useRef(null);
  const extRef = useRef(null);
  const submitRef = useRef(null);
  const mtOutbound = useMutation((inValues) => nx.$api.skus_outbound(inValues));
  const qyAvUndoList = useQuery(
    ['collection_tasks_undo_list', session, ts],
    () => nx.$api.collection_tasks_undo_list(),
    {
      // when success
      onSuccess: (data) => {
        const first = data[0];
        if (first && !id) nx.$set('outbound.id', first.value);
      }
    }
  );
  const initType = OUTBOUND_TYPE[0].value;
  const initialValues = { type: initType };
  const state = useStateProxy({ type: initType, first: '', hasError: false, id: null });
  const hasExtCode = state.type === 'SUPPLIER_BOX_CODE';
  const queryKeys = ['skus_supplier_list', state.type, state.first];
  const qyOptions = useQuery(queryKeys, () =>
    hasExtCode && !!state.first ? nx.$api.skus_supplier_list({ supplierBoxCode: state.first }) : []
  );

  const reset = (force?) => {
    const shouldReset = force || !state.hasError;
    // set name to emtpy + focus
    shouldReset && form.setFieldValue('first', '');
    // focus name input
    mainRef.current.focus();
  };

  const handleFinish = async (e) => {
    const res = await mtOutbound.mutateAsync({ ...e, id });
    const hasError = !!nx.get(res, 'errorCode');
    const status = hasError ? 'fail' : 'ok';
    state.hasError = hasError;
    nx.$event.emit('audio', `outbound.${status}`);
    if (!hasError) nx.$call('app.updateTs');
    reset();
  };

  useEffect(() => {
    const items = qyOptions.data || [];
    const length = items.length;
    if (length === 1) {
      form.setFieldValue('second', items[0].value);
      submitRef.current.focus();
    }
  }, [qyOptions.data, state.type, state.hasError]);

  useEffect(() => {
    form.setFieldValue('id', id);
  }, [id]);

  return (
    <div className="border rounded">
      <Header id={id} />

      <section className="rounded-md bg-slate-100 p-5">
        <Form layout="vertical" form={form} initialValues={initialValues} onFinish={handleFinish}>
          <div className="flex gap-2">
            <Form.Item name="id">
              <LgSelect
                onChange={(e) => nx.$set('outbound.id', e.target.value)}
                loading={!id}
                allowClear
                items={qyAvUndoList.data}
                size="large"
                placeholder="Please select"
              />
            </Form.Item>
            <Form.Item name="type">
              <LgSelect
                onChange={(e) => {
                  state.type = e.target.value;
                }}
                options={OUTBOUND_TYPE}
                size="large"
                placeholder="Please select"
              />
            </Form.Item>
          </div>
          <div className="gap-2">
            <Form.Item name="first">
              <LgInput
                autoFocus
                onBlur={(e) => {
                  state.first = e.target.value;
                  qyOptions.refetch();
                }}
                ref={mainRef}
                autoComplete="off"
                size="large"
                type="text"
                placeholder="Enter"
              />
            </Form.Item>
            {hasExtCode && (
              <Form.Item name="second" validateStatus={state.hasError && 'error'}>
                <LgSelect ref={extRef} options={qyOptions.data} size="large" placeholder="Please select" />
              </Form.Item>
            )}
          </div>
          <div className="flex justify-start gap-[20px] mt-8">
            <LgButton
              ref={submitRef}
              disabled={mtOutbound.isLoading}
              loading={mtOutbound.isLoading}
              size="large"
              type="primary"
              htmlType="submit">
              Outbound
            </LgButton>
            <LgButton size="large" onClick={() => reset(true)}>
              Reset
            </LgButton>
          </div>
        </Form>
      </section>

      <DataList id={id} />
    </div>
  );
};
