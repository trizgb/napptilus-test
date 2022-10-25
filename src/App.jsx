import './App.css';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Home from './routes/Home';
import Detail from './routes/Detail';
import Header from './components/Header/Header';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/product/:id' element={<Detail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

const Layout = () => {
  return (
    <>
      <Header />
      <main className='bg-gray-50 py-6 lg:py-8'>
        <Outlet />
      </main>
      {/* <footer>Footer</footer> */}
    </>
  );
};
