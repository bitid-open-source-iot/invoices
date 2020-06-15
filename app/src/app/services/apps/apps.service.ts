import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class AppsService {

    public data: any[] = [];

    constructor(private api: ApiService) {};

    public async list(params) {
        const response = await this.api.post(environment.auth, '/apps/list', params);
        
        if (response.ok) {
            this.data = response.result;
        };

        return response;
    };

}