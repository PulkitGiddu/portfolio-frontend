export type WorkItem = {
    id: number;
    title: string;
    tags: string;
    description: string;
    image?: string;
    url?: string;
};

export const FALLBACK_WORK: WorkItem[] = [
    {
        id: 1,
        title: 'Bookit',
        tags: 'Full stack',
        description:
            'A meeting-room system for offices. Credits, roles, and a booking flow that refuses a double booking.',
    },
    {
        id: 2,
        title: 'Bet2Learn',
        tags: 'Product',
        description: '',
    },
    {
        id: 3,
        title: 'SnatchMart',
        tags: 'Product',
        description: '',
    },
    {
        id: 4,
        title: 'Wynklo',
        tags: 'Product',
        description: '',
    },
];

type ApiProject = {
    id?: number;
    title?: string;
    tags?: string;
    category?: string;
    description?: string;
    imageData?: string;
    imageContentType?: string;
    image?: string;
    coverImageUrl?: string;
    projectUrl?: string;
    url?: string;
};

export function mapProject(project: ApiProject, index: number): WorkItem {
    let image: string | undefined;
    if (project.imageData && project.imageContentType) {
        image = `data:${project.imageContentType};base64,${project.imageData}`;
    } else if (typeof project.image === 'string' && project.image.length > 0) {
        image = project.image;
    } else if (project.coverImageUrl) {
        image = project.coverImageUrl;
    }

    return {
        id: project.id ?? index + 1,
        title: project.title || 'Untitled',
        tags: project.tags || project.category || 'Project',
        description: project.description || '',
        image,
        url: project.projectUrl || project.url || '',
    };
}
