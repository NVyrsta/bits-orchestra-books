import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AddBook from './components/AddBook';
import Footer from './components/Footer';
import BookEditor from './components/BookEditor';
import PageNotFound from './components/PageNotFound';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/add-book" element={<AddBook />} />
        <Route path="/edit-book/:id" element={<BookEditor />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>

      <Footer />
      <ToastContainer />
    </Router>
  );
}

export default App;
