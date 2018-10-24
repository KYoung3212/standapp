import React from "react";
import Slider from "react-slick";
import "../../node_modules/slick-carousel/slick/slick.css";
import "../../node_modules/slick-carousel/slick/slick-theme.css";
import defaultAvatar from '../assets/images/avatars/default_avatar.png'
import Dj from '../assets/images/avatars/2brettDj.jpg';
import Tuba from '../assets/images/avatars/4codyTuba.jpg';
import Piano from '../assets/images/avatars/6erinPiano.jpg';
import Planet from '../assets/images/avatars/7frankPlanet.jpg';
import Rapper from '../assets/images/avatars/8jennaRapper.jpg';
import Reading from '../assets/images/avatars/9katReading.jpg';
import Soccer from '../assets/images/avatars/10kevinSoccer.jpg';
import Jedi from '../assets/images/avatars/12sarahJedi.jpg';
import Celebrity from '../assets/images/avatars/16nateCelebrity.jpg';
import Sax from '../assets/images/avatars/sax.jpg';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { addAvatar } from '../actions'

class SimpleSlider extends React.Component {
    constructor(props) {
        super(props);
        this.attachAvatarToServer = this.attachAvatarToServer.bind(this);
    }

    attachAvatarToServer (e) {
        const token = localStorage.getItem('token');
        this.props.addAvatar(token, e.target.name);
    }

    render() {
        var settings = {
                    dots: true,
                    infinite: false,
                    speed: 500,
                    slidesToShow: 1,
                    slidesToScroll: 1
                };
        var avatarArray = {
            data: [
                {name: 'Dj', src: Dj, id: 1},
                {name: 'Tuba', src: Tuba, id: 2},
                {name: 'Piano', src: Piano, id: 3},
                {name: 'Planet', src: Planet, id: 4},
                {name: 'Rapper', src: Rapper, id: 5},
                {name: 'Reading', src: Reading, id: 6},
                {name: 'Soccer', src: Soccer, id: 7},
                {name: 'Jedi', src: Jedi, id: 8},
                {name: 'Celebrity', src: Celebrity, id: 9},
                {name: 'Sax', src: Sax, id: 10},
                {name: 'Default', src: defaultAvatar, id: 0}
            ]};
        let feedbackArray = avatarArray.data.map((ele, index) => {
            return(
                <div key={index} className='d-flex justify-content-center'>
                    <Link to='/'>
                        <img name={ele.id} key={ele.id} src={ele.src} onClick={(e) => this.attachAvatarToServer(e)}/>
                    </Link>
                </div>
            )
        });
        return (
            <div>
                <Slider {...settings}>
                    {feedbackArray}
                </Slider>
            </div>
        );
}}

function mapStateToProps (state) {
    return {
        user: state.user.all
    }
}

export default connect(mapStateToProps, { addAvatar })(SimpleSlider);