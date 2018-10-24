import React, { Component } from 'react';
import '../assets/css/comment_bar.css';

class CommentBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: '',
            time: null
        };

    }

    handleInputChange = (e) => {
        const {name, value} = e.target;

        this.setState({
            [name]: value,
        })
    }

    togglePost = (e) => {
        e.preventDefault();
        this.props.post(this.state);
    }

    render () {
        const { message } = this.state
        return (
            <form className="comment-bar input-group d-flex justify-content-center" onSubmit={this.togglePost}>
                <input name="comment" type="text" className="comment-field form-control" placeholder="Comment Here" value={message} onChange={this.handleInputChange}/>
                <div className="comment-button input-group-append">
                    <button className="btn btn-outline-secondary" type="button">
                        <i className="fas fa-comment"/>
                    </button>
                </div>
            </form>
        )
    }
}

export default CommentBar;