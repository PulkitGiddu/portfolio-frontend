import { Link } from 'react-router-dom';
import { Frame, TextLink } from './ui';
import WorkIndex from './WorkIndex';

const Projects = () => {
    return (
        <Frame
            id="projects"
            kicker="Selected work"
            title="Wynklo, then the other products."
            lede="Wynklo is the product I'm building now. Bookit, SnatchMart and Bet2Learn sit beside it."
            action={
                <Link to="/work">
                    <TextLink>All work</TextLink>
                </Link>
            }
        >
            <WorkIndex limit={4} />
        </Frame>
    );
};

export default Projects;
