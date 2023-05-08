import React from 'react';
import classes from './Main.module.scss';
import { Header } from '../../components/header/Header';
import classNames from 'classnames';
import { ApplyForm } from '../ApplyForm/ApplyForm';
import { SupplyCalculator } from '../SupplyCalculator/SupplyCalculator';

export const Main: React.FC = () => {
  return (
    <section className={classes.section}>
      <Header />
      <div className={classes.content}>
        <div className={classes.block}>
          <h1 className={classes.title}>
            Unlock the Value of Your Crypto with Our
          </h1>
          <h1 className={classNames(classes.title, classes.blue)}>
            CRYPTO-Backed Credit Line
          </h1>
          <h3 className={classes.subtitle}>
            Secure, flexible, and instant access to funds without selling your
            BTC or ETH.
          </h3>
          <ApplyForm />
        </div>
        <SupplyCalculator />
      </div>
    </section>
  );
};
