import { styled } from '@kuma-ui/core';

const Root = styled.div`
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
  border-radius: 6px;
  background-color: #f4f4f5;

  @keyframes pulse {
    50% {
      opacity: 0.5;
    }
  }
`;

type Props = {
  height?: string | number;
  width?: string | number;
};

export default function Skeleton({
  width = '100px',
  height = '1.5rem',
}: Props) {
  return <Root style={{ width, height }} />;
}
