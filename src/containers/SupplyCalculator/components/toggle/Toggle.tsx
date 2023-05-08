import React from 'react';
import classes from './Toggle.module.scss';
import classNames from 'classnames';

export const Toggle: React.FC<{
  values: string[];
  selected: string;
  onChange: (v: string) => void;
}> = ({ values, selected, onChange }) => {
  return (
    <div className={classes.container}>
      {values.map((v) => {
        const isSelected = v === selected;
        const onClick = () => {
          onChange(v);
        };
        return (
          <button
            key={`toggle_button_${v}`}
            type='button'
            onClick={onClick}
            className={classNames(classes.button, {
              [classes.selected]: isSelected,
            })}
          >
            {v}
          </button>
        );
      })}
    </div>
  );
};
