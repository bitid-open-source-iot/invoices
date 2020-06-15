import { NgModule } from '@angular/core';
import { ShareModule } from 'src/app/components/share/share.module';
import { PaymentPage } from './payment/payment.page';
import { NotifyDialog } from './notify/notify.dialog';
import { InvoicesPage } from './invoices.page';
import { DeleteModule } from 'src/app/components/delete/delete.module';
import { CommonModule } from '@angular/common';
import { SearchModule } from 'src/app/components/search/search.module';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ViewInvoicePage } from './view/view.page';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { OrderPipeModule } from 'src/app/pipes/order/order.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BottomSheetModule } from 'src/app/components/bottom-sheet/bottom-sheet.module';
import { UnsubscribeModule } from 'src/app/components/unsubscribe/unsubscribe.module';
import { SubscribersModule } from 'src/app/components/subscribers/subscribers.module';
import { InvoiceEditorPage } from './editor/editor.page';
import { ImageUploadModule } from 'src/app/components/image-upload/image-upload.module';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { InvoicesRoutingModule } from './invoices-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        FormsModule,
        ShareModule,
        CommonModule,
        DeleteModule,
        SearchModule,
        MatIconModule,
        MatMenuModule,
        MatInputModule,
        MatTableModule,
        MatSelectModule,
        MatDialogModule,
        MatButtonModule,
        OrderPipeModule,
        MatToolbarModule,
        SubscribersModule,
        ImageUploadModule,
        UnsubscribeModule,
        BottomSheetModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatBottomSheetModule,
        InvoicesRoutingModule,
        MatProgressBarModule
    ],
    declarations: [
        PaymentPage,
        NotifyDialog,
        InvoicesPage,
        ViewInvoicePage,
        InvoiceEditorPage
    ]
})

export class InvoicesModule {}