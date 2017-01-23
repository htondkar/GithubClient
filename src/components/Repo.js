import React, {PropTypes} from 'react';
import Modal from 'react-modal';


const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

export default class Repo extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      asyncCall: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {

   this.setState({modalIsOpen: true});
   this.props.fetchForks()
 }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {

    const repo = this.props.repo;
    console.log(repo);
    repo
    return (
      <div>
        repo name : {repo.name} | {repo.private ? 'private repo' : 'public repo'}

        <button onClick={this.openModal}>forks</button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >

          <h2 ref="subtitle">Hello</h2>
          <button onClick={this.closeModal}>close</button>
          <div id="forks">I am a modal</div>
        </Modal>

      </div>
    );
  }
}

Repo.propTypes = {
};
