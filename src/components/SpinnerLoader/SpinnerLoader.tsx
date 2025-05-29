import spinner from '../../assets/spinner.svg';

const Spinner = () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <img src={spinner} alt="spinning blue loader" />
    </div>
  );
};

export default Spinner;
