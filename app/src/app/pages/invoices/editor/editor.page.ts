import * as moment from 'moment';
import { ObjectId } from 'src/app/id';
import { ToastService } from 'src/app/services/toast/toast.service';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { MatTableDataSource } from '@angular/material/table';
import { Router, ActivatedRoute } from '@angular/router';
import { OnInit, Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-invoice-editor',
    styleUrls:      ['./editor.page.scss'],
    templateUrl:    './editor.page.html'
})

export class InvoiceEditorPage implements OnInit, OnDestroy {
    
    constructor(private route: ActivatedRoute, private toast: ToastService, private router: Router, private service: InvoicesService, private formerror: FormErrorService) {};

    public item:            any         = {
        'tax':          15,
        'icon':         '',
        'amount':       0,
        'quantity':     1,
        'description':  ''
    };
    public mode:            string;
    public form:            FormGroup   = new FormGroup({
        'date_due':             new FormControl('', [Validators.required]),
        'description':          new FormControl('', [Validators.required]),
        'recipient_reg':        new FormControl('', [Validators.required]),
        'recipient_vat':        new FormControl('', [Validators.required]),
        'recipient_type':       new FormControl('', [Validators.required]),
        'recipient_name':       new FormControl('', [Validators.required]),
        'recipient_street':     new FormControl('', [Validators.required]),
        'recipient_suburb':     new FormControl('', [Validators.required]),
        'organizationOnly':     new FormControl(0, [Validators.required]),
        'recipient_country':    new FormControl('', [Validators.required]),
        'recipient_townCity':   new FormControl('', [Validators.required]),
        'recipient_postalCode': new FormControl('', [Validators.required])
    });
    public items:           any         = new MatTableDataSource();
    public errors:          any         = {
        'date_due':             '',
        'description':          '',
        'recipient_reg':        '',
        'recipient_vat':        '',
        'recipient_type':       '',
        'recipient_name':       '',
        'recipient_street':     '',
        'recipient_suburb':     '',
        'organizationOnly':     '',
        'recipient_country':    '',
        'recipient_townCity':   '',
        'recipient_postalCode': ''
    };
    public loading:         boolean;
    public columns:         string[]    = ['icon', 'description', 'quantity', 'tax', 'amount', 'options'];
    public invoiceId:       string;
    private subscriptions:  any         = {};

    public add() {
        let valid = true;
        if (typeof(this.item.tax) != "number") {
            valid = false;
        };
        if (typeof(this.item.amount) != "number") {
            valid = false;
        };
        if (typeof(this.item.quantity) != "number") {
            valid = false;
        };
        if (typeof(this.item.description) != "string") {
            valid = false;
        };
        if (valid) {
            this.items.data.push(JSON.parse(JSON.stringify({
                'tax':          this.item.tax,
                'icon':         this.item.icon,
                'itemId':       ObjectId(),
                'amount':       this.item.amount,
                'quantity':     this.item.quantity,
                'description':  this.item.description
            })));
            this.item = {
                'tax':          15,
                'icon':         '',
                'amount':       0,
                'quantity':     1,
                'description':  ''
            };
            this.items.data = JSON.parse(JSON.stringify(this.items.data));
        } else {
            this.toast.error('item is invalid!');
        };
    };

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'role',
                'date',
                'items',
                'recipient',
                'invoiceId',
                'description',
                'organizationOnly'
            ],
            'invoiceId': this.invoiceId
        });

        this.loading = false;

        if (response.ok) {
            if (response.result.role < 3) {
                this.router.navigate(['/invoices']);
                this.toast.error('you do not have permission to access this invoice!');
            };
            this.items.data = response.result.items;
            this.form.controls['date_due'].setValue(moment(response.result.date.due).format('YYYY-MM-DD'));
            this.form.controls['description'].setValue(response.result.description);
            this.form.controls['recipient_reg'].setValue(response.result.recipient.reg);
            this.form.controls['recipient_vat'].setValue(response.result.recipient.vat);
            this.form.controls['recipient_type'].setValue(response.result.recipient.type);
            this.form.controls['recipient_name'].setValue(response.result.recipient.name);
            this.form.controls['recipient_street'].setValue(response.result.recipient.street);
            this.form.controls['recipient_suburb'].setValue(response.result.recipient.suburb);
            this.form.controls['recipient_country'].setValue(response.result.recipient.country);
            this.form.controls['recipient_townCity'].setValue(response.result.recipient.townCity);
            this.form.controls['organizationOnly'].setValue(response.result.organizationOnly);
            this.form.controls['recipient_postalCode'].setValue(response.result.recipient.postalCode);
        } else {
            this.router.navigate(['/invoices']);
            this.toast.error('issue loading invoice!');
        };
    };

    public async submit() {
        this.loading = true;

        let mode = this.mode;

        if (mode == 'copy') {
            mode = 'add';
        };
        
        let params = JSON.parse(JSON.stringify({
            'date': {
                'due': this.form.value.date_due
            },
            'recipient': {
                'reg':          this.form.value.recipient_reg,
                'vat':          this.form.value.recipient_vat,
                'type':         this.form.value.recipient_type,
                'name':         this.form.value.recipient_name,
                'street':       this.form.value.recipient_street,
                'suburb':       this.form.value.recipient_suburb,
                'country':      this.form.value.recipient_country,
                'townCity':     this.form.value.recipient_townCity,
                'postalCode':   this.form.value.recipient_postalCode
            },
            'items':            this.items.data,
            'invoiceId':        this.invoiceId,
            'description':      this.form.value.description,
            'organizationOnly': this.form.value.organizationOnly
        }));
        
        this.form.disable();

        const response = await this.service[mode](params);
        
        this.form.enable();

        this.loading = false;

        if (response.ok) {
            this.router.navigate(['/invoices']);
            if (mode == 'add') {
                this.toast.success('invoice was added!');
            } else {
                this.toast.success('invoice was updated!');
            };
        } else {
            if (mode == 'add') {
                this.toast.success('there was an issue adding invoice!');
            } else {
                this.toast.success('there was an issue updating invoice!');
            };
        };
    };

    public remove(itemId: string) {
        for (let i = 0; i < this.items.data.length; i++) {
            if (this.items.data[i].itemId == itemId) {
                this.items.data.splice(i, 1);
                break;
            };
        };
        this.items.data = JSON.parse(JSON.stringify(this.items.data));
    };

    public IconChange(value, param) {
        param.icon = value;
    };

    ngOnInit(): void {
        this.subscriptions.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });

        this.subscriptions.route = this.route.params.subscribe(params => {
            this.mode       = params.mode;
            this.invoiceId  = params.invoiceId;

            if (this.mode != 'add') {
                this.get();
            };
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.form.unsubscribe();
        this.subscriptions.route.unsubscribe();
    };

}