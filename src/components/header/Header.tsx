import React from 'react';
import classes from './Header.module.scss';
import { LogoIcon } from '../../assets/images';
import { Navlink } from '../navlink/Navlink';

export const Header: React.FC = () => {
  return (
    <header className={classes.header}>
      <LogoIcon />
      <nav>
        <Navlink href='#steps' text='How it works' />
        <Navlink href='#benefits' text='benefits' />
        <Navlink href='#contact' text='contact us' />
      </nav>
    </header>
  );
};
