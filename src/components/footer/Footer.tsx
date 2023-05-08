import React from 'react';
import classes from './Footer.module.scss';
import { ApplyForm } from '../../containers/ApplyForm/ApplyForm';
import { LogoIcon } from '../../assets/images';
import { Navlink } from '../navlink/Navlink';

export const Footer: React.FC = () => {
  return (
    <footer id='contact' className={classes.footer}>
      <div className={classes.actionRow}>
        <h1 className={classes.text}>
          Get Your{' '}
          <span className={classes.blue}>Crypto-Backed Credit Line</span> Today!
        </h1>
        <ApplyForm />
      </div>
      <div className={classes.bottomNavgigation}>
        <LogoIcon />
        <nav>
          <Navlink href='#steps' text='How it works' />
          <Navlink href='#benefits' text='benefits' />
          <Navlink href='#contact' text='contact us' />
        </nav>
      </div>
    </footer>
  );
};
