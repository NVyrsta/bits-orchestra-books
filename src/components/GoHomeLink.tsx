import { Link } from 'react-router-dom';
import { AiOutlineHome } from 'react-icons/ai';

const GoHomeLink = () => {
  return (
        <Link to="/" className="go-home-link">
          <AiOutlineHome />
        </Link>
  );
};

export default GoHomeLink;
