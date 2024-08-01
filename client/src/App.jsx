import { Routes, Route, Navigate } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import { theme } from '../public/styles/muiTheme';

import { AuthContextProvider } from './context/AuthContext';

import Header from './components/header/Header';
import Home from './components/home/Home';
import About from './components/about/About';
import Register from './components/register/Register';
import Login from './components/login/Login';
import NotFound from './components/not-found/NotFound';
import PostList from './components/post/PostList';
import ProfileDetails from './components/profile/ProfileDetails';
import CharacterList from './components/character/CharacterList';
import CharacterAdd from './components/character/CharacterAdd';
import CharacterEdit from './components/character/CharacterEdit';
import CharacterDetails from './components/character/CharacterDetails';
import CampaignList from './components/campaign/CampaignList';
import CampaignAdd from './components/campaign/CampaignAdd';
import CampaignDetails from './components/campaign/CampaignDetails';
import CampaignEdit from './components/campaign/CampaignEdit';
import PostAdd from './components/post/PostAdd';
import PostDetails from './components/post/PostDetails';
import PostEdit from './components/post/PostEdit';
import PrivateGuard from './components/common/PrivateGuard';

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
              <Route path="/not-found" element={<NotFound />} />
              <Route element={<PrivateGuard />}></Route>
              <Route path='/register' element={<Register />} />
              <Route path='/sign-in' element={<Login />} />
              <Route path='/adventurers-board' element={<PostList />} />
              <Route element={<PrivateGuard />}>
                <Route path='/adventurers-board/posts/new' element={<PostAdd />} />
                <Route path='/adventurers-board/posts/:id' element={<PostDetails />} />
                <Route path='/adventurers-board/posts/edit/:id' element={<PostEdit />} />
                <Route path='/my-boards/:username' element={<ProfileDetails />} />
                <Route path='/my-boards/:username/characters' element={<CharacterList />} />
                <Route path='/my-boards/:username/characters/new' element={<CharacterAdd />} />
                <Route path='/my-boards/:username/characters/:id' element={<CharacterDetails />} />
                <Route path='/my-boards/:username/characters/edit/:id' element={<CharacterEdit />} />
                <Route path='/my-boards/:username/campaigns' element={<CampaignList />} />
                <Route path='/my-boards/:username/campaigns/new' element={<CampaignAdd />} />
                <Route path='/my-boards/:username/campaigns/:id' element={<CampaignDetails />} />
                <Route path='/my-boards/:username/campaigns/edit/:id' element={<CampaignEdit />} />
              </Route>
              <Route path="*" element={<Navigate to="/not-found" replace />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </AuthContextProvider>
  );
}

export default App;
