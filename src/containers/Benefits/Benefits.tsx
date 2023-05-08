import React, { useState } from 'react';
import classes from './Benefits.module.scss';
import { SVGIcon } from '../../types';
import {
  CreditCardIcon,
  CreditCardWhiteIcon,
  PaymentIcon,
  PaymentWhiteIcon,
  RatesIcon,
  RatesWhiteIcon,
  WalletIcon,
  WalletWhiteIcon,
} from '../../assets/images';
import classNames from 'classnames';

const Item: React.FC<{
  head: string;
  body: string;
  Icon: SVGIcon;
  HoverIcon: SVGIcon;
}> = ({ head, body, Icon, HoverIcon }) => {
  const [isHovered, setHovered] = useState(false);
  return (
    <div
      className={classNames(classes.item, { [classes.itemHovered]: isHovered })}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {isHovered ? <HoverIcon /> : <Icon />}
      <p className={classes.head}>{head}</p>
      <p className={classes.body}>{body}</p>
    </div>
  );
};

export const Benefits: React.FC = () => {
  return (
    <section id='benefits' className={classes.section}>
      <h1 className={classes.title}>Benefits</h1>
      <div className={classes.content}>
        <Item
          head='No Credit Checks'
          body='Access funds without the hassle of traditional credit checks.'
          Icon={CreditCardIcon}
          HoverIcon={CreditCardWhiteIcon}
        />
        <Item
          head='Flexible Repayment'
          body='Repay your loan at your own pace with no prepayment penalties.'
          Icon={PaymentIcon}
          HoverIcon={PaymentWhiteIcon}
        />
        <Item
          head='Competitive Rates'
          body='Enjoy low interest rates and minimal fees.'
          Icon={RatesIcon}
          HoverIcon={RatesWhiteIcon}
        />
        <Item
          head='Keep Your Crypto'
          body='Maintain ownership of your crypto assets while leveraging their value.'
          Icon={WalletIcon}
          HoverIcon={WalletWhiteIcon}
        />
      </div>
    </section>
  );
};
