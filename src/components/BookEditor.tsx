import React, { useState, useEffect } from 'react';
import categories from '../utils/categories';
import { Book } from '../types/Book';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchBookById, editBook } from '../api/api';
import formatDateTime from '../utils/formatDateTime';

const BookEditor = () => {
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

  const { title, author, category, ISBN, imgSrc } = book;

  const navigate = useNavigate();
  const { id } = useParams();

  const loadBookData = async (id: number) => {
    const response = await fetchBookById(id);
    console.log('loadBookData resp', response);
    setBook(response);
  };

  const onInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const onInputSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBook({
      ...book,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (id) {
    const updatedBook = {
      ...book,
      editedAt: formatDateTime(new Date())
    };
    editBook(id, updatedBook);    }
    navigate('/');
    console.log(book, 'book submited');
  };

  useEffect(() => {
    if (id) {
      loadBookData(+id);
    }
  }, []);

  return (
    <section>
      <form onSubmit={(e) => handleSubmit(e)} className="add-form">
        <div className="add-form__content">
          <div className="add-form__header">
            <h2 className="add-form__header-title">Edit</h2>
            <div className="add-form__header-close"></div>
          </div>
          <div className="add-form__title add-form__field">
            Title
            <input
              type="text"
              className="add-form__field-input"
              name="title"
              value={title}
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
              value={imgSrc}
              onChange={(e) => onInputChange(e)}
            />
          </div>
          <div className="add-form__author add-form__field">
            Author
            <input
              type="text"
              className="add-form__field-input"
              name="author"
              value={author}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
          <div className="add-form__category add-form__field">
            Category
            <select
              className="add-form__category-select add-form__field-input"
              name="category"
              value={category}
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
              value={ISBN}
              onChange={(e) => onInputChange(e)}
              required
            />
          </div>
        </div>
        <input
          type="submit"
          className="add-form__submit"
          value="Save changes"
        />
      </form>
    </section>
  );
};

export default BookEditor;
