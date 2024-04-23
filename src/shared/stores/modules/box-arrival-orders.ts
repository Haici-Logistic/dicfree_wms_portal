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
import { parseLocationList } from '@/shared/helpers';

export default nx.$defineStore('boxArrivalOrders', {
  state: {
    currentId: null,
    currentPlanId: null,
    planList: [],
    activeLocKey: 'whole',
    wholeItems: [],
    bulkItems: [],
    locationList: []
  },
  getters: {
    activeLocItems(state) {
      const { activeLocKey, wholeItems, bulkItems } = state;
      return activeLocKey === 'whole' ? wholeItems : bulkItems;
    },
    groupedLocationList(state) {
      return parseLocationList(state.locationList);
    },
    selectedLocations(state) {
      return state.locationList.filter((item) => item.selected);
    },
    selectedPlan(state) {
      return state.planList.find((item) => item.id === state.currentPlanId);
    }
  },
  actions: {
    updateActiveItems(items) {
      const { activeLocKey } = this;
      this[`${activeLocKey}Items`] = items;
    }
  },
  watch: {
    currentPlanId(newValue, oldValue) {
      // console.log('currentPlanId/newValue:', newValue);
      this.locationList.forEach((item) => (item.selected = false));
      this.wholeItems = [];
      this.bulkItems = [];
      nx.$set('app.ts', Date.now());
    }
  }
});
