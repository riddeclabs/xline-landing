import React from 'react';
import classes from './Steps.module.scss';
import {
  ChooseCollateralIcon,
  SetCollateralIcon,
  AdjustUtilizationIcon,
  MonitorAndManageIcon,
} from '../../assets/images';

export const Steps: React.FC = () => {
  return (
    <section id='steps' className={classes.section}>
      <h1 className={classes.title}>How it works</h1>
      <div className={classes.content}>
        <div className={classes.item}>
          <ChooseCollateralIcon className={classes.icon} />
          <p className={classes.head}>Choose Your Collateral</p>
          <p className={classes.body}>
            Select Bitcoin (BTC) or Ethereum (ETH) as the collateral for your
            credit line.
          </p>
        </div>
        <div className={classes.item}>
          <SetCollateralIcon className={classes.icon} />
          <p className={classes.head}>Set Your Collateral Amount</p>
          <p className={classes.body}>
            Use the slider to determine how much crypto you want to supply as
            collateral.
          </p>
        </div>
        <div className={classes.item}>
          <AdjustUtilizationIcon className={classes.icon} />
          <p className={classes.head}>Adjust Utilization</p>
          <p className={classes.body}>
            Choose the percentage of your credit line you want to utilize.
            Remember, higher utilization means a higher risk of liquidation.
          </p>
        </div>
        <div className={classes.item}>
          <MonitorAndManageIcon className={classes.icon} />
          <p className={classes.head}>Monitor & Manage</p>
          <p className={classes.body}>
            Keep track of your collateral value and utilization to avoid
            liquidation. Make adjustments as needed to maintain a healthy
            balance.
          </p>
        </div>
      </div>
    </section>
  );
};
