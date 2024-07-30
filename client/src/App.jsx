import { ThemeProvider } from '@mui/material/styles';
import { Routes, Route } from 'react-router-dom';

import { theme } from '../public/styles/muiTheme';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <div>
      <Header />

      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </main>
      </div>
    </ThemeProvider>
  );
}

export default App;
