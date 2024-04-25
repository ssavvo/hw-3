import * as React from 'react';
import Header from 'components/Header';

import styles from './Layout.module.scss';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`${styles.layout}`}>
      <Header />
      <div className={`${styles.content}`}>{children}</div>
    </div>
  );
};

export default Layout;
