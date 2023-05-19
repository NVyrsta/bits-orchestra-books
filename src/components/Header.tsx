import React from 'react';
import { Link } from 'react-router-dom';
import { GiBookshelf } from 'react-icons/gi';

const Header = () => {
  return (
    <header className="header container">
      <nav className="header__navbar">
        <Link to="/" className="header__logo"><GiBookshelf /></Link>
        <Link to="/add-book" className="header__add-btn">Add Book</Link>
      </nav>
    </header>
  );
};

export default Header;