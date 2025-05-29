import Select, { StylesConfig } from 'react-select';

export type OptionType = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  label: string;
  options: OptionType[];
  selectedOptions: OptionType[];
  setSelectedOptions: (value: OptionType[]) => void;
};

const customStyles: StylesConfig<OptionType, true> = {
  control: (base) => ({
    ...base,
    padding: '2px',
    borderColor: '#d1d5db',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#9ca3af',
    },
  }),
  multiValue: (base) => ({
    ...base,
    backgroundColor: '#d1fae5',
    color: '#065f46',
  }),
  multiValueLabel: (base) => ({
    ...base,
    color: '#065f46',
  }),
  multiValueRemove: (base) => ({
    ...base,
    color: '#047857',
    ':hover': {
      backgroundColor: '#047857',
      color: 'white',
    },
  }),
};

const MultiSelect = ({
  label,
  options,
  selectedOptions,
  setSelectedOptions,
}: MultiSelectProps) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <Select
        isMulti
        options={options}
        value={selectedOptions}
        onChange={(selectedOptions) => {
          setSelectedOptions([...(selectedOptions ?? [])]);
        }}
        styles={customStyles}
        className="text-sm"
      />
    </div>
  );
};

export default MultiSelect;
