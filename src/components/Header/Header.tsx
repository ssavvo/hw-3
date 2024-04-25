
import axios from "axios";
import * as React from 'react';

import Text from 'components/Text';
import GitHubIcon from "../Icons/GitHubIcon";

import styles from './Header.module.scss'

type User = {
    avatar_url: string;
}

const Header = () => {
    const [user, setUser] = React.useState<User>();
    React.useEffect(() => {
        axios.get('https://api.github.com/user', {
            headers: {
                ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
            },
        }).then(res => setUser(res.data))
    }, [])
    return <header className={styles.header}>
        <div className={`container ${styles.headerContainer}`}>
            <div className={styles.headerLogo}>
                <GitHubIcon />
                <Text view='p-20' weight='bold'>
                    GitHub Client
                </Text>
            </div>
            {user?.avatar_url && (
                <img alt={'user avatar'} src={user?.avatar_url} className={styles.headerAvatar} />
            ) }
        </div>
        <div className={styles.headerDivider}></div>
    </header>
}

export default Header;