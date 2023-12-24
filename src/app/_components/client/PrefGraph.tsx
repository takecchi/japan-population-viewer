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

export const revalidate = 3600;

export default function PrefGraph({
  data: populationData,
}: {
  data: PopulationData;
}) {
  const searchParams = useSearchParams();
  const prefCodes = getPrefCodes(searchParams);

  // 現在選択中の都道府県で絞り込み
  const filtered = populationData.prefectures.filter((pref) =>
    prefCodes.includes(pref.prefCode),
  );

  // rechartsのdata形式に変換
  const data = populationData.years.map((year) => {
    // 年を初期値として設定
    const yearData: { year: number; [key: string]: number } = { year };

    // 選択された都道府県ごとにその年のデータを追加
    filtered.forEach((pref) => {
      yearData[pref.name] = pref.data[populationData.years.indexOf(year)];
    });

    return yearData;
  });

  return (
    <div style={{ height: '450px', padding: '1.5rem' }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={400}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
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
  );
}
