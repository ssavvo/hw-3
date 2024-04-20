import * as React from 'react';

import { Outlet, useNavigate } from 'react-router-dom';
import Button from 'components/Button';
import SearchIcon from 'components/Icons/SearchIcon';
import Input from 'components/Input';
import MultiDropdown from 'components/MultiDropdown';
import Text from 'components/Text';

import styles from './Main.module.scss';

const Main: React.FC = () => {
  const navigate = useNavigate();
  const handleSearch = () => {
    navigate('ktsstudio');
  };
  return (
    <div className={`container ${styles.mainContainer}`}>
      <Text view="title" className={`${styles.title}`}>
        List of organization repositories
      </Text>
      <MultiDropdown
        options={[]}
        value={[]}
        getTitle={() => 'Type'}
        onChange={() => null}
        className={styles.dropdown}
      />
      <div className={styles.search}>
        <Input placeholder="Enter organization name" value="" onChange={() => null} />
        <Button type="button" onClick={handleSearch}>
          <SearchIcon />
        </Button>
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
