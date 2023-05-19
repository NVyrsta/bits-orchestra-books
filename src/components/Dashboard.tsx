import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { fetchBooks, deleteBookById } from '../api/api';
import { Book } from '../types/Book';
import { editBook } from '../api/api';
import formatDateTime from '../utils/formatDateTime';
import classnames from 'classnames';

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOption, setSortOption] = useState<string>('all');
  const booksCount = books.length;

  const loadBooks = async () => {
    const response = await fetchBooks();
    setBooks(response);
  };

  const onDeleteBook = async (id: number) => {
    try {
      await deleteBookById(id);
      loadBooks();
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(event.target.value);
  };

  useEffect(() => {
    loadBooks();
  }, []);

  const sortedBooks = useMemo(() => {
    let sorted = [...books];
    if (sortOption === 'active') {
      sorted = sorted.filter((book) => book.status);
    } else if (sortOption === 'inactive') {
      sorted = sorted.filter((book) => !book.status);
    }
    return sorted;
  }, [books, sortOption]);

  const isMobile = useMediaQuery({ maxWidth: 991 });

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      'https://www.queerscifi.com/wp-content/uploads/2016/05/untitled2-600x541.jpg';
  };

  const onToggleStatus = (book: Book) => {
    const status = !book.status;
    editBook(`${book.id}`, {
      ...book,
      status,
      editedAt: formatDateTime(new Date())
    });
    loadBooks();
  };

  return (
    <section className="dashboard container">
      <div className="sort-menu">
        <select onChange={handleSortChange}>
          <option value="all">Show All</option>
          <option value="active">Show Active</option>
          <option value="inactive">Show Deactivated</option>
        </select>
        <span className="sort-menu__count">{`${sortedBooks.length} / ${booksCount}`}</span>
      </div>

      {isMobile ? (
        <div className="card-list">
          {books.map((book) => (
            <div key={book.id} className="card">
              <img
                className="card__img"
                src={book.imgSrc}
                alt="img"
                width={250}
                height={250}
                onError={handleImageError}
              />
              <div
                className={classnames('table__row card__content', {
                  'table__row--active': book.status,
                  'table__row--inactive': !book.status
                })}
              >
                <p>
                  <span>Title: </span> {book.title}
                </p>
                <p>
                  <span>Author: </span>
                  {book.author}
                </p>
                <p>
                  <span>Category: </span>
                  {book.category}
                </p>
                <p>
                  <span>Created At: </span>
                  {book.createdAt}
                </p>
                <p>
                  <span>Edited At: </span>
                  {book.editedAt}
                </p>
                <p>
                  <span>ISBN: </span>
                  {book.ISBN}
                </p>
                <div className="card__buttons">
                  <button
                    className="card__buttons-edit card__button"
                    onClick={() => onToggleStatus(book)}
                  >
                    {book.status ? 'Deactivate' : 'Activate'}
                  </button>
                  <Link
                    to={`/edit-book/${book.id}`}
                    className="card__buttons-edit card__button"
                  >
                    Edit
                  </Link>

                  <button
                    className="table__buttons-delete card__button"
                    onClick={() => onDeleteBook(book.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="table">
          <thead className="table__head">
            <tr className="table__row">
              <th></th>
              <th>Title</th>
              <th>Author</th>
              <th>Category</th>
              <th>Created At</th>
              <th>Edited At</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedBooks.map((book) => (
              <tr
                key={book.id}
                className={classnames('table__row', {
                  'table__row--active': book.status,
                  'table__row--inactive': !book.status
                })}
              >
                <td>
                  <img
                    src={book.imgSrc}
                    alt="img"
                    width={100}
                    height={100}
                    onError={handleImageError}
                  />
                </td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.createdAt}</td>
                <td>{book.editedAt}</td>
                <td>{book.ISBN}</td>
                <td>
                  <div className="table__buttons">
                    <button
                      className="table__buttons-edit table__button"
                      onClick={() => onToggleStatus(book)}
                    >
                      {book.status ? 'Deactivate' : 'Activate'}
                    </button>
                    <Link
                      to={`/edit-book/${book.id}`}
                      className="table__buttons-edit table__button"
                    >
                      Edit
                    </Link>

                    <button
                      className="table__buttons-delete table__button"
                      onClick={() => onDeleteBook(book.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default Dashboard;
