import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MenuService } from 'src/app/services/menu/menu.service';
import { NotifyDialog } from './notify/notify.dialog';
import { ToastService } from 'src/app/services/toast/toast.service';
import { ShareComponent } from 'src/app/components/share/share.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { DeleteComponent } from 'src/app/components/delete/delete.component';
import { SearchComponent } from 'src/app/components/search/search.component';
import { MatTableDataSource } from '@angular/material/table';
import { LocalstorageService } from 'src/app/services/localstorage/localstorage.service';
import { SubscribersComponent } from 'src/app/components/subscribers/subscribers.component';
import { UnsubscribeComponent } from 'src/app/components/unsubscribe/unsubscribe.component';
import { BottomSheetComponent } from 'src/app/components/bottom-sheet/bottom-sheet.component';
import { Invoice, InvoicesService } from 'src/app/services/invoices/invoices.service';
import { OnInit, Component, OnDestroy, ViewChild } from '@angular/core';

@Component({
    selector:       'app-invoices-page',
    styleUrls:      ['./invoices.page.scss'],
    templateUrl:    './invoices.page.html'
})

export class InvoicesPage implements OnInit, OnDestroy {

    @ViewChild(SearchComponent, {'static': true}) private search: SearchComponent;

    constructor(public menu: MenuService, private toast: ToastService, private sheet: MatBottomSheet, private dialog: MatDialog, private router: Router, private service: InvoicesService, private localstorage: LocalstorageService) {};

    public sort:            any         = {
        'key':      'description',
        'reverse':  false
    };
    public columns:         string[]    = ['id', 'description', 'status'];
    public loading:         boolean;
    public invoices:        any         = new MatTableDataSource();
    private subscriptions:  any         = {};

    private async list() {
        this.loading = true;

        const response = await this.service.list({
            'sort': {
                [this.sort.key]: (this.sort.reverse ? -1 : 1)
            },
            'filter': [
                'role',
                'users',
                'status',
                'invoiceId',
                'description'
            ]
        });

        this.loading = false;

        if (response.ok) {
            this.invoices.data = response.result;
        } else {
            this.invoices.data = [];
        };
    };

    public async options(invoice: Invoice) {
        let options = [
            {
                'icon':     'receipt',
                'title':    'View',
                'disabled': [0, 1],
                'optionId': 8
            },
            {
                'icon':     'create',
                'title':    'Edit',
                'disabled': [0, 1],
                'optionId': 0
            },
            {
                'icon':     'file_copy',
                'title':    'Copy',
                'disabled': [0, 1, 2],
                'optionId': 1
            },
            {
                'icon':     'share',
                'title':    'Share',
                'disabled': [0, 1, 2, 3],
                'optionId': 2
            },
            {
                'icon':     'people',
                'title':    'Subscribers',
                'disabled': [0, 1, 2, 3],
                'optionId': 3
            },
            {
                'icon':     'delete',
                'title':    'Delete',
                'disabled': [0, 1, 2, 3, 4],
                'optionId': 4
            },
            {
                'icon':     'remove',
                'title':    'Unsubscribe',
                'disabled': [5],
                'optionId': 5
            }
        ];

        if (invoice.status == 'unpaid') {
            options.unshift({
                'icon':     'payment',
                'title':    'Pay',
                'disabled': [0],
                'optionId': 7
            });
            options.unshift({
                'icon':     'send',
                'title':    'Notify',
                'disabled': [0],
                'optionId': 6
            });
        };

        const sheet = await this.sheet.open(BottomSheetComponent, {
            'data': {
                'role':     invoice.role,
                'title':    invoice.description,
                'options':  options
            }
        });

        await sheet.afterDismissed().subscribe(async optionId => {
            if (typeof(optionId) !== "undefined") {
                switch(optionId) {
                    case(0):
                        this.router.navigate(['/invoices', 'update', invoice.invoiceId]);
                        break;
                    case(1):
                        this.router.navigate(['/invoices', 'copy', invoice.invoiceId]);
                        break;
                    case(2):
                        const share = await this.dialog.open(ShareComponent, {
                            'panelClass':   'share-dialog',
                            'disableClose': true
                        });

                        await share.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.share({
                                    'role':         user.role,
                                    'email':        user.email,
                                    'invoiceId':    invoice.invoiceId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('user was shared to invoice!');
                                } else {
                                    this.toast.error('issue sharing user to invoice!');
                                };
                            };
                        });
                        break;
                    case(3):
                        await this.dialog.open(SubscribersComponent, {
                            'data': {
                                'id':       invoice.invoiceId,
                                'type':     'invoice',
                                'service':  this.service
                            },
                            'panelClass':   'subscribers-dialog',
                            'disableClose': true
                        });
                        break;
                    case(4):
                        const remove = await this.dialog.open(DeleteComponent, {
                            'panelClass':   'delete-dialog',
                            'disableClose': true
                        });

                        await remove.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.delete({
                                    'invoiceId': invoice.invoiceId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('invoice was deleted!');
                                    for (let i = 0; i < this.invoices.data.length; i++) {
                                        if (this.invoices.data[i].invoiceId == invoice.invoiceId) {
                                            this.invoices.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.invoices.data = JSON.parse(JSON.stringify(this.invoices.data));
                                } else {
                                    this.toast.error('issue deleting invoice!');
                                };
                            };
                        });
                        break;
                    case(5):
                        const unsubscribe = await this.dialog.open(UnsubscribeComponent, {
                            'panelClass':   'unsubscribe-dialog',
                            'disableClose': true
                        });

                        await unsubscribe.afterClosed().subscribe(async user => {
                            if (user) {
                                this.loading = true;

                                const response = await this.service.unsubscribe({
                                    'email':        this.localstorage.get('email'),
                                    'invoiceId':   invoice.invoiceId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('you were unsubscribed from invoice!');
                                    for (let i = 0; i < this.invoices.data.length; i++) {
                                        if (this.invoices.data[i].invoiceId == invoice.invoiceId) {
                                            this.invoices.data.splice(i, 1);
                                            break;
                                        };
                                    };
                                    this.invoices.data = JSON.parse(JSON.stringify(this.invoices.data));
                                } else {
                                    this.toast.error('issue unsubscribing from invoice!');
                                };
                            };
                        });
                        break;
                    case(6):
                        const notify = await this.dialog.open(NotifyDialog, {
                            'data':         invoice.users.map(o => o.email),
                            'panelClass':   'notify-dialog',
                            'disableClose': true
                        });

                        await notify.afterClosed().subscribe(async email => {
                            if (email) {
                                this.loading = true;

                                const response = await this.service.notify({
                                    'email':        email,
                                    'invoiceId':   invoice.invoiceId
                                });

                                this.loading = false;

                                if (response.ok) {
                                    this.toast.success('users were notified of invoice!');
                                } else {
                                    this.toast.error('issue notifying users of invoice!');
                                };
                            };
                        });
                        break;
                    case(7):
                        this.router.navigate(['/invoices', 'pay', invoice.invoiceId]);
                        break;
                    case(8):
                        this.router.navigate(['/invoices', 'view', invoice.invoiceId]);
                        break;
                };
            };
        });
    };

    ngOnInit(): void {
        this.list();

        this.subscriptions.search = this.search.change.subscribe(filter => {
            this.invoices.filter = filter;
        });
    };

    ngOnDestroy(): void {
        this.subscriptions.search.unsubscribe();
    };

}