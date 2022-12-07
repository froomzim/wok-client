import { ApiService } from "../api.service";

export interface iRoute {
    apiService: ApiService;
    basePath: string;
}