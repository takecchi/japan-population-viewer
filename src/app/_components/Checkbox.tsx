import { styled } from '@kuma-ui/core';
import { ChangeEvent, useId } from 'react';

const Root = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 0.25rem;
`;

const Input = styled.input`
  appearance: none;
  margin: 0;

  border-radius: 0.25rem;
  width: 1.25rem;
  height: 1.25rem;

  background-color: #fbfcfe;
  border: 1px solid #cdd7e1;
  cursor: pointer;
  position: relative;

  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }

  &:checked {
    background-color: #007bff;
    border-color: #007bff;

    &:after {
      content: '✔';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: white;
      font-size: 0.9rem;
    }
  }
`;

const Label = styled.label`
  user-select: none;
  font-size: 1rem;
  cursor: pointer;
  margin-left: 0.5rem;
  line-height: 1.5rem;
`;

type Props = {
  checked?: boolean;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  label?: string;
};

export default function Checkbox({ checked, label, onChange }: Props) {
  const id = useId();
  return (
    <Root>
      <Input id={id} type={'checkbox'} checked={checked} onChange={onChange} />
      {label && <Label htmlFor={id}>{label}</Label>}
    </Root>
  );
}
