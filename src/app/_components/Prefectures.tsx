import { styled } from '@kuma-ui/core';
import { Suspense } from 'react';
import Skeleton from '@/app/_components/Skeleton';
import { getPrefectures } from '@/app/_utils/get-prefectures';
import PrefCheckbox from '@/app/_components/client/PrefCheckbox';

const ContentBody = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-gap: 0.5rem;
  padding-bottom: 1.5rem;
  padding-left: 1.5rem;
  padding-right: 1.5rem;
`;

async function Checkboxes() {
  const data = await getPrefectures();
  return (
    <>
      {data.result.map((pref) => {
        return (
          <PrefCheckbox
            label={pref.prefName}
            key={pref.prefCode}
            prefCode={`${pref.prefCode}`}
          />
        );
      })}
    </>
  );
}

function Skeletons() {
  return (
    <>
      {Array.from({ length: 47 }, (_, index) => (
        <Skeleton key={index} width={105} height={32} />
      ))}
    </>
  );
}

export const revalidate = 3600;

export default function Prefectures() {
  return (
    <ContentBody>
      <Suspense fallback={<Skeletons />}>
        <Checkboxes />
      </Suspense>
    </ContentBody>
  );
}
