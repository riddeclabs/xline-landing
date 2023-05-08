import React from 'react';
import classes from './App.module.scss';
import { Main } from './containers/Main/Main';
import { Steps } from './containers/Steps/Steps';
import { Benefits } from './containers/Benefits/Benefits';
import { Risks } from './containers/Risks/Risks';
import { Footer } from './components/footer/Footer';

function App() {
  return (
    <div className={classes.app}>
      <Main />
      <Steps />
      <Benefits />
      <Risks />
      <Footer />
    </div>
  );
}

export default App;
