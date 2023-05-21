import { Book } from '../types/Book';
import Notification from '../components/Notification';

const API_URL = 'http://localhost:3001/books';

export async function fetchBooks() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    return data;
  } catch (error) {
    Notification('Error fetch all books', 'reject');
  }
}

export async function fetchBookById(id: number) {
  try {
    const response = await fetch(`${API_URL}/${id}`);
    const data = await response.json();

    return data;
  } catch (error) {
    Notification('Error fetching book by id', 'reject');
  }
}

export async function deleteBookById(id: number) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    Notification('Book deleted successfully', 'success');
  } catch (error) {
    Notification("Can't delete book", 'reject');
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
    Notification('Book added successfully', 'success');

    return newBook;
  } catch (error) {
    Notification("Can't add book", 'reject');
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
    Notification('Book updated successfully', 'success');

    return updatedBook;
  } catch (error) {
    Notification('Error updating book', 'reject');
  }
}
