import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="not-found-page">
      <Link to="/">
        HOME PAGE
      </Link>
    </div>
  );
};

export default PageNotFound;
