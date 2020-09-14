export interface ProductsTiki {
    data: [{
        id: number
    }];
    filters: [{
        query_name: string;
        values: [{
            display_value: string;
            query_value: number;
        }];
    }];
}