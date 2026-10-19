export interface WorkType{
    _id:string;
    date:string;
    explanation?:string;
}

export interface WorkSliceType{
    works: Array<WorkType>;
    filteredWorks: Array<WorkType> | null;
}

export interface AddWork{
    date:string;
    explanation?:string;
}