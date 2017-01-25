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

function includes(arr, item) {
    return (arr.indexOf(item) != -1);
}

export default class Repo extends React.Component {
  constructor() {
    super();
    this.state = {
      forkedRepos: new Set(),
      watchedRepos: [],
      forkModalIsOpen: false,
      issuesModalIsOpen: false,
      asyncCall: false
    };
  }

  componentWillReceiveProps(nextProps){
    if (nextProps.forkedRepos) {
      this.setState({forkedRepos: nextProps.forkedRepos});
    }
    if (nextProps.watchedRepos) {
      this.setState({watchedRepos: nextProps.watchedRepos});
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

 watchRepo = (repoFullName) => {
   this.props.watchRepo(repoFullName)
   .then(() => toastr.success(`you successfuly watched ${repoFullName}`))
   .catch((err) => toastr.error(err))
 }

 createIssue = (repoFullName) => {
   const title = this.refs.issueTitle.value
   const Body = this.refs.issueBody.value
   this.props.createIssue(title, Body, repoFullName)
   .then(() => {
     this.refs.issueForm.reset()
   })
   .catch((err) => toastr.error(err))
 }

  render() {
    const repo = this.props.repo;
    const isForked = (this.state.forkedRepos.has(repo.full_name.substr(repo.full_name.indexOf("/") + 1)));
    const isWatched = this.state.watchedRepos.includes(repo.full_name);
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
        <div className="btn-group">
          <button
            onClick={()=>this.openForksModal(repo.full_name)}
            className="btn btn-primary">
            see forks
          </button>
          <button
            onClick={()=>this.openIssuesModal(repo.full_name)}
            className="btn btn-primary">
            see issues
          </button>
          <button
            className="btn btn-primary"
            onClick={()=>this.forkRepo(repo.full_name)}
            disabled={isForked}>
            {isForked ? 'already forked' : 'fork it'}
          </button>
          <button
            className="btn btn-primary"
            onClick={()=>this.watchRepo(repo.full_name)}
            disabled={isWatched}>
            {isWatched ? 'already watched' : 'watch it'}
          </button>
        </div>
        <button data-toggle="collapse" data-target="#issue">new issue</button>
        <div className="collapse" id="issue">
          <form ref="issueForm" className="form-group">
            <input type="text" ref="issueTitle" placeholder="title" className="form-control"/>
            <input type="text" ref="issueBody" placeholder="body" className="form-control"/>
            <botton
              onClick={()=>this.createIssue(repo.full_name)}
              className="btn btn-default">
              create issue!
            </botton>
          </form>
        </div>

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
