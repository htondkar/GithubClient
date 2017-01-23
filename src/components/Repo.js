import React, {PropTypes} from 'react';
import Modal from 'react-modal';
import toastr from 'toastr';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 0,
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)',
    minHeight             : '300px',
    minWidth             : '300px'
  }
};

export default class Repo extends React.Component {
  constructor() {
    super();
    this.state = {
      forkedRepos: new Set(),
      forkModalIsOpen: false,
      issuesModalIsOpen: false,
      asyncCall: false
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.forkedRepos) {
      this.setState({forkedRepos: nextProps.forkedRepos});
    }
  }

  openForksModal = (repoName) => {
    this.props.fetchRepoForks(repoName);
     this.setState({
       forkModalIsOpen: true,
       asyncCall: true
     });

 }

 closeForksModal = () => {
   this.setState({forkModalIsOpen: false});
 }

  openIssuesModal = (repoName) => {
    this.props.fetchRepoIssues(repoName);
     this.setState({
       issuesModalIsOpen: true,
       asyncCall: true
     });

 }
 closeIssuesModal = () => {
   this.setState({issuesModalIsOpen: false});
 }

 forkRepo = (repoFullName) => {
   this.props.forkRepo(repoFullName)
   .then(() => toastr.success(`you successfuly forked ${repoFullName}`))
   .catch((err) => toastr.error(err))
 }

  render() {
    const repo = this.props.repo;
    const isForked = (this.state.forkedRepos.has(repo.full_name.substr(repo.full_name.indexOf("/") + 1)));
    console.log(repo.full_name);
    console.log(this.state.forkedRepos);
    const forks = this.props.forksList[repo.full_name] || [];
    const issues = this.props.issuesList[repo.full_name] || [];
    return (
      <li>
        <div>
          {`repository name: ${repo.name} |
          ${repo.private ? 'type: private' : 'type: public'} |
          forks: ${repo.forks} |
          issues: ${repo.open_issues} |
          watchers: ${repo.watchers} |
          this is a ${repo.language} code base |
          last push: ${repo.pushed_at}
          `}
        </div>

        <button onClick={()=>this.openForksModal(repo.full_name)}>see forks</button>
        <button onClick={()=>this.openIssuesModal(repo.full_name)}>see issues</button>
        <button
          onClick={()=>this.forkRepo(repo.full_name)}
          disabled={isForked}>
          {isForked ? 'already forked' : 'fork it'}
        </button>

        <Modal
          isOpen={this.state.forkModalIsOpen}
          onRequestClose={this.closeForksModal}
          style={customStyles}
          contentLabel="Forks Modal"
        >
            <h2>forks list</h2>
            <button onClick={this.closeForksModal}>close</button>
            <ol id="forks">
              {forks.length == 0 ? 'No forks' : 'last 30 forks'}
              {forks.map(fork=>{
                return (<li key={fork.id}>
                  {`forked by ${fork.owner.login} | at ${fork.created_at}`}
                </li>)
                })
              }
            </ol>
        </Modal>

        <Modal
          isOpen={this.state.issuesModalIsOpen}
          onRequestClose={this.closeIssuesModal}
          style={customStyles}
          contentLabel="Issues Modal"
        >
            <h2>issues list</h2>
            <button onClick={this.closeIssuesModal}>close</button>
            <ul id="issues">
              {issues.length == 0 ? 'No issues' : 'last 30 open issues'}
              {issues.map(issue=>{
                return (<li key={issue.number}>
                    {`issue #${issue.number}: ${issue.title} | by ${issue.user.login} | on ${issue.created_at}`}
                  </li>)
                })
              }
            </ul>
        </Modal>
      </li>
    );
  }
}

Repo.propTypes = {
};
