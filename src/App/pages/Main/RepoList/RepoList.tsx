import axios from 'axios';
import * as React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Card from 'components/Card';
import defaultPic from './Rectangle.png';
import styles from './RepoList.module.scss';

export type Repo = {
  id: number;
  name: string;
  description: string;
};

const RepoList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [repoList, setRepoList] = React.useState<Repo[]>([]);
  React.useEffect(() => {
    axios
      .get(`https://api.github.com/orgs/${params.org}/repos`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`,
        },
      })
      .then((r) => {
        return setRepoList(r.data);
      });
  }, [params.org]);

  const handleRepoSelect = (name: Repo['name']) => {
    navigate(`/${params.org}/${name}`);
  };

  return (
    <div className={styles.cards}>
      {repoList.map((repo) => (
        <Card
          key={repo.id}
          image={defaultPic}
          title={repo.name}
          subtitle={repo.description}
          onClick={() => handleRepoSelect(repo.name)}
        />
      ))}
    </div>
  );
};

export default RepoList;
