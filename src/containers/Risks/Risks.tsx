import React from 'react';
import classes from './Risks.module.scss';

export const Risks: React.FC = () => {
  return (
    <section className={classes.section}>
      <h1 className={classes.title}>Risk Management & Liquidation</h1>
      <div className={classes.info}>
        <h3 className={classes.head}>Protect Your Crypto Investment</h3>
        <p className={classes.body}>
          Monitor the value of your collateral to avoid liquidation. If the
          price of your collateral drops below a certain threshold, your assets
          will be liquidated to cover the loan. Stay informed and make necessary
          adjustments to keep your collateral value above the liquidation price.
        </p>
      </div>
    </section>
  );
};
