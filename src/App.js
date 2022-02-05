import React, { Fragment } from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import { useLocation } from "react-router";

import PageContainer from './components/PageContainer';
import Home from './pages/Home';
import Header from './components/Header';
import Repos from './pages/Repos';
import BusinessCard from './components/BusinessCard';
import NotFound from './pages/NotFound';

function App() {

  if(useLocation().pathname === '/card'){
    return(
      <BusinessCard />
    );
  }

  return (
    <Fragment>
      <Header />
        <PageContainer>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/repos" element={<Repos />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </PageContainer>
    </Fragment>
  );
}

export default App;