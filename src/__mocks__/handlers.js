import { rest } from 'msw';

export const handlers = [
  rest.post('/api/self/collectionTask/page', (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          rows: [
            { id: 1, date: '2023-09-01', collectionNo: '123456', undo: 4, total: 10 },
            { id: 2, date: '2023-09-02', collectionNo: '123456', undo: 10, total: 20 }
          ],
          total: 10
        }
      })
    );
  }),
  rest.post('/api/common/wms/deliveryTo/list', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          { code: 1, name: 'deliveryTo1' },
          { code: 2, name: 'deliveryTo2' },
          { code: 3, name: 'deliveryTo3' },
          { code: 4, name: 'deliveryTo4' },
          { code: 5, name: 'deliveryTo5' },
          { code: 6, name: 'deliveryTo6' }
        ]
      })
    );
  })
];
