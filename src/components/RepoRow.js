import React, {PropTypes} from 'react';

const RepoRow = (result) => {
  const item = result.result;


  console.log (item);
  return (
    <div>
      <li>
        {item.name} |
        {item.forks ? ' forked ' : ' not forked '}
        {item.forks ? item.forks + ' times' : ''} |
        <a href="#"> see forks</a>
      </li>
    </div>
  );
}

RepoRow.propTypes = {
};

export default RepoRow;
