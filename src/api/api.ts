import { Book } from '../types/Book';

const API_URL = 'http://localhost:3001/books';

export async function fetchBooks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      'An unexpected error occurred in fetchBooks fetch request:',
      error
    );
  }
}

export async function fetchBookById(id: number) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(
      'An unexpected error occurred in fetchBooks fetch request:',
      error
    );
  }
}

export async function deleteBookById(id: number) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
    });
  } catch (error) {
    console.error(`Error deleting book with ID ${id}:`, error);
  }
}

export async function addBook(bookData: Book) {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    });
    const newBook = await response.json();
    return newBook;
  } catch (error) {
    console.error('Error creating book:', error);
  }
}

export async function editBook(id: string, bookData: Book) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(bookData)
    });
    const updatedBook = await response.json();
    console.log('patch');
    return updatedBook;
  } catch (error) {
    console.error('Error editing book:', error);
    throw error;
  }
}
