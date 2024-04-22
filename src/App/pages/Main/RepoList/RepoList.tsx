import axios from 'axios';
import * as React from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Card from 'components/Card';
import StarIcon from "components/Icons/StarIcon";
import Text from "components/Text";
import defaultPic from './Rectangle.png';
import styles from './RepoList.module.scss';

export type Repo = {
  id: number;
  name: string;
  description: string;
  stargazers_count: string;
  updated_at: string;
};

const RepoList = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [repoList, setRepoList] = React.useState<Repo[]>([]);
  React.useEffect(() => {
    axios
      .get(`https://api.github.com/orgs/${params.org}/repos`, {
        headers: {
          ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
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
          captionSlot={(<div className={styles.caption}>
            <div className={styles.stars}>
              <StarIcon width={14} height={14} />
              <Text view={'p-14'} weight={'medium'} color={'secondary'}>
                {repo.stargazers_count}
              </Text>
            </div>
            <Text view={'p-14'} weight={'medium'} color={'secondary'}>
              {`Updated ${new Date(repo.updated_at).toLocaleDateString('en', {day: 'numeric'})} ${new Date(repo.updated_at).toLocaleDateString('en', {month: 'short'})}`}
            </Text>
          </div>)}
          title={repo.name}
          subtitle={repo.description}
          onClick={() => handleRepoSelect(repo.name)}
        />
      ))}
      <div>

      </div>
    </div>
  );
};

export default RepoList;
