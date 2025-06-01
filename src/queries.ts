import type { Blend, Spice } from './types';

export const fetchBlends = async (): Promise<Blend[]> => {
  await new Promise((res) => setTimeout(res, 500));
  const res = await fetch('/api/v1/blends');
  if (!res.ok) throw new Error('Failed to fetch blends');
  return res.json();
};

export const fetchSpices = async (): Promise<Spice[]> => {
  await new Promise((res) => setTimeout(res, 500));
  const res = await fetch('/api/v1/spices');
  if (!res.ok) throw new Error('Failed to fetch spices');
  return res.json();
};

export const fetchSpiceById = async (id: string): Promise<Spice> => {
  await new Promise((res) => setTimeout(res, 500));
  const res = await fetch(`/api/v1/spices/${id}`);
  if (!res.ok) throw new Error('Failed to fetch spice');
  return res.json();
};
