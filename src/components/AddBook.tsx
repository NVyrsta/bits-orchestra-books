import React, { useState } from 'react';
import categories from '../utils/categories';
import { Book } from '../types/Book';
import { useNavigate } from 'react-router-dom';
import { addBook } from '../api/api';
import formatDateTime from '../utils/formatDateTime';

const AddBook = () => {
  const [book, setBook] = useState<Book>({
    id: Math.random(),
    status: true,
    title: '', //
    author: '', //
    category: '',
    ISBN: undefined, //
    createdAt: formatDateTime(new Date()),
    editedAt: formatDateTime(new Date()),
    imgSrc: '' //
  });
  const navigate = useNavigate();
 
  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    })
  };

  const onInputSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    navigate('/'); console.log(book, 'book submited');
    addBook(book);
  };

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)} className="add-form">
        <div className="add-form__content">
          <div className="add-form__header">
            <h2 className="add-form__header-title">ADD BOOK</h2>
            <div className="add-form__header-close"></div>
          </div>
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
              required
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
              className="add-form__category-select add-form__field-input"
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
              // value={isbn || 0}
              maxLength={10}
              minLength={10}
              name="ISBN"
              onChange={(e) => onInputChange(e)}
              required
            />
            {/* {isNumber && (
                <span style={{ color: 'red' }}>enter an ISBN(10 digits)</span>
              )} */}
          </div>
        </div>
        <input type="submit" className="add-form__submit" value="ADD BOOK" />
      </form>
    </section>
  );
};

export default AddBook;