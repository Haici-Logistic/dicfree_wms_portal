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
import { Form, Button, Input } from 'antd';
import { useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { STOCKTAKE_TYPE } from '@/shared/constants';
import { useStateProxy } from '@/shared/hooks/use-state-proxy';
import { LgSelect, LgInput, LgButton } from '@/shared/components/lg-form-field';
import Header from './_header';
import DataList from './_data-list';

export default () => {
  // useForm
  const { session } = nx.$use('auth');
  const { id } = nx.$use('boxInbound');
  const [form] = Form.useForm();
  const mainRef = useRef(null);
  const mtPrint = useMutation<any>({ mutationFn: nx.$api.printer_print });
  const qyAvUndoList = useQuery(
    ['box_arrival_orders_undo_list', session, id],
    () => nx.$api.box_arrival_orders_undo_list(),
    {
      // when success
      onSuccess: (data) => {
        const first = data[0];
        if (first && !id) nx.$set('boxInbound.id', first.value);
      }
    }
  );
  const initType = STOCKTAKE_TYPE[0].value;
  const initialValues = { type: initType };
  const state = useStateProxy({ type: initType, hasError: false });

  const reset = (force?) => {
    const shouldReset = !state.hasError || force;
    shouldReset && form.setFieldValue('first', '');
    force && (state.hasError = false);
    mainRef.current.focus();
  };

  const handleFinish = async (e) => {
    // todo: err/ok 应该分开
    const res = await mtPrint.mutateAsync({ ...e, id });
    const hasError = !!res?.errorCode;
    const status = hasError ? 'fail' : 'ok';
    nx.$event.emit('audio', `inbound.${status}`);
    if (!hasError) nx.$call('app.updateTs');
    state.hasError = hasError;
    reset();
  };

  return (
    <div className="border rounded">
      <Header id={id} />
      <section className="rounded-md bg-slate-100 p-5">
        <Form layout="vertical" form={form} initialValues={initialValues} onFinish={handleFinish}>
          <div className="flex gap-2">
            <Form.Item name="id">
              {id && (
                <LgSelect
                  defaultValue={id}
                  onChange={(e) => {
                    nx.$set('boxInbound.id', e.target.value);
                  }}
                  options={qyAvUndoList.data}
                  size="large"
                  placeholder="Please select"
                />
              )}
            </Form.Item>
            <Form.Item name="type">
              <LgSelect
                onChange={(e) => {
                  state.type = e.target.value;
                }}
                items={STOCKTAKE_TYPE}
                size="large"
                placeholder="Please select"
              />
            </Form.Item>
          </div>
          <div className="gap-2">
            <Form.Item name="first" validateStatus={state.hasError && 'error'}>
              <LgInput
                autoFocus
                ref={mainRef}
                autoComplete="off"
                size="large"
                type="text"
                placeholder="Enter"
                onChange={() => (state.hasError = false)}
              />
            </Form.Item>
            {state.type === 'SUPPLIER_BOX_CODE' && (
              <Form.Item name="second">
                <LgInput
                  autoComplete="off"
                  size="large"
                  type="text"
                  placeholder="Extend infomation"
                />
              </Form.Item>
            )}
          </div>
          <div className="flex justify-start gap-[20px] mt-8">
            <LgButton
              disabled={mtPrint.isLoading}
              loading={mtPrint.isLoading}
              size="large"
              type="primary"
              htmlType="submit">
              Print
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
