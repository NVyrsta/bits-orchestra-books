import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fetchBooks, deleteBookById } from '../api/api';
import { Book } from '../types/Book';

const Dashboard = () => {
  const [books, setBooks] = useState<Book[]>([]);

  const loadBooks = async () => {
    const response = await fetchBooks();
    setBooks(response);
    console.log(response);
  };

  const onDeleteBook = async (id: number) => {
    try {
      await deleteBookById(id);
      loadBooks();
    } catch (error) {
      console.error('Failed to delete book:', error);
    }
  }

  useEffect(() => {
    loadBooks();
  }, []);

  const isMobile = useMediaQuery({ maxWidth: 991 });

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement>) => {
    event.currentTarget.src =
      'https://www.queerscifi.com/wp-content/uploads/2016/05/untitled2-600x541.jpg';
  };

  return (
    <section className="dashboard container">
      <div className="sort-menu">
        <select id="sort-select">
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
                width={200}
                height={200}
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
                  <input
                    type="button"
                    className="card__button"
                    value={book.status ? 'Active' : 'Inactive'}
                  />
                  <input type="button" className="card__button" value="Edit" />
                  <input
                    type="button"
                    className="card__button"
                    value="Delete"
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
            {books.map((book) => (
              <tr key={book.id}>
                <td>
                  <img
                    src={book.imgSrc}
                    alt="img"
                    width={200}
                    height={200}
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
                    <input
                      type="button"
                      className="table__buttons-edit table__button"
                      value={book.status ? 'active' : 'inactive'}
                    />
                    <input
                      type="button"
                      className="table__buttons-edit table__button"
                      value="Edit"
                    />
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
