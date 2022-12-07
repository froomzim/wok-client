export interface iResponse<T> {
    status: number;
    data: T;
    message: string;
}