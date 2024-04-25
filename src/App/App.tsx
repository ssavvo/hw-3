import * as React from 'react';
import './App.scss';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../components/Layout';
import Main from './pages/Main';
import RepoList from './pages/Main/RepoList';
import RepoInfo from './pages/RepoInfo/RepoInfo';

const App: React.FC = () => {
  return (
    <Layout>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />}>
            <Route path=":org" element={<RepoList />} />
          </Route>
          <Route path="/:org/:repo" element={<RepoInfo />} />
        </Routes>
      </BrowserRouter>
    </Layout>
  );
};

export default App;
