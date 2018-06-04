import React from 'react';
import PropTypes from 'prop-types';
import { fetchPopularRepos } from '../utils/api';
import Loading from './Loading';

// stateless functional component
function SelectLanguage({ selectedLanguage, onSelect }) { // these come from props
  var languages = ['All', 'JavaScript', 'Ruby', 'Java', 'CSS', 'Python'];
  return (
    <ul className='languages'>
      {languages.map((lang) => (
        <li 
          style={lang === selectedLanguage ? {color: '#d0021b'} : null}
          onClick={() => onSelect(lang)}
          key={lang}>
            {lang}
        </li>
      ))}
    </ul>
  )
}

SelectLanguage.propTypes = {
  selectedLanguage: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired
}

// won't destructure this for now
function RepoGrid(props) {
  return (
    <ul className='popular-list'>

      {props.repos.map((repo, index)  => (
          <li key={repo.name} className='popular-item'>
            <div className='popular-rank'>#{index + 1}</div>
            <ul className='space-list-items'>
              <li>
                <img className='avatar' src={repo.owner.avatar_url} alt={repo.owner.login} />
              </li>
              <li>
                <a href={repo.html_url}>{repo.name}</a>
              </li>
              <li>@{repo.owner.login}</li>
              <li>{repo.stargazers_count} stars</li>
            </ul>
          </li>
        ))}
    </ul>
  )
}

RepoGrid.propTypes = {
  repos: PropTypes.array.isRequired
}

class Popular extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedLanguage: 'All',
      repos: null
    }

    this.updateLanguage = this.updateLanguage.bind(this);
  }

  componentDidMount() {
    this.updateLanguage(this.state.selectedLanguage);
  }

  async updateLanguage(lang) {
    this.setState(() => ({selectedLanguage: lang}));

    const repos = await fetchPopularRepos(lang);
    this.setState(() => ({ repos: repos }));
  }

  render() {
    const {selectedLanguage, repos } = this.state;

    return (
      <div>
        <SelectLanguage 
          selectedLanguage={selectedLanguage}
          onSelect={this.updateLanguage} />
        {!repos
          ? <Loading interval={100} />
          : <RepoGrid repos={repos} />}
      </div>
    )
  }
}

export default Popular;