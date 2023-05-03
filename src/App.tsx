import React from 'react';
import classes from './App.module.scss';
import { MainContainer } from './containers';

function App() {
  return (
    <div className={classes.app}>
      <header className={classes.header}>
        <h1>XLine</h1>
        <div className={classes.links}>
          <a href='_blank'>Link 1</a>
          <a href='_blank'>Link 2</a>
          <a href='_blank'>Link 3</a>
        </div>
      </header>
      <MainContainer />
      <footer className={classes.footer}>
        <div className={classes.links}>
          <a href='_blank'>Link 1</a>
          <a href='_blank'>Link 2</a>
          <a href='_blank'>Link 3</a>
        </div>
        <p className={classes.about}>
          Armored searobin snake mudhead gombessa pelican gulper sablefish
          luminous hake swallower, saber-toothed blenny sargassum fish southern
          sandfish cobbler, broadband dogfish plaice deep sea anglerfish.
        </p>
      </footer>
    </div>
  );
}

export default App;
