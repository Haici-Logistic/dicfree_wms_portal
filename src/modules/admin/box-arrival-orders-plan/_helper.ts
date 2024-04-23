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
export const getModalColor = (model: Item) => {
  // cbmSurplus = 0; 则显示为灰色(gray)，表示库位已经被占据，不可用；(disabled)
  // 如果CBM(Plan)=CBM(Surplus)，且boxArriverlOrderNo≠空值，显示为橙色(orange)，表示该库位已规划，但未履约，不可用；(disabled)
  // 如果CBM(Plan)=CBM(Surplus)，且boxArriverlOrderNo=空值，则显示为绿色(green)，表示该库位可用

  //   if  boxArriverlOrderNo ！= null   橙色
  // else
  //     if cbmSurplus = 0  灰色
  //     else   绿色

  const { cbmSurplus, arriverOrderNo } = model;
  if (arriverOrderNo) return 'orange';
  if (parseInt(cbmSurplus) === 0) return 'gray';
  return 'green';
};
