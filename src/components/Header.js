import React from 'react';
import WarrenWegenke from '../images/WarrenWegenkeProfile.jpg';

const Header = () => {
    return (
        <header>
            <div className="profile-div">
                <div className="profile">
                    <img src={WarrenWegenke} alt="Warren Wegenke"/>
                </div>
                <div className="name">
                    <span>Warren Wegenke</span>
                </div>
                <div className="title">
                    <span>Software Engineer</span>
                </div>
            </div>
        </header>
    );
};

export default Header;