import { Link } from 'react-router-dom';
import { Frame, TextLink } from './ui';
import WorkIndex from './WorkIndex';

const Projects = () => {
    return (
        <Frame
            id="projects"
            kicker="Work"
            title="A few things I shipped."
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
