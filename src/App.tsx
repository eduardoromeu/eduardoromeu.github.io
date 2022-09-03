import React, { Fragment } from 'react';
import { Routes, Route } from 'react-router-dom';
// import { useLocation } from 'react-router-dom';

import Header from './components/Header/Header';
import PageContainer from './components/PageContainer/PageContainer';

import Home from './pages/Home';
import NotFound from './pages/NotFound';
import Repos from './pages/Repos';


function App() {

  return (
    <Fragment>
      <Header />
      <PageContainer>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/repos" element={<Repos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </PageContainer>
    </Fragment>
  );
}

export default App;
