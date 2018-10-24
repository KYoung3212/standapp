import React, { Component } from 'react';
import '../assets/css/category_modal.css';

class CategoryModal extends Component {
    state = {
        modal: true,
        type: 'comedy'
    }

    toggleModal (string) {
        this.props.select(string);
        this.setState({
            modal: false
        })
    }

    selectComedy () {
        this.toggleModal('comedy')
    }

    selectOthers () {
        this.toggleModal('others')
    }

    render () {
        return (
            <div className={this.state.modal ? "modal-body container-fluid" : "d-none"}>
                    <div className="d-flex justify-content-center modal-title">
                        <div className='catergory-modal-title'>Select category</div>
                    </div>
                    <div className="button-container d-flex">
                        <div className="modal-button">
                            <i className="fas fa-laugh-squint modal-comedy" onClick={this.selectComedy.bind(this)}/>
                            <div className='modal-text'>Comedy</div>
                        </div>
                        <hr id='modal-split'/>
                        <div className="modal-button">
                            <i className="fas fa-microphone-alt modal-others" onClick={this.selectOthers.bind(this)}/>
                            <div className='modal-text'>Others</div>
                        </div>
                    </div>
            </div>
        )
    }
}

export default CategoryModal;