import { cache } from 'react';

/**
 * RESAS APIのレスポンス
 * https://opendata.resas-portal.go.jp/docs/api/v1/prefectures.html
 */
type Prefectures = {
  message: string | null;
  result: { prefCode: number; prefName: string }[];
};

/**
 * 型チェック
 * @param obj
 */
function validatePrefectures(obj: unknown): obj is Prefectures {
  const safeObj = obj as Prefectures;
  return (
    (typeof safeObj.message === 'string' || safeObj.message === null) &&
    Array.isArray(safeObj.result) &&
    safeObj.result.every(
      (item) =>
        typeof item.prefCode === 'number' && typeof item.prefName === 'string',
    )
  );
}

export const getPrefectures = cache(async () => {
  try {
    const res = await fetch(process.env.RESAS_API_URL + '/api/v1/prefectures', {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.RESAS_API_KEY,
      },
      next: {
        revalidate: 3600,
      },
    });
    const data = (await res.json()) as unknown;
    // 型チェック
    if (validatePrefectures(data)) {
      return data;
    } else {
      throw new Error('Type Error');
    }
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
});
