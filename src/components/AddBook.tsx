import React, { useState } from 'react';
import categories from '../utils/categories';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../api/api';
import formatDateTime from '../utils/formatDateTime';
import GoHomeLink from './GoHomeLink';

const AddBook = () => {
  const [book, setBook] = useState<Book>({
    id: Math.random(),
    status: true,
    title: '',
    author: '',
    category: '',
    ISBN: undefined,
    createdAt: formatDateTime(new Date()),
    editedAt: formatDateTime(new Date()),
    imgSrc: ''
  });

  const navigate = useNavigate();

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value
    });
  };

  const onInputSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/');
    addBook(book);
  };

  return (
    <section className="add-book">
      <GoHomeLink />
      <form onSubmit={(e) => handleSubmit(e)} className="add-form">
        <div className="add-form__content">
          <h2 className="add-form__title">ADD BOOK</h2>

          <div className="add-form__title add-form__field">
            Title
            <input
              type="text"
              className="add-form__field-input"
              name="title"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>

          <div className="add-form__title add-form__field">
            IMG
            <input
              type="text"
              className="add-form__field-input"
              name="imgSrc"
              onChange={(e) => onInputChange(e)}
            />
          </div>

          <div className="add-form__author add-form__field">
            Author
            <input
              type="text"
              className="add-form__field-input"
              name="author"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          
          <div className="add-form__category add-form__field">
            Category
            <select
              className="add-form__field-input add-form__category-select"
              name="category"
              onChange={onInputSelect}
              required
            >
              <option value=""></option>
              {categories.map((category) => (
                <option value={category} key={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="add-form__isbn add-form__field">
            ISBN
            <input
              type="text"
              className="add-form__field-input"
              maxLength={10}
              minLength={10}
              name="ISBN"
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>

        <button className="add-form__submit">ADD BOOK</button>
      </form>
    </section>
  );
};

export default AddBook;
