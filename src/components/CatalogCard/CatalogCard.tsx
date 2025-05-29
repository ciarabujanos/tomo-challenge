import { Link } from 'react-router-dom';

type CatalogCardProps = {
  name: string;
  to: string;
  state?: any; // optional state for routing
};

const CatalogCard = ({ name, to, state }: CatalogCardProps) => {
  return (
    <Link
      to={to}
      state={state}
      className="text-sm text-gray-600 rounded-xl border border-gray-200 shadow-sm p-4 bg-white hover:shadow-md transition block"
    >
      {name}
    </Link>
  );
};

export default CatalogCard;
