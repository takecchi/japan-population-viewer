import PrefGraph from '@/app/_components/client/PrefGraph';
import { getPopulationData } from '@/app/_utils/get-population';
import { styled } from '@kuma-ui/core';
import { Suspense } from 'react';
import Skeleton from '@/app/_components/Skeleton';

export const revalidate = 3600;

const ContentBody = styled.div`
  height: 450px;
  padding: 1.5rem;
`;

async function FetchedGraph() {
  const data = await getPopulationData();
  return <PrefGraph data={data} />;
}

export default function Graph() {
  return (
    <ContentBody>
      <Suspense fallback={<Skeleton height="100%" width="100%" />}>
        <FetchedGraph />
      </Suspense>
    </ContentBody>
  );
}
