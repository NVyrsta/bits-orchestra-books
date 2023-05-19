import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';
import { fetchBooks, deleteBookById } from '../api/api';
import { Book } from '../types/Book';
import { editBook } from '../api/api';
import formatDateTime from '../utils/formatDateTime';

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [sortOption, setSortOption] = useState<string>('all');


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
        <select id="sort-select" onChange={handleSortChange}>
          <option value="all">Show All</option>
          <option value="active">Show Active</option>
          <option value="inactive">Show Inactive</option>
        </select>
      </div>

      {isMobile ? (
        <div className="card-list">
          {books.map((book) => (
            <div key={book.id} className="card">
              <img
                src={book.imgSrc}
                alt="img"
                width={300}
                height={300}
                onError={handleImageError}
              />
              <div>
                <p>Title: {book.title}</p>
                <p>Status: {book.status ? 'Active' : 'Inactive'}</p>
                <p>Created At: {book.createdAt}</p>
                <p>Edited At: {book.editedAt}</p>
                <p>Author: {book.author}</p>
                <p>Category: {book.category}</p>
                <p>ISBN: {book.ISBN}</p>
                <div className="card__buttons">
                  <button
                    className="table__buttons-edit table__button"
                    onClick={() => onToggleStatus(book)}
                  >
                    {book.status ? 'active' : 'inactive'}
                  </button>
                  <Link
                    to={`/edit-book/${book.id}`}
                    className="table__buttons-edit table__button"
                  >
                    Edit
                  </Link>

                  <input
                    type="button"
                    className="table__buttons-delete table__button"
                    value="Delete"
                    onClick={() => onDeleteBook(book.id)}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <table className="table">
          <thead className="table__head">
            <tr>
              <th>Img</th>
              <th>Book title</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Edited At</th>
              <th>Author</th>
              <th>Category</th>
              <th>ISBN</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {sortedBooks.map((book) => (
              <tr key={book.id}>
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
                <td>{book.status ? 'active' : 'inactive'}</td>
                <td>{book.createdAt}</td>
                <td>{book.editedAt}</td>
                <td>{book.author}</td>
                <td>{book.category}</td>
                <td>{book.ISBN}</td>
                <td>
                  <div className="table__buttons">
                    <button
                      className="table__buttons-edit table__button"
                      onClick={() => onToggleStatus(book)}
                    >
                      {book.status ? 'active' : 'inactive'}
                    </button>
                    <Link
                      to={`/edit-book/${book.id}`}
                      className="table__buttons-edit table__button"
                    >
                      Edit
                    </Link>

                    <input
                      type="button"
                      className="table__buttons-delete table__button"
                      value="Delete"
                      onClick={() => onDeleteBook(book.id)}
                    />
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
