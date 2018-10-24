import React, { Component } from 'react';
import '../assets/css/newsfeed.css';
import VisualizerPlayer from './visualizer_player';
import { getNewsfeed } from '../actions';
import { connect } from 'react-redux';

class NewsFeed extends Component {
    state = {
        newsFeed: ''
    }

    componentWillMount = () => {
        this.props.getNewsfeed();
    }

    updateNewsfeed () {
        this.props.getNewsfeed();
    }

    render () {
        if (this.props.list.data) {
            this.renderNewsFeed = this.props.list.data.map((element) => {
                return(
                    <VisualizerPlayer key={element.id} audio={element} update={this.updateNewsfeed.bind(this)}/>
                )
            })
        }
        
        return (
            <div className='newsfeed'>
                {this.renderNewsFeed}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        list: state.feed.all
        
    }
}

export default connect(mapStateToProps, {getNewsfeed})(NewsFeed);
