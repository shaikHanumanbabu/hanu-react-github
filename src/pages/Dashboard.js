import React from 'react';
import { Info, Repos, User, Search, Navbar } from '../components';
import loadingImage from '../images/preloader.gif';
import { GithubContext } from '../context/context';
const Dashboard = () => {
  const {loading, setLoading} = React.useContext(GithubContext)
  if(loading) {
    return (
      <main>
      <Search />
      <img src={loadingImage} className='loading-img' />
      </main>
    )
  }
  return (
    <main>
      <Navbar />
      <Search />
      <Info />
      <User />
      <Repos />

    </main>
  );
};

export default Dashboard;
