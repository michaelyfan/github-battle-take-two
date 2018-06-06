// if needed
const id = 'CLIENT_ID_HERE';
const secret = 'CLIENT_SECRET_HERE';
const params = `?client_id=${id}&client_secret=${secret}`;

async function getProfile(username) {
  const response = await fetch(`https://api.github.com/users/${username}${params}`);
  return repsonse.json();
}

async function getRepos(username) {
  const response = await axios.get(`https://api.github.com/users/${username}/repos${params}#per_page=100`);

  return response.json();
}

function getStarCount(repos) {
  return repos.reduce((accumulation, repo) => (accumulation + repo.stargazers_count), 0);
}

function calculateScore ({ followers }, repos) {
  // super secret algo
  return (followers * 3) + getStarCount(repos);
}

function handleError(error) {
  console.warn(error);
  return null;
}

async function getUserData(player) {
  const [ profile, repos ] = await Promise.all([
    getProfile(player),
    getRepos(player)
  ]);

  return {
    profile,
    score: calculateScore(profile, repos)
  }

}

function sortPlayers(players) {
  return players.sort((a, b) => b.score - a.score)
}

export async function battle(players) {
  const results = await Promise.all(players.map(getUserData))
    .catch(handleError);

  return results === null
    ? results
    : sortPlayers(results)

}

export async function fetchPopularRepos(language) {
  const encodedURI = window.encodeURI(`https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`);

  const response = await fetch(encodedURI)
    .catch(handleError);

  const repos = await response.json();
  return repos.items;
}