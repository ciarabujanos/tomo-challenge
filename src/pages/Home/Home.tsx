import type { Blend, Spice } from '../../types';
import { useEffect, useState } from 'react';
import AddBlendsForm from '../../components/AddBlendsForm/AddBlendsForm';
import CatalogCard from '../../components/CatalogCard/CatalogCard';

function Home() {
  const [spices, setSpices] = useState<Spice[]>([]);
  const [blends, setBlends] = useState<Blend[]>([]);
  const [searchString, updateSearchString] = useState('');
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>('spices');

  const fetchBlends = async () => {
    const blendsResponse = await fetch('/api/v1/blends');
    const blends = await blendsResponse.json();
    setBlends(blends);
  };

  useEffect(() => {
    async function fetchSpices() {
      const spicesResponse = await fetch('/api/v1/spices');
      const spices = await spicesResponse.json();
      setSpices(spices);
    }

    fetchSpices();
    fetchBlends();
  }, []);

  const handleCreateBlendModal = () => {
    setModalOpen(true);
  };

  const filteredSpices = spices.filter((spice) =>
    spice.name.toLowerCase().includes(searchString.toLowerCase()),
  );

  const filteredBlends = blends.filter((blend) =>
    blend.name.toLowerCase().includes(searchString.toLowerCase()),
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
        <div className="flex justify-end mb-4 space-x-2">
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'spices' ? 'bg-green-700 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('spices')}
          >
            Spices
          </button>
          <button
            className={`px-4 py-2 rounded ${
              activeTab === 'blends' ? 'bg-green-700 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab('blends')}
          >
            Blends
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'spices' ? (
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
                      state={{ spices, blends }}
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
          fetchBlends={fetchBlends}
        />
      )}
    </div>
  );
}

export default Home;
