import { useQuery } from '@tanstack/react-query';
import DetailCard from '../../components/DetailsCard/DetailsCard';
import Loader from '../../components/SpinnerLoader/SpinnerLoader';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import { useParams } from 'react-router-dom';
import { fetchSpiceById } from '../../queries';

const SpiceDetailPage = () => {
  const { id } = useParams();

  const {
    data: spice,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['spice', id],
    queryFn: () => fetchSpiceById(id!),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    enabled: !!id,
  });

  if (isLoading) return <Loader />;
  if (error) return <ErrorBanner error={(error as Error).message} />;

  return (
    <DetailCard title="Spice Details">
      {spice ? (
        <div className="space-y-2">
          <div>
            <span className="font-medium text-gray-600">Spice Name:</span>
            <span className="ml-2 text-gray-900">
              {spice.name ?? 'Unnamed Spice'}
            </span>
          </div>
          <div className="flex items-center font-medium  text-gray-600">
            Spice Color:
            {spice.color && spice.color.length === 6 ? (
              <span
                className="inline-block w-5 h-5 rounded-full ml-2"
                style={{ backgroundColor: `#${spice.color}` }}
              />
            ) : (
              <span className="ml-2 font-normal text-gray-900">
                Unknown Color
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Cost:</span>
            <span className="ml-2 text-yellow-600">
              {spice.price ?? 'Cost unknown'}
            </span>
          </div>
          <div className="flex items-center">
            <span className="font-medium text-gray-600">Heat Level:</span>
            <span className="ml-2 text-red-600">
              {spice.heat ? '🌶️'.repeat(spice.heat) : 'Not specified'}
            </span>
          </div>
        </div>
      ) : (
        <div role="status" className="text-center text-2xl text-gray-400">
          No spices found 😕
        </div>
      )}
    </DetailCard>
  );
};

export default SpiceDetailPage;
