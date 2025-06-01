import { useState } from 'react';
import AddBlendsForm from '../../components/AddBlendsForm/AddBlendsForm';
import CatalogCard from '../../components/CatalogCard/CatalogCard';
import { useMatch, NavLink } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import Spinner from '../../components/SpinnerLoader/SpinnerLoader';
import ErrorBanner from '../../components/ErrorBanner/ErrorBanner';
import BackButton from '../../components/BackButton/BackButton';
import { fetchBlends, fetchSpices } from '../../queries';
function Home() {
  const [searchString, updateSearchString] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const isBlendsTab = useMatch('/blends');
  const activeTab = isBlendsTab ? 'blends' : 'spices';

  const {
    data: spices = [],
    isLoading: loadingSpices,
    error: spiceError,
  } = useQuery({
    queryKey: ['spices'],
    queryFn: fetchSpices,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const {
    data: blends = [],
    isLoading: loadingBlends,
    error: blendError,
  } = useQuery({
    queryKey: ['blends'],
    queryFn: fetchBlends,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleCreateBlendModal = () => {
    setModalOpen(true);
  };

  const filteredSpices = spices.filter((spice) =>
    spice.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  const filteredBlends = blends.filter((blend) =>
    blend.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  if (loadingSpices || loadingBlends) return <Spinner />;
  if (spiceError || blendError)
    return (
      <ErrorBanner
        error={(spiceError as Error)?.message || (blendError as Error)?.message}
      />
    );

  return (
    <div className="m-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">
        🌿 {activeTab === 'spices' ? 'Spice Catalog' : 'Blends Catalog'}
      </h1>
      <div className="w-xl">
        <input
          value={searchString}
          onChange={(e) => {
            updateSearchString(e.target.value);
          }}
          placeholder="Search spices and blends..."
          className="sm:w-1/2 p-2 mb-6 border border-gray-300 rounded shadow-sm"
        />
      </div>

      <div style={{ textAlign: 'center' }}>
        {/* Tab Navigation */}
        <div className="flex justify-between mb-10 space-x-2">
          <div>{activeTab === 'blends' && <BackButton />}</div>
          <div className="flex space-x-2">
            <NavLink
              to="/"
              className={`px-4 py-2 rounded ${
                activeTab === 'spices'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Spices
            </NavLink>
            <NavLink
              to="/blends"
              className={`px-4 py-2 rounded ${
                activeTab === 'blends'
                  ? 'bg-green-700 text-white'
                  : 'bg-gray-200'
              }`}
            >
              Blends
            </NavLink>
          </div>
        </div>

        {/* Tab Content */}
        {!isBlendsTab ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {filteredSpices.length > 0 ? (
              filteredSpices.map((spice) => (
                <CatalogCard
                  key={spice.id}
                  name={spice.name}
                  to={`/spices/${spice.id}`}
                />
              ))
            ) : (
              <div className="col-span-full flex justify-center items-center h-40">
                <p className="text-2xl">No spices found</p>
              </div>
            )}
          </div>
        ) : (
          <div>
            <div className="flex justify-center items-center mb-4">
              <button
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
                onClick={() => handleCreateBlendModal()}
              >
                + Create a Blend
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 mx-auto max-w-5xl">
              {filteredBlends.length > 0 ? (
                filteredBlends.map((blend) => (
                  <div key={blend.id}>
                    <CatalogCard
                      key={blend.id}
                      name={blend.name}
                      to={`/blends/${blend.id}`}
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-full flex justify-center items-center h-40">
                  <p className="text-2xl">No blends found</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {modalOpen && (
        <AddBlendsForm
          blends={blends}
          spices={spices}
          setModalOpen={setModalOpen}
        />
      )}
    </div>
  );
}

export default Home;
