import BackButton from '../BackButton/BackButton';

type DetailsCardProps = {
  title: string;
  children: React.ReactNode;
};

const DetailCard = ({ title, children }: DetailsCardProps) => {
  return (
    <div className="min-h-screen bg-gray-50 ">
      <div className="flex justify-center py-8 px-4">
        <div className="w-full max-w-3xl">
          <BackButton />
          <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-4">
            <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailCard;
