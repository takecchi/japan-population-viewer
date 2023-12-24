import PrefGraph from '@/app/_components/client/PrefGraph';
import { getPopulationData } from '@/app/_utils/get-population';

export const revalidate = 3600;

export default async function Graph() {
  const data = await getPopulationData();
  return <PrefGraph data={data} />;
}
