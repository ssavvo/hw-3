import {ILocalStore} from '../../utils/useLocalStore.ts';
import Meta from "../../utils/Meta.ts";

type RepoItem = {
  homepage: string;
  topics: string[];
  forks_count: number;
  watchers_count: number;
  stargazers_count: number;
  contributors_url: string;
  languages_url: string;
};

export default class GitHubRepoStore {
  private _list: null | RepoItem[] = null;
  private _meta: Meta = Meta.initial;
  async getRepoByOrgName(orgName: string) {
    const response = await
    return response.data;
  }

  async getUser(username: string) {
    const response = await
    return response.data;
  }
}
