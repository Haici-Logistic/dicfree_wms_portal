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
import { Form, Button, Input, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import printjs from 'print-js';
import { useQuery, useMutation } from '@tanstack/react-query';
import { LgInput, LgButton } from '@/shared/components/lg-form-field';
import { useStateProxy } from '@/shared/hooks/use-state-proxy';
import * as helpers from '@/shared/helpers';
import Header from './_header';

export default () => {
  // useForm
  const [form] = Form.useForm();
  const mainRef = useRef(null);
  const submitRef = useRef(null);
  const state = useStateProxy({ hasError: false, courier: null });
  const isWebPrint = nx.$get('app.isWebPrint');
  const mtSubmit = useMutation<any>((inValues) => nx.$api.product_delivery_orders_waybill_print(inValues));

  const reset = (force?) => {
    const shouldReset = force || !state.hasError;
    // set name to emtpy + focus
    shouldReset && form.setFieldValue('waybill', '');
    // focus name input
    mainRef.current.focus();
  };

  const handleFinish = async (e) => {
    await mtSubmit.mutateAsync(e);
    // await silencePrint(mtSubmit.data);
  };

  useEffect(() => {
    if (!mtSubmit.isSuccess) return;
    const { courier } = mtSubmit.data;
    const method = isWebPrint ? 'webPrint' : 'silencePrint';
    helpers[method](mtSubmit.data);
    state.courier = courier;
    if (courier) message.success(`Printed ${courier} waybill signal has been sent to printer.`);
    nx.npdone();
    reset();
  }, [mtSubmit.isSuccess, mtSubmit.data]);

  return (
    <div className="border rounded">
      <Header label={state.courier} />

      <section className="rounded-md bg-slate-100 p-5">
        <Form layout="vertical" form={form} onFinish={handleFinish}>
          <Form.Item name="waybill" required>
            <LgInput autoFocus ref={mainRef} autoComplete="off" size="large" type="text" placeholder="Enter" />
          </Form.Item>
          <div className="flex justify-start gap-[20px] mt-8">
            <LgButton
              ref={submitRef}
              disabled={mtSubmit.isLoading}
              loading={mtSubmit.isLoading}
              size="large"
              type="primary"
              htmlType="submit">
              Print
            </LgButton>
            <LgButton size="large" onClick={() => reset(true)}>
              Clear
            </LgButton>
          </div>
        </Form>
      </section>
    </div>
  );
};
