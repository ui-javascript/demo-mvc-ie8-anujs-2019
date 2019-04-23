import React from 'react';
import Header from './view/header';
import Leftbar from './view/leftbar';
import Center from './view/center';
import './index.less';

const Home = () => (
  <div>
    <Header />
    <Leftbar />
    <Center />
  </div>
);

export default Home;
