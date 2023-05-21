import React, { useState, useEffect, useMemo } from 'react';
import { useMediaQuery } from 'react-responsive';
import { fetchBooks, deleteBookById } from '../api/api';
import { Book } from '../types/Book';
import { editBook } from '../api/api';
import formatDateTime from '../utils/formatDateTime';
import BooksTable from './BooksTable';
import BooksCards from './BooksCards';

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
    // default img url for all books
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
        <BooksCards
          books={sortedBooks}
          onToggleStatus={onToggleStatus}
          onDeleteBook={onDeleteBook}
          handleImageError={handleImageError}
        />
      ) : (
        <BooksTable
          books={sortedBooks}
          onToggleStatus={onToggleStatus}
          onDeleteBook={onDeleteBook}
          handleImageError={handleImageError}
        />
      )}
    </section>
  );
};

export default Dashboard;
