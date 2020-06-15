import canvas from 'html2canvas';
import * as jspdf from 'jspdf';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
import { InvoicesService } from 'src/app/services/invoices/invoices.service';
import { OnInit, Component } from '@angular/core';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector:       'app-payment-page',
    styleUrls:      ['./payment.page.scss'],
    templateUrl:    './payment.page.html'
})

export class PaymentPage implements OnInit {
    
    constructor(private route: ActivatedRoute, private toast: ToastService, private router: Router, private service: InvoicesService, private localstorage: LocalstorageService) {};
    
    public invoice:         any;
    public payfast:         any     = environment.payfast;
    public loading:         boolean;
    public payment:         any     = {
        'cycles':               0,
        'amount':               0,
        'frequency':            0,
        'item_name':            '',
        'merchant_id':          this.payfast.merchantId,
        'custom_str1':          'invoice',
        'custom_str2':          '',
        'm_payment_id':         '',
        'merchant_key':         this.payfast.merchantKey,
        'billing_date':         '',
        'email_address':        this.localstorage.get('email'),
        'item_description':     '',
        'recurring_amount':     0,
        'subscription_type':    1,
        'email_confirmation':   1,
        'confirmation_address': this.localstorage.get('email')
    };
    private invoiceId:      string;
    private subscriptions:  any     = {};

    private async get() {
        this.loading = true;

        const response = await this.service.get({
            'filter': [
                'role',
                'date',
                'items',
                'status',
                'recipient',
                'invoiceId',
                'description'
            ],
            'invoiceId': this.invoiceId
        });

        this.loading = false;

        if (response.ok) {
            this.invoice            = response.result;
            this.invoice.vat        = 0;
            this.invoice.total      = 0;
            this.invoice.subtotal   = 0;
            this.invoice.items.map(item => {
                item.nett           = item.quantity * item.amount;
                this.invoice.total  += item.nett;
            });
            this.invoice.vat                = this.invoice.total * 0.15;
            this.payment.amount             = this.invoice.total;
            this.invoice.subtotal           = this.invoice.total - this.invoice.vat;
            this.payment.item_name          = 'INVOICE: #' + this.invoice.invoiceId.toUpperCase();
            this.payment.m_payment_id       = this.invoice.invoiceId;
            this.payment.item_description   = 'INVOICE: #' + this.invoice.invoiceId.toUpperCase();
            this.invoice.recipient.address  = [this.invoice.recipient.street, this.invoice.recipient.suburb, this.invoice.recipient.townCity, this.invoice.recipient.postalCode, this.invoice.recipient.country].join(', ').toUpperCase();
        } else {
            this.router.navigate(['/invoices']);
            this.toast.error('issue loading invoice!');
        };
    };

    public async download() {
        const page = document.getElementById('pdf');
        canvas(page).then(canvas => {
            const pdf   = new jspdf();
            const image = canvas.toDataURL("image/jpeg", 1.0);
            pdf.addImage(image, 'JPEG', 0, 0);
            pdf.save(this.invoice.invoiceId.toUpperCase());
        });
    };

    ngOnInit(): void {
        this.subscriptions.route = this.route.params.subscribe(params => {
            this.invoiceId = params.invoiceId;
            this.get();
        });
    };

}