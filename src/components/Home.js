import React from 'react'
import Header from './Header';
import ProjectsSummary from './ProjectsSummary';
import SkillsSummary from './SkillsSummary';
import ContactSummary from './ContactSummary';

const Home = () => {
    return (
        <main>
            <Header/>
            <div className="container">
                <ProjectsSummary/>
                <SkillsSummary/>
                <ContactSummary/>
            </div>
        </main>
    )
}

export default Home;