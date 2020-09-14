type tikiImage = {
    id: number,
    full_path: string
};

export interface ReviewTiki {
    id: number;
    title: string;
    content: string;
    comment_count: number;
    rating: number;
    images: Array<tikiImage>;
    created_at: number;
    created_by: {
        id: number;
        name: string;
        avatar_url: string;
    }
}