export type Event = { 
    id: number;
    title: string;
    description: string;
    content: string;
    image: string | null;
    location: string;
    start_date: string;
    end_date: string | null;
    slug: string;
};