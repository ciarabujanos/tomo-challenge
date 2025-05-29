import { http, HttpResponse } from 'msw';
import { data as mockSpices } from './data/spices';
import { data as mockBlends } from './data/blends';
import type { Blend } from '../types';

export const handlers = [
  http.get('/api/v1/spices', () => {
    return HttpResponse.json(mockSpices());
  }),

  http.get('/api/v1/spices/:id', ({ params }) => {
    const spice = mockSpices().find((spice) => spice.id === Number(params.id));

    if (!spice) {
      return new HttpResponse('Not found', { status: 404 });
    }
    return HttpResponse.json(spice);
  }),

  http.get('/api/v1/blends', () => {
    return HttpResponse.json(mockBlends);
  }),

  http.post('/api/v1/blends', async ({ request }) => {
    const newBlend = (await request.json()) as Blend;
    const blendWithId = {
      ...newBlend,
      id: mockBlends.length,
    };

    mockBlends.push(blendWithId);
    return HttpResponse.json(blendWithId, { status: 201 });
  }),

  http.get('/api/v1/blends/:id', ({ params }) => {
    const blend = mockBlends.find((blend) => blend.id === Number(params.id));

    if (!blend) {
      return new HttpResponse('Not found', { status: 404 });
    }
    return HttpResponse.json(blend);
  }),
];
