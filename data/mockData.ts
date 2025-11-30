export type MediaType = 'youtube' | 'tiktok' | 'article';

export interface FeedItem {
    id: string;
    type: MediaType;
    title: string;
    thumbnail: string; // URL or placeholder color
    url: string;
    date: string;
    tags: string[];
}

export const feedData: FeedItem[] = [
    {
        id: '1',
        type: 'youtube',
        title: 'Building a 3D Portfolio with Three.js',
        thumbnail: 'bg-red-100', // Placeholder
        url: '#',
        date: '2023-10-15',
        tags: ['Three.js', 'React', '3D']
    },
    {
        id: '2',
        type: 'tiktok',
        title: 'CSS Grid vs Flexbox in 60s',
        thumbnail: 'bg-blue-100',
        url: '#',
        date: '2023-10-18',
        tags: ['CSS', 'Tips']
    },
    {
        id: '3',
        type: 'article',
        title: 'Why I rewrote my entire backend in Rust',
        thumbnail: 'bg-gray-100',
        url: '#',
        date: '2023-10-20',
        tags: ['Rust', 'Backend', 'Opinion']
    },
    {
        id: '4',
        type: 'youtube',
        title: 'GSAP Animations for Beginners',
        thumbnail: 'bg-green-100',
        url: '#',
        date: '2023-10-25',
        tags: ['GSAP', 'Animation']
    },
    {
        id: '5',
        type: 'tiktok',
        title: 'My VS Code Setup 2024',
        thumbnail: 'bg-purple-100',
        url: '#',
        date: '2023-10-28',
        tags: ['VS Code', 'Productivity']
    },
    {
        id: '6',
        type: 'article',
        title: 'The Art of Iteration',
        thumbnail: 'bg-yellow-100',
        url: '#',
        date: '2023-11-01',
        tags: ['Philosophy', 'Design']
    }
];

export interface TimelineItem {
    id: string;
    title: string;
    description: string;
    status: 'fail' | 'success' | 'learning';
    date: string;
}

export const timelineData: TimelineItem[] = [
    {
        id: '1',
        title: 'First React App',
        description: 'Tried to build a clone of Facebook. Got overwhelmed by state management.',
        status: 'fail',
        date: '2020'
    },
    {
        id: '2',
        title: 'Learned Redux',
        description: 'Finally understood global state. Built a Todo app that actually works.',
        status: 'learning',
        date: '2020'
    },
    {
        id: '3',
        title: 'Freelance Gig',
        description: 'Landed my first paid client for a restaurant website.',
        status: 'success',
        date: '2021'
    },
    {
        id: '4',
        title: 'SaaS Startup',
        description: 'Spent 6 months building a tool nobody wanted. Zero users.',
        status: 'fail',
        date: '2022'
    },
    {
        id: '5',
        title: 'Senior Engineer',
        description: 'Promoted to Senior Frontend Engineer at Tech Corp.',
        status: 'success',
        date: '2023'
    }
];

export interface InspirationItem {
    id: string;
    videoId: string; // YouTube Video ID
    quote: string;
    author: string;
}

export const inspirationData: InspirationItem[] = [
    {
        id: '1',
        videoId: 'M7lc1UVf-VE', // Example: Rick Astley (Classic placeholder) or something relevant
        quote: "Simplicity is the ultimate sophistication.",
        author: "Leonardo da Vinci"
    },
    {
        id: '2',
        videoId: '9xwazD5SyVg', // Example: Lofi Girl
        quote: "Design is not just what it looks like and feels like. Design is how it works.",
        author: "Steve Jobs"
    },
    {
        id: '3',
        videoId: 'eI4an8aSsgw', // Example: Coding train
        quote: "Move fast and break things. Unless you are breaking stuff, you are not moving fast enough.",
        author: "Mark Zuckerberg"
    },
    {
        id: '4',
        videoId: 'aircAruvnKk', // Example: 3Blue1Brown
        quote: "The details are not the details. They make the design.",
        author: "Charles Eames"
    },
    {
        id: '5',
        videoId: 'SqcY0GlETPk', // Example: React Conf
        quote: "Digital design is like painting, except the paint never dries.",
        author: "Neville Brody"
    }
];
