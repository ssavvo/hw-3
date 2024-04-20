import * as React from 'react';
import Text from 'components/Text';

import styles from './Header.module.scss'


const Header = () => {
    return <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
            <div className={styles.headerLogo}>
                <div style={{
                    height: '32px',
                    width: '32px',
                    backgroundColor: 'black'
                }}></div>
                <Text view='p-20' weight='bold'>
                    GitHub Client
                </Text>
            </div>
            <div style={{
                    height: '32px',
                    width: '32px',
                    backgroundColor: 'black'
            }}></div>
        </div>
        <div className={styles.headerDivider}></div>
    </header>
}

export default Header;