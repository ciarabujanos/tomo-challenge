import React, { useState, Dispatch, SetStateAction } from 'react';
import type { Blend, Spice } from '../../types';
import MultiSelect, { OptionType } from '../MultiSelect/MultiSelect';

interface PropTypes {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  fetchBlends: () => void;
  blends: Blend[];
  spices: Spice[];
}

const AddBlendsForm: React.FunctionComponent<PropTypes> = ({
  blends,
  spices,
  setModalOpen,
  fetchBlends,
}) => {
  const [description, setDescription] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [selectedBlendOptions, setSelectedBlendOptions] = useState<
    OptionType[]
  >([]);
  const [selectedSpiceOptions, setSelectedSpiceOptions] = useState<
    OptionType[]
  >([]);

  const handleSubmitAddBlend = async (
    name: string,
    blends: number[],
    spices: number[],
  ) => {
    const blendObj = {
      name,
      description,
      blends,
      spices,
    };
    try {
      const config = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(blendObj),
      };
      const response = await fetch('/api/v1/blends', config);
      if (!response.ok) {
        console.error('Failed to add blend:', response.statusText);
        return;
      }
      await fetchBlends();
      setModalOpen(false);
    } catch (error) {
      console.error('Network or unexpected error:', error);
    }
  };

  const blendOptions: OptionType[] = blends.map((blend: Blend) => ({
    value: blend.id.toString(),
    label: blend.name,
  }));

  const spiceOptions: OptionType[] = spices.map((spice: Spice) => ({
    value: spice.id.toString(),
    label: spice.name,
  }));

  return (
    <div className="fixed top-80 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Create New Blend</h2>
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Blend Name
        </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-1 w-full p-2 border border-gray-300 rounded"
        />
      </div>
      {/*Blends Dropdown */}
      <MultiSelect
        label="Blends"
        options={blendOptions}
        selectedOptions={selectedBlendOptions}
        setSelectedOptions={setSelectedBlendOptions}
      />
      {/* Spices Dropdown */}
      <MultiSelect
        label="Spices"
        options={spiceOptions}
        selectedOptions={selectedSpiceOptions}
        setSelectedOptions={setSelectedSpiceOptions}
      />
      {/* Buttons */}
      <div className="flex justify-end gap-2 pt-4">
        <button
          onClick={() => setModalOpen(false)}
          className="px-4 py-2 text-sm text-gray-500 hover:underline"
        >
          Cancel
        </button>
        <button
          onClick={() => {
            handleSubmitAddBlend(
              name,
              selectedBlendOptions.map((opt) => Number(opt.value)),
              selectedSpiceOptions.map((opt) => Number(opt.value)),
            );
            setModalOpen(false);
          }}
          className="px-4 py-2 bg-green-700 text-white rounded hover:bg-green-800"
        >
          Save Blend
        </button>
      </div>
    </div>
  );
};

export default AddBlendsForm;
