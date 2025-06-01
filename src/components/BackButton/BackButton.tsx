import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(-1)}
      aria-label="Go back to previous page"
      className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800"
    >
      ← Back
    </button>
  );
};

export default BackButton;
