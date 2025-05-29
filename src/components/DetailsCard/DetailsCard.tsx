type DetailsCardProps = {
  title: string;
  children: React.ReactNode;
};

const DetailCard = ({ title, children }: DetailsCardProps) => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow-md space-y-4">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        {children}
      </div>
    </div>
  );
};

export default DetailCard;
