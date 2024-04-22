import axios from 'axios';
import * as React from 'react';
import {Link, useParams} from 'react-router-dom';

import ArrowLeftIcon from 'components/Icons/ArrowLeftIcon';
import EyeIcon from "components/Icons/EyeIcon";
import ForkIcon from "components/Icons/ForkIcon";
import LinkIcon from 'components/Icons/LinkIcon';
import StarIcon from "components/Icons/StarIcon";
import Text from 'components/Text';

import defaultPic from '../Main/RepoList/Rectangle.png';
import styles from './RepoInfo.module.scss';

type RepoData = {
  homepage: string;
  topics: string[];
  forks_count: number;
  watchers_count: number;
  stargazers_count: number;
  contributors_url: string;
  languages_url: string;
};

type Contributor = {
  id: number;
  login: string;
  name: string;
  avatar_url: string;
  url: string;
}

const colors = ['#3178c6', '#e34c26', '#f1e05a', '#563d7c','#A97BFF']

const RepoInfo = () => {
  const params = useParams();
  const [repoData, setRepoData] = React.useState<RepoData>();
  const [repoReadme, setRepoReadme] = React.useState<string>();
  const [contributorList, setContributorList] = React.useState<Contributor[]>();
  const [languageList, setLanguageList] = React.useState<{[k: string]: number}>();

  React.useEffect(() => {
    const { org, repo } = params;
    axios
      .get(`https://api.github.com/repos/${org}/${repo}`, {
        headers: {
          Accept: 'application/vnd.github+json',
          ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
        },
      })
      .then((res) => setRepoData(res.data));
    axios.get(`https://api.github.com/repos/${org}/${repo}/readme`, {
      headers: {
        Accept: 'application/vnd.github.html+json',
        ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
      },
    }).then(res => {
      setRepoReadme(res.data)
    })
  }, [params]);
  React.useEffect(() => {
    if (!repoData) {
      return;
    }
    axios.get(repoData.contributors_url, {
      headers: {
        ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
      },
    }).then(res => Promise.all(res.data.map((contr: Contributor) => axios.get(contr['url'], {
      headers: {
        ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
      }
    })))).then(res => setContributorList(res.map(r => r.data)));
    axios.get(repoData.languages_url, {
      headers: {
        ...(import.meta.env.VITE_GITHUB_SECRET ? {Authorization: `Bearer ${import.meta.env.VITE_GITHUB_SECRET}`} : {})
      },
    }).then(res => {
      const totalSum = Object.values(res.data).reduce((sum: number, item: number) => sum += item, 0);
      for (const [key, value] of Object.entries<number>(res.data)) {
        res.data[key] = Math.trunc((value / totalSum) * 1000) / 10;
      }
      setLanguageList(res.data);
    });
  }, [repoData])
  return (
    <div className="container">
      <div className={styles.title}>
        <Link to={-1}>
          <ArrowLeftIcon width={32} height={32} color="accent" />
        </Link>
        <img alt="Repo Image" src={defaultPic} className={styles.image} />
        <Text view="title" tag={'h1'}>{params.repo}</Text>
      </div>
      {repoData && (
        <div className={styles.about}>
          {
            repoData?.homepage && (
                  <div className={styles.links}>
                    <LinkIcon width={16} height={16} color="primary"/>
                    <a href={repoData?.homepage} target={'_blank'} rel={'noreferrer'} className={styles.link}>
                      <Text view={'p-16'} weight={"bold"}>
                        {new URL(repoData?.homepage).hostname}
                      </Text>
                    </a>
                  </div>
              )
          }
          {
            repoData?.topics.length > 0 && (
                <div className={styles.topics}>
                  {repoData.topics.map(topic => (
                      <p
                        className={styles.topic}
                        key={topic}>
                    {topic}
                  </p>))}
                </div>
              )
          }
          <ul className={styles.shareList}>
            <li className={styles.shareItem}>
              <StarIcon width={16} height={16} color={"secondary"}/>
              <Text view={'p-14'} color={'secondary'}>
                <strong>{repoData.stargazers_count}</strong> stars
              </Text>
            </li>
            <li className={styles.shareItem}>
              <EyeIcon width={16} height={16} color={"secondary"}/>
              <Text view={'p-14'} color={'secondary'}>
                <strong>{repoData.watchers_count}</strong> watching
              </Text>
            </li>
            <li className={styles.shareItem}>
              <ForkIcon width={16} height={16} color={"secondary"}/>
              <Text view={'p-14'} color={'secondary'}>
                <strong>{repoData.forks_count}</strong> forks
              </Text>
            </li>
          </ul>
          <div className={styles.details}>
            {contributorList && (
                <ul className={styles.contributors}>
                  <div className={styles.contributorsTitle}>
                    <Text view={'p-18'} weight={'bold'} tag={'h2'}>Contributors</Text>
                    <span className={styles.contributorsBadge}>{contributorList.length}</span>
                  </div>
                  {contributorList.map(contr => {
                    return (
                        <li key={contr.id} className={styles.contributor}>
                          <img alt={'avatar'} src={contr.avatar_url} className={styles.avatar}/>
                          <div className={styles.contributorNames}>
                            <Text view={'p-16'} weight={'bold'}>{contr.login}</Text>
                            {contr.name && (
                                <Text view={'p-16'} color={'secondary'}>{contr.name}</Text>
                            )}
                          </div>
                        </li>
                    )
                  })}
                </ul>
            )}
            {
              languageList && (
                  <div className={styles.languages}>
                    <Text view={'p-18'} weight={'bold'} tag={'h2'}>Languages</Text>
                    <div className={styles.bar}>
                      {Object.entries(languageList).map(([lang, percent], index) => (
                          <div
                              key={lang}
                              className={styles.barSegment}
                              style={{
                                width: `${percent}%`,
                                '--bg': colors[index] ? colors[index]: 'gray'
                              }}></div>
                      ))}
                    </div>
                    <div className={styles.barLegend}>
                      {Object.entries(languageList).map(([lang, percent], index) => (
                          <div
                              key={lang}
                              className={styles.barLegendItem}>
                            <div className={styles.barLegendMarker} style={{
                              '--bg': colors[index] ? colors[index]: 'gray'
                            }}></div>
                            <Text view={'p-14'}>
                              {lang}&nbsp;
                            </Text>
                            <Text view={'p-14'} color={'secondary'}>
                              {percent}%
                            </Text>
                          </div>
                      ))}
                    </div>
                  </div>
                )
            }
          </div>
          <div className={styles.readmeArea}>
            <p className={styles.readme}>README.md</p>
            <div className={styles.markup} dangerouslySetInnerHTML={{__html: repoReadme!}}/>
          </div>
        </div>
      )}
    </div>
  );
};

export default RepoInfo;
