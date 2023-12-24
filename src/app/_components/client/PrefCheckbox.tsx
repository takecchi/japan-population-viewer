'use client';

import Checkbox from '@/app/_components/Checkbox';
import { useRouter, useSearchParams } from 'next/navigation';
import { createQueryString, getPrefCodes } from '@/app/_utils/query-parameter';

type Props = {
  label: string;
  prefCode: string;
};

export default function PrefCheckbox({ label, prefCode }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const prefCodes = getPrefCodes(searchParams);
  const checked = prefCodes.includes(prefCode);

  return (
    <Checkbox
      label={label}
      checked={checked}
      onChange={(event) => {
        let updatedPrefCodes;
        if (event.target.checked) {
          // チェックされた場合、prefCode を追加
          updatedPrefCodes = [...prefCodes, prefCode];
        } else {
          // チェックが外された場合、prefCode を削除
          updatedPrefCodes = prefCodes.filter((code) => code !== prefCode);
        }
        router.push(`?${createQueryString(updatedPrefCodes)}`);
      }}
    />
  );
}
