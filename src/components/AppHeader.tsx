import classNames from 'classnames/bind';
import styles from './AppHeader.module.scss';

import { useState, useEffect } from 'react';

const cx = classNames.bind(styles);

interface Props {
  isMobile: boolean;
  mobileMenuOn: boolean;
  currentSection: string;
  setMobileMenuOn: (state: boolean) => void;
  setCurrentSection: (section: string) => void;
}

export function AppHeader({
  isMobile,
  mobileMenuOn,
  currentSection,
  setMobileMenuOn,
  setCurrentSection,
}: Props) {
  const changeState = (state: boolean) => {
    setMobileMenuOn(state);
  };

  return (
    <header className={cx('ix-header')} data-current-nav={currentSection}>
      <div className={cx('ix-logo')}>
        <h1 className={cx('ix-logo-large')}>
          <a href="/" className={cx('link')}>
            INTELLA X
          </a>
        </h1>
      </div>
      {isMobile ? (
        mobileMenuOn ? (
          <div className={cx('ix-navigator')}>
            <button
              type="button"
              className={cx('btn-close')}
              onClick={() => {
                setMobileMenuOn(false);
              }}
            >
              Close
            </button>
            <Navigator mobile={isMobile} changeState={changeState} />
          </div>
        ) : (
          <button
            type="button"
            className={cx('btn-menu')}
            onClick={() => {
              setMobileMenuOn(true);
            }}
          >
            Menu
          </button>
        )
      ) : (
        <div className={cx('ix-navigator')}>
          <Navigator mobile={isMobile} setCurrentSection={setCurrentSection} />
        </div>
      )}
    </header>
  );
}

function Navigator(props: any) {
  function navClick() {
    if (props.mobile) props.changeState(false);
  }

  return (
    <nav className={cx('ix-navi-list')}>
      {props.mobile && <i className={cx('ix-full-logo')}>INTELLA X</i>}
      <ul className={cx('list')}>
        <li className={cx('item')} data-nav="about">
          <a href="#about" className={cx('link')} onClick={navClick}>
            About INTELLA X
          </a>
        </li>
        <li className={cx('item')} data-nav="ecosystem">
          <a href="#ecosystem" className={cx('link')} onClick={navClick}>
            Ecosystem
          </a>
        </li>
        <li className={cx('item')}>
          <a
            href="/pdf/intella-x-whitepaper.pdf"
            download
            className={cx('link')}
          >
            Whitepaper
          </a>
        </li>
        <li className={cx('item')} data-nav="contact">
          <a href="#contact" className={cx('link')} onClick={navClick}>
            Contact Us
          </a>
        </li>
      </ul>
    </nav>
  );
}
