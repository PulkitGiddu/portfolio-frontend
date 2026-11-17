export type WorkItem = {
    id: number;
    title: string;
    tags: string;
    description: string;
    image?: string;
    url?: string;
};

const PREVIEW_URLS: Record<string, string> = {
    wynklo: 'https://www.wynklo.com/',
    clubmates: 'https://www.clubmates.in/',
    snatchmart: 'https://www.snatchmart.com/',
};

const WORK_ORDER = ['wynklo', 'clubmates', 'snatchmart', 'bookit'];

const compact = (title: string) => title.toLowerCase().replace(/[^a-z0-9]/g, '');

export function orderWork(items: WorkItem[]): WorkItem[] {
    const rank = (title: string) => {
        const key = compact(title);
        const index = WORK_ORDER.findIndex((name) => key.includes(name));
        return index === -1 ? WORK_ORDER.length : index;
    };

    return items
        .map((item) => {
            const key = compact(item.title);
            const known = Object.entries(PREVIEW_URLS).find(([name]) => key.includes(name));
            if (known && !item.url) return { ...item, url: known[1] };
            return item;
        })
        .sort((a, b) => rank(a.title) - rank(b.title) || a.id - b.id);
}

export const FALLBACK_WORK: WorkItem[] = orderWork([
    {
        id: 1,
        title: 'Wynklo',
        tags: 'Product',
        description: 'The product I am building now. Websites, apps, and digital platforms.',
    },
    {
        id: 2,
        title: 'Clubmates',
        tags: 'Product',
        description:
            'A nightlife social platform for finding people who want to go out, make plans and experience the night together.',
    },
    {
        id: 3,
        title: 'SnatchMart',
        tags: 'Product',
        description: 'A commerce product I built and shipped.',
    },
    {
        id: 4,
        title: 'Bookit',
        tags: 'Full stack',
        description:
            'Office room booking. Credits, roles, and a flow that will not give the same room to two people.',
    },
]);

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
