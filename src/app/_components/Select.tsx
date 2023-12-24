import { styled } from '@kuma-ui/core';
import { ChangeEvent } from 'react';

const StyledSelect = styled.select`
  padding: 0.5rem;
  border-width: 1px;
  border-radius: 0.25rem;
  border-style: solid;
  border-color: #e5e7eb;
  background-color: white;
  outline: none;

  &:focus-visible,
  &:focus {
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

type Props = {
  value?: string;
  options: { value: string; label?: string }[];
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => void;
};

export default function Select({ value, options, onChange }: Props) {
  return (
    <StyledSelect onChange={onChange} value={value}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label ?? option.value}
        </option>
      ))}
    </StyledSelect>
  );
}
