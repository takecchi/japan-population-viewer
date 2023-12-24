import { styled } from '@kuma-ui/core';
import Paper from '@/app/_components/Paper';
import Title from '@/app/_components/Title';
import Prefectures from '@/app/_components/Prefectures';
import Graph from '@/app/_components/Graph';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  padding: 1rem;
  gap: 1rem;
  max-width: 1400px;
  margin: 0 auto;
`;

export default function Home() {
  return (
    <Main>
      <Paper>
        <Title title="都道府県" summary="都道府県を選択してください。" />
        <Prefectures />
      </Paper>
      <Paper>
        <Title
          title="人口推移グラフ"
          summary={'年数経過に伴う人口変化を示しています。'}
        />
        <Graph />
      </Paper>
    </Main>
  );
}
