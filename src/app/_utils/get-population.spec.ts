import { getPopulationData } from './get-population';
import { getPrefectures } from '@/app/_utils/get-prefectures';
import { getColor } from '@/app/_utils/color';

// getPrefectures関数のモック化
jest.mock('@/app/_utils/get-prefectures');

// fetch関数のモック化
global.fetch = jest.fn();

describe('getPopulationData', () => {
  beforeEach(() => {
    // 各テストの前にモックをクリアする
    jest.clearAllMocks();
  });

  it('fetchが成功した場合に総人口のデータが返却されること', async () => {
    // getPrefecturesのモックデータ
    (getPrefectures as jest.Mock).mockResolvedValue({
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ],
    });

    // 成功したレスポンスのモック
    (fetch as jest.Mock).mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          message: null,
          result: {
            boundaryYear: 2020,
            data: [
              {
                label: '総人口',
                data: [
                  { year: 2010, value: 1000 },
                  { year: 2020, value: 2000 },
                ],
              },
            ],
          },
        }),
    });

    // 実行結果の確認
    const populationData = await getPopulationData();
    expect(populationData).toEqual({
      years: [2010, 2020],
      prefectures: [
        {
          color: getColor(1),
          name: '北海道',
          prefCode: '1',
          data: [1000, 2000],
        },
        {
          color: getColor(2),
          name: '青森県',
          prefCode: '2',
          data: [1000, 2000],
        },
      ],
    });
  });
});
