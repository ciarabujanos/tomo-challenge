import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import type { Spice, Blend } from '../../types';
import { useLocation } from 'react-router-dom';
import Loader from '../../components/SpinnerLoader/SpinnerLoader';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import DetailCard from '../../components/DetailsCard/DetailsCard';

const BlendDetailPage = () => {
  const { id } = useParams();
  const [blend, setBlend] = useState<Blend>();
  const location = useLocation();
  const spiceList = location.state?.spices as Spice[];
  const blendList = location.state?.blends as Blend[];
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [allSpices, setAllSpices] = useState<Spice[]>([]);

  const getAllSpicesFromBlend = (
    blend: Blend,
    allBlends: Blend[],
    allSpices: Spice[],
    visited = new Set<number>(),
  ): Spice[] => {
    // check that each blend is visited once
    if (visited.has(blend.id)) return [];
    visited.add(blend.id);

    const directSpices = blend.spices
      .map((spiceId) => allSpices.find((s) => s.id === spiceId))
      .filter((spice) => spice !== undefined);

    const nestedSpices = blend.blends.reduce<Spice[]>(
      (acc: Spice[], childBlendId: number) => {
        const childBlend = allBlends.find((b: Blend) => b.id === childBlendId);
        if (childBlend) {
          acc.push(
            ...getAllSpicesFromBlend(childBlend, allBlends, allSpices, visited),
          );
        }
        return acc;
      },
      [],
    );

    // Remove duplicates
    const seen = new Set<number>();
    const uniqueSpices = [...directSpices, ...nestedSpices].filter((spice) => {
      if (seen.has(spice.id)) {
        return false;
      }
      seen.add(spice.id);
      return true;
    });

    return uniqueSpices;
  };

  const simulateError = false;

  const fetchBlend = async () => {
    try {
      setLoading(true);
      // added the set timeout for demo purposes
      const delay = new Promise((res) => setTimeout(res, 500));

      const fetchRequest = (async () => {
        const res = await fetch(`/api/v1/blends/${id}`);
        if (simulateError || !res.ok)
          throw new Error(`HTTP error! Status: ${res.status}`);

        const data = await res.json();
        setBlend(data);

        if (spiceList && blendList) {
          const resolvedSpices = getAllSpicesFromBlend(
            data,
            blendList,
            spiceList,
          );
          setAllSpices(resolvedSpices);
        }
      })();

      await Promise.all([delay, fetchRequest]);
    } catch (err) {
      console.error('Fetch Blend Error:', err);
      setError(err instanceof Error ? err.message : 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlend();
  }, [id]);

  const directSpices = allSpices.filter((spice) =>
    blend?.spices.includes(spice.id),
  );

  const nestedOnlySpices = allSpices.filter(
    (spice) => !blend?.spices.includes(spice.id),
  );

  if (loading) return <Loader />;
  if (error) return <ErrorBanner error={error} />;

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
