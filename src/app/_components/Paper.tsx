import { ReactNode } from 'react';
import { styled } from '@kuma-ui/core';

const Root = styled.div`
  border-width: 1px;
  border-radius: 6px;
  border-style: solid;
  border-color: #e5e7eb;
  background-color: white;
`;

type Props = {
  children?: ReactNode;
};

export default function Paper({ children }: Props) {
  return <Root>{children}</Root>;
}
