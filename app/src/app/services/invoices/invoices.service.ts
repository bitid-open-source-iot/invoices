import { User } from 'src/app/interfaces/user';
import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/services/api/api.service';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})

export class InvoicesService {

    constructor(private api: ApiService) {};

    public async add(params) {
        return await this.api.post(environment.api, '/api/invoices/add', params);
    };

    public async get(params) {
        return await this.api.post(environment.api, '/api/invoices/get', params);
    };

    public async list(params) {
        return await this.api.post(environment.api, '/api/invoices/list', params);
    };

    public async share(params) {
        return await this.api.post(environment.api, '/api/invoices/share', params);
    };

    public async update(params) {
        return await this.api.post(environment.api, '/api/invoices/update', params);
    };

    public async delete(params) {
        return await this.api.post(environment.api, '/api/invoices/delete', params);
    };

    public async notify(params) {
        return await this.api.post(environment.api, '/api/invoices/notify', params);
    };

    public async download(params) {
        return await this.api.post(environment.api, '/api/invoices/download', params);
    };

    public async unsubscribe(params) {
        return await this.api.post(environment.api, '/api/invoices/unsubscribe', params);
    };

    public async updatesubscriber(params) {
        return await this.api.post(environment.api, '/api/invoices/updatesubscriber', params);
    };

}

interface LineItem {
    'tax':          number;
    'icon':         string;
    'itemId':       string;
    'amount':       number;
    'quantity':     number;
    'description':  string;
}

export interface Invoice {
    'date'?: {
        'paid'?:        any;
        'initialized'?: any;
    };
    'payment'?: {
        'id'?:       string;
        'token'?:    string;
        'gateway'?:  string;
    },
    'recipient'?: {
        'reg'?:          string;
        'vat'?:          string;
        'type'?:         string;
        'name'?:         string;
        'street'?:       string;
        'suburb'?:       string;
        'country'?:      string;
        'townCity'?:     string;
        'postalCode'?:   string;
    };
    'role'?:                number;
    'users'?:               User[];
    'items'?:               LineItem[];
    'status'?:              string;
    'invoiceId'?:           string;
    'description'?:         string;
    'organizationOnly'?:    number;
}