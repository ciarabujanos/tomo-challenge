import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import type { Spice, Blend } from '../../types';
import { useQuery } from '@tanstack/react-query';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import { fetchBlends, fetchSpices } from '../../queries';
import Loader from '../../components/SpinnerLoader/SpinnerLoader';
import DetailCard from '../../components/DetailsCard/DetailsCard';

const getAllSpicesFromBlend = (
  blend: Blend,
  blendListMapByID: Map<number, Blend>,
  spiceListMapByID: Map<number, Spice>,
  visited = new Set<number>(),
): Spice[] => {
  if (visited.has(blend.id)) return [];
  visited.add(blend.id);

  const directSpices = blend.spices.flatMap((id) => {
    const spice = spiceListMapByID.get(id);
    return spice ? [spice] : [];
  });

  const nestedSpices: Spice[] = [];

  for (const childBlendId of blend.blends) {
    const childBlend = blendListMapByID.get(childBlendId);
    if (childBlend) {
      nestedSpices.push(
        ...getAllSpicesFromBlend(
          childBlend,
          blendListMapByID,
          spiceListMapByID,
          visited,
        ),
      );
    }
  }

  const uniqueSpicesMap = new Map<number, Spice>();
  [...directSpices, ...nestedSpices].forEach((spice) => {
    if (!uniqueSpicesMap.has(spice.id)) {
      uniqueSpicesMap.set(spice.id, spice);
    }
  });
  return Array.from(uniqueSpicesMap.values());
};

const BlendDetailPage = () => {
  const { id } = useParams();
  const {
    data: spiceList = [],
    isLoading: loadingSpices,
    error: spiceError,
  } = useQuery({
    queryKey: ['spices'],
    queryFn: fetchSpices,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: blendList = [],
    isLoading: loadingBlends,
    error: blendError,
  } = useQuery({
    queryKey: ['blends'],
    queryFn: fetchBlends,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const simulateError = false;

  const {
    data: blend,
    isLoading: loadingBlend,
    error: blendErrorById,
  } = useQuery<Blend>({
    queryKey: ['blend', id],
    queryFn: async () => {
      const res = await fetch(`/api/v1/blends/${id}`);
      await new Promise((res) => setTimeout(res, 500));
      if (simulateError || !res.ok) throw new Error('Failed to fetch blend');
      return res.json();
    },
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  const allSpices = useMemo(() => {
    if (!blend || !blendList.length || !spiceList.length) return [];

    const spiceListMapByID = new Map(
      spiceList.map((spice) => [spice.id, spice]),
    );
    const blendListMapByID = new Map(
      blendList.map((blend) => [blend.id, blend]),
    );

    return getAllSpicesFromBlend(blend, blendListMapByID, spiceListMapByID);
    //  only run this when the blend, blendList, or spiceList updates
  }, [blend, blendList, spiceList]);

  const isLoading = loadingSpices || loadingBlends || loadingBlend;
  const error = (spiceError || blendError || blendErrorById) as
    | Error
    | undefined;

  const directSpices = allSpices.filter((spice) =>
    blend?.spices.includes(spice.id),
  );

  const nestedOnlySpices = allSpices.filter(
    (spice) => !blend?.spices.includes(spice.id),
  );

  if (isLoading) return <Loader />;
  if (error)
    return (
      <ErrorBanner
        error={
          (spiceError as Error)?.message ||
          (blendError as Error)?.message ||
          (blendErrorById as Error)?.message
        }
      />
    );

  return (
    <DetailCard title="Blend Details">
      {blend ? (
        <div className="space-y-2">
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Name</h2>
            <span className="ml-2 text-gray-900">{blend.name}</span>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Description</h2>
            <span className="ml-2 text-gray-900">{blend.description}</span>
          </div>
          <div>
            <h2
              aria-label="Spices included in this blend"
              className="text-lg font-semibold text-gray-800"
            >
              Spices in this blend:
            </h2>

            <ul className="ml-7 list-decimal">
              {directSpices.map((spiceInfo: Spice) => (
                <li key={`spice-${spiceInfo.id}`}>{spiceInfo.name}</li>
              ))}
            </ul>
          </div>
          <div>
            <div>
              <h2
                aria-label="Spices nested in this blend"
                className="text-lg font-semibold text-gray-800"
              >
                Spices from nested blends:
              </h2>
              <ul className="ml-5 list-disc text-gray-800 mt-2 space-y-1">
                {nestedOnlySpices.map((spice) => (
                  <li key={spice.id}>{spice.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ) : (
        <div
          role="status"
          className="flex justify-center items-center m-25 text-3xl"
        >
          No blend details found 😕
        </div>
      )}
    </DetailCard>
  );
};

export default BlendDetailPage;
