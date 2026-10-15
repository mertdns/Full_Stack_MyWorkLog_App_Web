export interface WorkType{
    id:number;
    date:string;
    explanation?:string;
}

export interface WorkSliceType{
    works: Array<WorkType>;
    filteredWorks: Array<WorkType> | null;
}
