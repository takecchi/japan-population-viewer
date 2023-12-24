import { getPrefCodes, createQueryString } from './query-parameter';
import { ReadonlyURLSearchParams } from 'next/dist/client/components/navigation';

describe('query-parameter tests', () => {
  describe('getPrefCodes', () => {
    it('searchParamsから都道府県コードの配列を返却する', () => {
      const result = getPrefCodes({
        getAll: (v) => {
          if (v === 'p') {
            return ['1', '2', '3'];
          }
          return [];
        },
      } as ReadonlyURLSearchParams);
      expect(result).toEqual(['1', '2', '3']);
    });
  });

  describe('createQueryString', () => {
    it('都道府県コードの配列からクエリ文字列を作成', () => {
      const prefCodes = ['1', '2', '3'];
      const queryString = createQueryString(prefCodes);
      expect(queryString).toBe('p=1&p=2&p=3');
    });

    it('prefCodes配列が空の場合、空の文字列を返す', () => {
      const prefCodes: string[] = [];
      const queryString = createQueryString(prefCodes);
      expect(queryString).toBe('');
    });
  });
});
