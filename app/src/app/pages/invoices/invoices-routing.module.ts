import { NgModule } from '@angular/core';
import { PaymentPage } from './payment/payment.page';
import { InvoicesPage } from './invoices.page';
import { ViewInvoicePage } from './view/view.page';
import { InvoiceEditorPage } from './editor/editor.page';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
    {
        'path':         '',
        'component':    InvoicesPage
    },
    {
        'path':         'pay/:invoiceId',
        'component':    PaymentPage
    },
    {
        'path':         'view/:invoiceId',
        'component':    ViewInvoicePage
    },
    {
        'path':         ':mode',
        'component':    InvoiceEditorPage
    },
    {
        'path':         ':mode/:invoiceId',
        'component':    InvoiceEditorPage
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class InvoicesRoutingModule {}