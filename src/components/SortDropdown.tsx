"use client";
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  value: string;
  options: string[];
  label: string;
  onChange: (value: string) => void;
}

export default function SortDropdown({ value, options, label, onChange }: Props) {
  return (
    <FormControl variant="outlined" size="small">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        value={value}
        onChange={e => onChange(e.target.value)}
      >
        {options.map(opt => (
          <MenuItem key={opt} value={opt}>{opt}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}