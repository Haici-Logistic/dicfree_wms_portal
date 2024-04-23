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
import { useState, useMemo } from 'react';

function observer(initialVal, cb) {
  if (typeof initialVal !== 'object') return initialVal;
  if (!nx.isPlainObject(initialVal)) return initialVal;

  return new Proxy(initialVal, {
    get(target, key, receiver) {
      const res = Reflect.get(target, key, receiver);
      return typeof res === 'object' ? observer(res, cb) : res;
    },
    set(target, key, val) {
      cb();
      return Reflect.set(target, key, val);
    }
  });
}

function useStateProxyFn<S extends object>(initialState: S): S {
  const [observerState, setObserverState] = useState<S>(initialState);

  let state = useMemo(() => {
    return observer(observerState, () => {
      setObserverState({ ...observerState });
    });
  }, []);

  return state;
}

export const useStateProxy = useStateProxyFn;
