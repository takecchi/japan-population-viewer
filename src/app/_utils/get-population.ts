import { cache } from 'react';
import { getPrefectures } from '@/app/_utils/get-prefectures';
import { getColor } from '@/app/_utils/color';

export type PopulationData = {
  years: number[];
  labels: string[];
  prefectures: {
    color: string;
    name: string;
    prefCode: string;
    data: { label: string; data: number[] }[];
  }[];
};

/**
 * RESAS APIのレスポンス
 * https://opendata.resas-portal.go.jp/docs/api/v1/population/composition/perYear.html
 */
type PerYear = {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: { year: number; value: number }[];
    }[];
  };
};

/**
 * 型チェック
 * 原則通る想定なので浅い比較のみ行う
 * @param obj
 * @throws Error
 */
function validatePerYear(obj: unknown): obj is PerYear {
  if (typeof obj !== 'object' || obj === null) {
    throw new Error('Invalid object.');
  }

  const safeObj = obj as PerYear;

  if (typeof safeObj.result !== 'object') {
    throw new Error('Invalid result.');
  }

  return true;
}

async function fetcher(
  prefCode: number,
): Promise<{ prefCode: number; data: PerYear }> {
  try {
    const res = await fetch(
      `${process.env.RESAS_API_URL}/api/v1/population/composition/perYear?prefCode=${prefCode}`,
      {
        method: 'GET',
        headers: {
          'X-API-KEY': process.env.RESAS_API_KEY,
        },
        next: {
          revalidate: 3600,
        },
      },
    );

    if (!res.ok) {
      throw new Error(`API request failed with status ${res.status}`);
    }

    const data = (await res.json()) as unknown;

    // 型チェック
    if (validatePerYear(data)) {
      return { prefCode, data };
    } else {
      throw new Error(`Type Error`);
    }
  } catch (error) {
    throw new Error(`Server Internal Error`);
  }
}

export const getPopulationData = cache(async (): Promise<PopulationData> => {
  // 全都道府県一覧を取得
  const prefectures = await getPrefectures();

  // 全年度のデータ取得
  const perYears = await Promise.all(
    prefectures.result.map((pref) => fetcher(pref.prefCode)),
  );

  // 年度の一覧を抽出し昇順で並び替え
  const years: number[] = Array.from(
    new Set(
      perYears.flatMap((response) =>
        response.data.result.data.flatMap((d) => d.data.map((dp) => dp.year)),
      ),
    ),
  ).sort((a, b) => a - b);

  // ラベルの一覧を抽出
  const labels: string[] = Array.from(
    new Set(
      perYears.flatMap((response) =>
        response.data.result.data.flatMap((d) => d.label),
      ),
    ),
  );

  // 都道府県のデータを整形
  const populationData: PopulationData = {
    years,
    labels,
    prefectures: prefectures.result.map((pref) => {
      // 年度一覧取得
      const perYear = perYears.find((res) => res.prefCode === pref.prefCode);

      // ラベルでグループ化
      const groupedData =
        perYear?.data.result.data.reduce(
          (acc, curr) => {
            acc[curr.label] = curr.data;
            return acc;
          },
          {} as { [key: string]: { year: number; value: number }[] },
        ) ?? {};

      // ラベル別に抽出
      const labelData = labels.map((label) => {
        // 年度別に抽出
        const data: number[] = years.map((year) => {
          const value = groupedData[label]?.find((d) => d.year === year);
          return value?.value ?? 0;
        });
        return { label: label, data: data };
      });

      return {
        color: getColor(pref.prefCode),
        name: pref.prefName,
        prefCode: `${pref.prefCode}`,
        data: labelData,
      };
    }),
  };

  return populationData;
});
