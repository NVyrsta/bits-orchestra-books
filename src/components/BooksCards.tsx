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

const BooksCards: React.FC<Props> = (props) => {
  const { books, onToggleStatus, onDeleteBook, handleImageError } = props;

  return (
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
            className={classnames('card__content', {
              'card__content--active': book.status,
              'card__content--inactive': !book.status
            })}
          >
            <p>
              <span>Title: </span>
              {book.title}
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
                className="card__buttons-status card__button"
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
  );
};

export default BooksCards;
