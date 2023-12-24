import { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation';

const QUERY_KEY = 'p';

/**
 * 選択された都道府県番号一覧を返す
 * ※クライアントコンポーネントで使用
 * @param searchParams
 */
export function getPrefCodes(searchParams: ReadonlyURLSearchParams) {
  return searchParams.getAll(QUERY_KEY);
}

/**
 * 選択された都道府県番号一覧を返す
 * ※サーバーコンポーネントで使用
 * @param searchParams
 */
export function getPrefCodesByObject(searchParams: {
  [key: string]: string | string[] | undefined;
}) {
  const prefCodes = searchParams[QUERY_KEY];
  if (!prefCodes) {
    return [];
  }
  return Array.isArray(prefCodes) ? prefCodes : [prefCodes];
}

/**
 * クエリパラメータの形で返却する
 * ※ ?は付けません
 * @param prefCodes
 */
export function createQueryString(prefCodes: string[]): string {
  return prefCodes.map((code) => `${QUERY_KEY}=${code}`).join('&');
}
