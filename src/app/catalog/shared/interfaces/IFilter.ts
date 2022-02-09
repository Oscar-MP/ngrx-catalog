type FilterType = 'text' | 'brand' | 'rating' | 'price';

export interface IFilter {
    type: FilterType;
    action: any;
    reset?: boolean;
}


export interface ITextFilter extends IFilter {
    action: string;
}

export interface IBrandFilter extends IFilter {
    action: string | undefined;
}

export interface IRatingFilter extends IFilter {
    action: number;
}

export interface IPriceFilter extends IFilter {
    action: {
        minPrice: number,
        maxPrice: number
    };
}