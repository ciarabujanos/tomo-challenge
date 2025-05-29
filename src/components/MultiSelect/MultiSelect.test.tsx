import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import MultiSelect, { OptionType } from './MultiSelect';

describe('MultiSelect', () => {
  const options: OptionType[] = [
    { value: '1', label: 'Cumin' },
    { value: '2', label: 'Paprika' },
  ];

  it('renders label and allows selecting options', async () => {
    const setSelectedOptions = vi.fn();
    render(
      <MultiSelect
        label="Spices"
        options={options}
        selectedOptions={[]}
        setSelectedOptions={setSelectedOptions}
      />,
    );

    // Label should be visible
    expect(screen.getByText('Spices')).toBeInTheDocument();

    // Click dropdown and select "Cumin"
    const dropdown = screen.getByText('Select...');
    await userEvent.click(dropdown);
    const cuminOption = await screen.findByText('Cumin');
    await userEvent.click(cuminOption);
    expect(setSelectedOptions).toHaveBeenCalled();
  });
});
