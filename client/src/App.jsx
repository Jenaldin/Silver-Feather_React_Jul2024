import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';

import { theme } from '../public/styles/muiTheme';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Register from './components/register/Register';
import Login from './components/login/Login';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/register' element={<Register />} />
          <Route path='/sign-in' element={<Login />} />
        </Routes>
      </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
