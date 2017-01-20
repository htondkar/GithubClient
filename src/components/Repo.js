import React, {PropTypes} from 'react';

const Repo = ({repo}) => {
  console.log(repo);
  return (
    <div>
      repo name : {repo.name} | {repo.private ? 'private repo' : 'public repo'}
    </div>
  );
}

Repo.propTypes = {
};

export default Repo ;
