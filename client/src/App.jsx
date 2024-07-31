import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../public/styles/muiTheme';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Register from './components/register/Register';
import Login from './components/login/Login';

import { AuthContextProvider } from './context/AuthContext';

function App() {

  return (
    <AuthContextProvider >
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
    </AuthContextProvider>
  );
}

export default App;
