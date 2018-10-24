import React, { Component } from 'react';
import '../assets/css/about.css';
import Header from './header';
import kevin from '../assets/images/aboutpics/kevinBW.jpg';
import paul from '../assets/images/aboutpics/paulBW.jpg';
import mike from '../assets/images/aboutpics/mikeBW.jpg';
import matt from '../assets/images/aboutpics/mattBW.jpg';


class About extends Component {
    constructor (props) {
        super(props);
    }

    render() {
        return (
            <div className='container-fluid'>
            <Header/>
            <h1 className='about-title'>Our Team</h1>
                <section id="team" className="d-flex justify-content-around">
                <div className="card">
                    <img src={kevin} />
                <div className="data">
                    <h2>Kevin Young</h2>
                    <i>Team Lead</i>
                    <div>Favorite Hobby: MEMES</div>
                    <a target="_blank" href="https://github.com/KYoung3212"><i className="fab fa-github" /></a>
                    <a target="_blank" href="https://www.linkedin.com/in/kevinyoung3212/"><i className="fab fa-linkedin"/></a>
                    <a target="_blank" href="https://kevin-young.us/"><i className="fas fa-briefcase"/></a>
                </div>
            </div>
            <div className="card">
            <img src={paul} />
            <div className="data">
                <h2>Paul Su</h2>
                <i>Lead Frontend Developer</i>
                <div>Favorite Hobby: Video Games</div>
                <a target="_blank" href="http://github.com/paulcysu"><i className="fab fa-github" /></a>
                <a target="_blank" href="http://linkedin.com/in/paulcysu/"><i className="fab fa-linkedin"/></a>
                <a target="_blank" href="https://paulsu.in"><i className="fas fa-briefcase"/></a>
            </div>
            </div>
            <div className="card">
            <img src={mike} />
            <div className="data">
                <h2>Mike Yim</h2>
                <i>Backend Developer</i>
                <div>Favorite Hobby: Tinder</div>
                <a target="_blank" href="http://github.com/mikeyim337"><i className="fab fa-github" /></a>
                <a target="_blank" href="http//linkedin.com/in/mike-yim-033356135/"><i className="fab fa-linkedin"/></a>
                <a target="_blank" href="http://mikeyim.com/"><i className="fas fa-briefcase"/></a>
            </div>
            </div>
            <div className="card">
            <img src={matt} />
            <div className="data">
                <h2>Matt Kirby</h2>
                <i>Backend Developer</i>
                <div>Favorite Hobby: Bartending</div>
                <a target="_blank" href="http://github.com/rag329"><i className="fab fa-github" /></a>
                <a target="_blank" href="http://linkedin.com/in/matthew-kirby-270a3329/"><i className="fab fa-linkedin"/></a>
                <a target="_blank" href="https://matt-kirby.us"><i className="fas fa-briefcase"/></a>
            </div>
            </div>
        </section>
            </div>
        )
    }
}

export default About;