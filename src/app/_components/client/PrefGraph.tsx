'use client';

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PopulationData } from '@/app/_utils/get-population';
import { useSearchParams } from 'next/navigation';
import { getPrefCodes } from '@/app/_utils/query-parameter';
import { css } from '@kuma-ui/core';
import Select from '@/app/_components/Select';
import { useState } from 'react';

export const revalidate = 3600;

export default function PrefGraph({
  data: populationData,
}: {
  data: PopulationData;
}) {
  const searchParams = useSearchParams();
  const [selectedLabel, setLabel] = useState<string>('総人口');

  const prefCodes = getPrefCodes(searchParams);

  // 現在選択中の都道府県で絞り込み
  const filtered = populationData.prefectures.filter((pref) =>
    prefCodes.includes(pref.prefCode),
  );

  // rechartsのdata形式に変換
  const data = populationData.years.map((year, index) => {
    // 年を初期値として設定
    const yearData: { year: number; [key: string]: number | null } = { year };

    // 選択された都道府県ごとにその年のデータを追加
    filtered.forEach((pref) => {
      yearData[pref.name] =
        pref.data.find((d) => d.label === selectedLabel)?.data[index] ?? null;
    });

    return yearData;
  });

  return (
    <>
      <Select
        value={selectedLabel}
        options={populationData.labels.map((label) => {
          return {
            value: label,
          };
        })}
        onChange={(event) => {
          setLabel(event.target.value);
        }}
      />
      <div style={{ height: '450px', paddingTop: '1.5rem' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: 30,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" unit={'年'} />
            <YAxis tickFormatter={(value: number) => value.toLocaleString()} />
            <Tooltip
              wrapperClassName={css`
                > ul {
                  max-height: 400px;
                  display: flex;
                  flex-direction: column;
                  font-size: 0.75rem;
                  flex-wrap: wrap;
                }
              `}
              labelFormatter={(value: number) => `${value}年`}
              formatter={(value: number) => `${value.toLocaleString()}人`}
            />
            <Legend />
            {filtered.map((pref) => (
              <Line
                type="monotone"
                key={pref.prefCode}
                dataKey={pref.name}
                stroke={pref.color}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </>
  );
}
