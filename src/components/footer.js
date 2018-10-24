import React, { Component } from 'react';
import '../assets/css/footer.css';
import {Link} from 'react-router-dom';

class Footer extends Component {
    componentDidMount() {
        this.hideOnScroll();
    }

    hideOnScroll() {
        var prevScrollPosition = window.pageYOffset;
        window.onscroll = function() {
        var currentScrollPosition = window.pageYOffset;
        if (prevScrollPosition > currentScrollPosition) {
            document.querySelector(".footer_mic").style.bottom = "0";
        } else {
            document.querySelector(".footer_mic").style.bottom = "-17vh";
        }
        prevScrollPosition = currentScrollPosition;
        }
    }

    render () {
        return (
            <div>
                <div className="footer_mic text-center">
                    <Link to='/recording'>
                        <span className='fa-stack fa-2x'>
                            <i className="far fa-circle fa-5x fa-stack-2x"></i>
                            <i className="fas fa-microphone fa-lg fa-stack-1x fa-inverse"></i>
                        </span>
                    </Link>
                </div>
            </div>
        )
    }
}

export default Footer;