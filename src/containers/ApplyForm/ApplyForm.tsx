import React, { useEffect, useState } from 'react';
import classes from './ApplyForm.module.scss';
import Modal from 'react-modal';
import { LogoBlackIcon, CrossIcon } from '../../assets/images';
import { useForm } from '@formspree/react';

export const ApplyForm: React.FC = () => {
  const [isOpen, openModal] = useState(false);
  const [state, handleSubmit] = useForm('mrgvjvkw');
  useEffect(() => {
    if (state.succeeded) {
      openModal(false);
    }
  }, [state]);
  return (
    <React.Fragment>
      <button
        type='button'
        className={classes.button}
        onClick={() => {
          openModal((prev) => !prev);
        }}
      >
        Apply now
      </button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => openModal(false)}
        className={classes.modal}
        overlayClassName={classes.overlay}
      >
        <form onSubmit={handleSubmit} className={classes.content}>
          <button
            type='button'
            onClick={() => openModal(false)}
            className={classes.closeButton}
          >
            <CrossIcon />
          </button>
          <LogoBlackIcon className={classes.logo} />
          <h1 className={classes.head}>
            Be the First to Experience the{' '}
            <span className={classes.blue}>XLine</span>
          </h1>
          <p className={classes.body}>
            Launching in June 2023, our innovative solution will change the
            game! Stay informed and get early access by leaving your email
            below. We’ll send updates, opportunities, and more!
          </p>
          <div className={classes.inputRow}>
            <div>
              <p>Enter your email address</p>
              <input name='email' type='email' required />
            </div>
            <button type='submit' disabled={state.submitting}>
              Get Me in the Loop
            </button>
          </div>
        </form>
      </Modal>
    </React.Fragment>
  );
};
