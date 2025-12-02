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
        title: 'My First Month Experience after switch Windows to Linux',
        thumbnail: 'bg-red-100', // Placeholder
        url: '#',
        date: '2025-11-01',
        tags: ['Windows', 'Linux', 'Productivity']
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
        videoId: 'QIyc6NKS5J0',
        quote: "The more ways your see a problem be solved, The more ways that you can solve a problem",
        author: "ThePrimeTime"
    },
    {
        id: '2',
        videoId: 'o8NPllzkFhE',
        quote: "Talk is cheap. Show me the code.",
        author: "Linus Torvalds"
    },
    {
        id: '3',
        videoId: 'tMWJGs3CQ_Q',
        quote: "There are definitely elements of experience... that someone my age wouldn't have. But there are also things that I can do that other people wouldn't necessarily be able to.",
        author: "Mark Zuckerberg"
    },
];
