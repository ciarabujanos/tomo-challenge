import { Link } from 'react-router-dom';

type CatalogCardProps = {
  key: number;
  name: string;
  to: string;
};

const CatalogCard = ({ key, name, to }: CatalogCardProps) => {
  return (
    <Link
      key={key}
      to={to}
      className="text-sm text-gray-600 rounded-xl border border-gray-200 shadow-sm p-4 bg-white hover:shadow-md transition block"
    >
      {name}
    </Link>
  );
};

export default CatalogCard;
