import { styled } from '@kuma-ui/core';

const Root = styled.div`
  padding: 1.5rem;
`;

const H3 = styled.h3`
  line-height: 1;
  font-weight: 600;
  font-size: 1.5rem;
  margin: 0;
`;

const Summary = styled.p`
  margin: 0.375rem 0 0 0;
  color: #717175;
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

type Props = {
  title: string;
  summary?: string;
};

export default function Title({ title, summary }: Props) {
  return (
    <Root>
      <H3>{title}</H3>
      {summary && <Summary>{summary}</Summary>}
    </Root>
  );
}
