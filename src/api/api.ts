// import { Book } from '../types/Book';

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