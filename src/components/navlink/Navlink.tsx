import React from 'react';
import classes from './Navlilnk.module.scss';

export const Navlink: React.FC<{ href: string; text: string }> = ({
  href,
  text,
}) => {
  return (
    <a href={href} className={classes.link}>
      {text}
    </a>
  );
};
