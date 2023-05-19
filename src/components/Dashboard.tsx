import React from 'react';
import { useMediaQuery } from 'react-responsive';

const books = [
  {
    id: 1,
    title: 'titanic',
    author: 'ervin',
    category: 'Young Adult',
    ISBN: 1111111111,
    createdAt: 'Editt',
    editedAt: 'Editt',
    status: true,
    imgSrc: 'gdfg'
  },
  {
    id: 2,
    title: '222',
    author: '2222',
    category: 'Art/Photography',
    ISBN: 2222222222,
    createdAt: 'Editt',
    editedAt: 'Editt',
    status: true,
    imgSrc:
      'https://.britishbook.ua/upload/resize_cache/iblock/d8f/o0ucrm5mnec2heg1le8shqbotu08nl5j/800_800_174b5ed2089e1946312e2a80dcd26f146/kniga_the_politics_book.jpg'
  },
  {
    id: 3,
    title: 'The Politics Book',
    author: 'Dorling Kindersley',
    category: 'Politics',
    ISBN: 9781409364450,
    createdAt: '12 March 2022, 8:35AM',
    editedAt: '13 March 2022, 1:48PM',
    status: true,
    imgSrc:
      'https://www.britishbook.ua/upload/resize_cache/iblock/d8f/o0ucrm5mnec2heg1le8shqbotu08nl5j/800_800_174b5ed2089e1946312e2a80dcd26f146/kniga_the_politics_book.jpg'
  },
  {
    id: 4,
    title: 'The Politics Book',
    author: 'Dorling Kindersley',
    category: 'Politics',
    ISBN: 9781409364450,
    createdAt: '12 March 2022, 8:35AM',
    editedAt: '13 March 2022, 1:48PM',
    status: true,
    imgSrc:
      'https://www.britishbook.ua/upload/resize_cache/iblock/d8f/o0ucrm5mnec2heg1le8shqbotu08nl5j/800_800_174b5ed2089e1946312e2a80dcd26f146/kniga_the_politics_book.jpg'
  },
  {
    id: 5,
    title: 'The Politics Book',
    author: 'Dorling Kindersley',
    category: 'Politics',
    ISBN: 9781409364450,
    createdAt: '12 March 2022, 8:35AM',
    editedAt: '13 March 2022, 1:48PM',
    status: true,
    imgSrc:
      'https://www.britishbook.ua/upload/resize_cache/iblock/d8f/o0ucrm5mnec2heg1le8shqbotu08nl5j/800_800_174b5ed2089e1946312e2a80dcd26f146/kniga_the_politics_book.jpg'
  },
  {
    id: 6,
    title: 'The Politics Book',
    author: 'Dorling Kindersley',
    category: 'Politics',
    ISBN: 9781409364450,
    createdAt: '12 March 2022, 8:35AM',
    editedAt: '13 March 2022, 1:48PM',
    status: true,
    imgSrc:
      'https://www.britishbook.ua/upload/resize_cache/iblock/d8f/o0ucrm5mnec2heg1le8shqbotu08nl5j/800_800_174b5ed2089e1946312e2a80dcd26f146/kniga_the_politics_book.jpg'
  },
  {
    id: 7,
    title: 'mailo',
    author: 'js author',
    category: 'Sports',
    ISBN: 1010101010,
    createdAt: '12 March 2022, 8:35AM',
    editedAt: '13 March 2022, 1:48PM',
    status: true,
    imgSrc:
      'https://images.prom.ua/2440373205_w640_h640_javascript-the-definitive.jpg'
  },
  {
    id: 8,
    title: 'riko',
    author: 'riko',
    category: 'Philosophy',
    ISBN: 9999999999,
    createdAt: '12 March 2022, 8:35AM',
    editedAt: '13 March 2022, 1:48PM',
    status: true,
    imgSrc: 'riko'
  }
];

const Dashboard = () => {
  const isMobile = useMediaQuery({ maxWidth: 991 });

      const handleImageError = (
        event: React.SyntheticEvent<HTMLImageElement>
      ) => {
        event.currentTarget.src =
          'https://book-ye.com.ua/upload/resize_cache/iblock/2c8/520_860_1/8968836d_1d2d_11ed_8173_0050568ef5e6_c1205b0a_1d2f_11ed_8173_0050568ef5e6.jpg';
      };
  return (
    <section className="dashboard container">
        <div className="sort-menu">
          <select
            id="sort-select"
          >
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
                  <input
                    type="button"
                    className="card__button"
                    value="Edit"
                  />
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