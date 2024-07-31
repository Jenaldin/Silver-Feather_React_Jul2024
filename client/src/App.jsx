import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';

import { theme } from '../public/styles/muiTheme';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Register from './components/register/Register';
import Login from './components/login/Login';
import { AuthContext } from './context/AuthContext';

function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  }

  const contextData = {
    userId: authState._id,
    email: authState.email,
    username: authState.username,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.username,
    changeAuthState,
  };

  return (
    <AuthContext.Provider value={contextData}>
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
    </AuthContext.Provider>
  );
}

export default App;
