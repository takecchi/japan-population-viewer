import { getPrefectures } from './get-prefectures';

// fetch関数のモック化
global.fetch = jest.fn();

describe('getPrefectures', () => {
  beforeEach(() => {
    // 各テストの前にfetchモックをクリアする
    (fetch as jest.Mock).mockClear();
  });

  it('fetchが成功した場合に都道府県のデータが返却されること', async () => {
    // 成功したレスポンスのモック
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          message: null,
          result: [
            { prefCode: 1, prefName: '北海道' },
            { prefCode: 2, prefName: '青森県' },
          ],
        }),
    });

    const prefectures = await getPrefectures();
    expect(prefectures).toEqual({
      message: null,
      result: [
        { prefCode: 1, prefName: '北海道' },
        { prefCode: 2, prefName: '青森県' },
      ],
    });
  });

  it('404が返却された場合、エラーがスローされて落ちること', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404,
    });

    await expect(getPrefectures).rejects.toThrow('Failed to fetch data');
  });

  it('不正なデータが返却された場合、エラーがスローされて落ちること', async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          /* 不正なデータを返却 */
        }),
    });

    await expect(getPrefectures).rejects.toThrow('Failed to fetch data');
  });
});
