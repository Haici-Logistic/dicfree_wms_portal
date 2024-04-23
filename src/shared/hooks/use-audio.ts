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
import useSound from 'use-sound';
import inboundOk from '@/assets/audios/inbound_ok.mp3?url';
import inboundFail from '@/assets/audios/inbound_fail.mp3?url';
import outboundOk from '@/assets/audios/outbound_ok.mp3?url';
import outboundFail from '@/assets/audios/outbound_fail.mp3?url';
import { useEffect } from 'react';

const resources = {
  inboundOk,
  inboundFail,
  outboundOk,
  outboundFail
};

export const useAudio = () => {
  const [playInboundOk] = useSound(resources.inboundOk);
  const [playInboundFail] = useSound(resources.inboundFail);
  const [playOutboundOk] = useSound(resources.outboundOk);
  const [playOutboundFail] = useSound(resources.outboundFail);

  useEffect(() => {
    const res = nx.$event.on('audio', (e) => {
      switch (e) {
        case 'inbound.ok':
          playInboundOk();
          break;
        case 'inbound.fail':
          playInboundFail();
          break;
        case 'outbound.ok':
          playOutboundOk();
          break;
        case 'outbound.fail':
          playOutboundFail();
          break;
      }
    });
    return res.destroy;
  });
};
