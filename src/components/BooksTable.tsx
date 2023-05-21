import React from 'react';
import { Book } from '../types/Book';
import classnames from 'classnames';
import { Link } from 'react-router-dom';

type Props = {
  books: Book[];
  onToggleStatus: (book: Book) => void;
  onDeleteBook: (id: number) => void;
  handleImageError: (event: React.SyntheticEvent<HTMLImageElement>) => void;
};

const BooksTable: React.FC<Props> = (props) => {
  const { books, onToggleStatus, onDeleteBook, handleImageError } = props;

  return (
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
        {books.map((book) => (
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
                  className="table__buttons-status table__button"
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
  );
};

export default BooksTable;
