

import React from 'react';
import PropTypes from 'prop-types';
import { Box } from 'grommet';


const propTypes = {};

const defaultProps = {};





export default function Menu(props) {
    return (

        <Box direction="row" justify='between' fill pad={{
            'top': 'large'
        }}>

            <div>Selected Recipes</div>
            <DayOfTheWeek />
            <DayOfTheWeek />
            <DayOfTheWeek />
        </Box >

    );
}

Menu.propTypes = propTypes;
Menu.defaultProps = defaultProps;

const DayOfTheWeek = () => {
    return <ul className="list pl0 mt0 measure center">
        <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
            <img className="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-mrmrs.jpg" />
            <div className="pl3 flex-auto">
                <span className="f6 db black-70">Mrmrs</span>
                <span className="f6 db black-70">Medium Hexagon, LLC</span>
            </div>
            <div>
                <a href="tel:" className="f6 link blue hover-dark-gray">+1 (999) 555-5555</a>
            </div>
        </li>
        <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
            <img className="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-jxnblk.jpg" />
            <div className="pl3 flex-auto">
                <span className="f6 db black-70">Jxnblk</span>
                <span className="f6 db black-70">Large Circle, Inc</span>
            </div>
            <div>
                <a href="tel:" className="f6 link blue hover-dark-gray">+1 (999) 555-5555</a>
            </div>
        </li>
        <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
            <img className="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-jasonli.jpg" />
            <div className="pl3 flex-auto">
                <span className="f6 db black-70">Jason Li</span>
                <span className="f6 db black-70">Little Blue Square, Inc</span>
            </div>
            <div>
                <a href="tel:" className="f6 link blue hover-dark-gray">+1 (999) 555-5555</a>
            </div>
        </li>
        <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
            <img className="w2 h2 w3-ns h3-ns br-100" src="http://tachyons.io/img/avatar-yavor.jpg" />
            <div className="pl3 flex-auto">
                <span className="f6 db black-70">Yavor</span>
                <span className="f6 db black-70">Large Circle, Inc</span>
            </div>
            <div>
                <a href="tel:" className="f6 link blue hover-dark-gray">+1 (999) 555-5555</a>
            </div>
        </li>
    </ul>;
}

