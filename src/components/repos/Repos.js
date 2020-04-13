import React from 'react';
import Spinner from '../layout/Spinner';
import RepoItem from './RepoItem';

// Emmet: rfc
const Repos = ({ repos, loading }) => {
  if (loading) {
    return <Spinner />;
  }

  return (
    <div>
      {repos.map(repo => (
        <RepoItem key={repo.id} repo={repo} />
      ))}
    </div>
  );
};

export default Repos;
