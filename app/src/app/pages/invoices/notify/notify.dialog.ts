import { environment } from 'src/environments/environment';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormErrorService } from 'src/app/services/form-error/form-error.service';
import { OnInit, Component, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector:       'app-notify-dialog',
    styleUrls:      ['./notify.dialog.scss'],
    templateUrl:    './notify.dialog.html'
})

export class NotifyDialog implements OnInit, OnDestroy {

    constructor(private dialog: MatDialogRef<NotifyDialog>, @Inject(MAT_DIALOG_DATA) public emails: string[], private formerror: FormErrorService) {};

    public form:    FormGroup   = new FormGroup({
        'email': new FormControl('', [Validators.required, Validators.email])
    });
    public errors:  any         = {
        'email':    ''
    };
    private invoices: any  = {};

    public close() {
        this.dialog.close(false);
    };

    public submit() {
        this.dialog.close(this.form.value.email);
    };

    ngOnInit(): void {
        this.invoices.form = this.form.valueChanges.subscribe(data => {
            this.errors = this.formerror.validateForm(this.form, this.errors, true);
        });
    };

    ngOnDestroy(): void {
        this.invoices.form.unsubscribe();
    };

}