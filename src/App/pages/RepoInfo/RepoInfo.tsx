import axios from 'axios';
import * as React from 'react';
import { useParams } from 'react-router-dom';

import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import LinkIcon from 'components/Icons/LinkIcon';
import Text from 'components/Text';

import defaultPic from '../Main/RepoList/Rectangle.png';
import styles from './RepoInfo.module.scss';

type RepoData = {
  contributors: string[];
  homepage: string;
};

const RepoInfo = () => {
  const params = useParams();
  const [repoData, setRepoData] = React.useState<RepoData>();

  React.useEffect(() => {
    const { org, repo } = params;
    axios
      .get(`https://api.github.com/repos/${org}/${repo}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`,
        },
      })
      .then((res) => setRepoData(res.data));
  }, [params]);

  return (
    <div className="container">
      <div className={styles.title}>
        <ArrowLeftIcon width={32} height={32} color="accent" />
        <img alt="Repo Image" src={defaultPic} className={styles.image} />
        <Text view="title">{params.repo}</Text>
      </div>
      {repoData && (
        <div className={styles.about}>
          <div className={styles.links}>
            <LinkIcon width={16} height={16} color="primary" />
            <a href={repoData?.homepage}>{repoData?.homepage}</a>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoInfo;
