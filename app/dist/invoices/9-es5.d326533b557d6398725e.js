function _classCallCheck(e,r){if(!(e instanceof r))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,r){for(var t=0;t<r.length;t++){var n=r[t];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function _createClass(e,r,t){return r&&_defineProperties(e.prototype,r),t&&_defineProperties(e,t),e}(window.webpackJsonp=window.webpackJsonp||[]).push([[9],{"9PJG":function(e,r,t){"use strict";t.r(r),t.d(r,"SigninModule",(function(){return T}));var n=t("ofXK"),i=t("NFeN"),o=t("qFsG"),a=t("d3UM"),s=t("bTqV"),c=t("/t3+"),m=t("kmnG"),u=t("mrSG"),l=t("3Pt+"),b=t("fXoL"),f=t("9ZKQ"),p=t("tyNb"),d=t("IRyT"),g=t("dWDE"),h=t("Xa2L");function w(e,r){if(1&e&&(b.Ub(0,"mat-error"),b.xc(1),b.Tb()),2&e){var t=b.gc();b.Cb(1),b.zc(" ",t.errors.email," ")}}function v(e,r){if(1&e&&(b.Ub(0,"mat-error"),b.xc(1),b.Tb()),2&e){var t=b.gc();b.Cb(1),b.zc(" ",t.errors.password," ")}}function C(e,r){1&e&&b.Pb(0,"mat-progress-spinner",9)}var y,k,x,P=[{path:"",component:(y=function(){function e(r,t,n,i){_classCallCheck(this,e),this.toast=r,this.router=t,this.service=n,this.formerror=i,this.form=new l.d({email:new l.b("",[l.p.email,l.p.required]),password:new l.b("",[l.p.required])}),this.errors={email:"",password:""},this.invoices={}}return _createClass(e,[{key:"submit",value:function(){return Object(u.a)(this,void 0,void 0,regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return this.loading=!0,this.form.disable(),e.next=3,this.service.login({email:this.form.value.email,password:this.form.value.password});case 3:r=e.sent,this.form.enable(),this.loading=!1,r.ok?this.router.navigate(["/cards"],{replaceUrl:!0}):this.toast.error(r.error.message);case 5:case"end":return e.stop()}}),e,this)})))}},{key:"ngOnInit",value:function(){var e=this;this.invoices.form=this.form.valueChanges.subscribe((function(r){e.errors=e.formerror.validateForm(e.form,e.errors,!0)}))}},{key:"ngOnDestroy",value:function(){this.invoices.form.unsubscribe()}}]),e}(),y.\u0275fac=function(e){return new(e||y)(b.Ob(f.a),b.Ob(p.c),b.Ob(d.a),b.Ob(g.a))},y.\u0275cmp=b.Ib({type:y,selectors:[["app-signin"]],decls:17,vars:5,consts:[[3,"formGroup","ngSubmit"],["src","./assets/icons/icon-512x512.png","alt","ScanIn Icon"],["appearance","outline"],["matInput","","type","email","name","email","placeholder","email","formControlName","email","required",""],[4,"ngIf"],["matInput","","type","password","name","password","placeholder","password","formControlName","password","required",""],["type","submit","mat-flat-button","","color","primary"],["mode","indeterminate","diameter","30",4,"ngIf"],["type","button","mat-stroked-button","","color","primary","routerLink","/signup"],["mode","indeterminate","diameter","30"]],template:function(e,r){1&e&&(b.Ub(0,"form",0),b.cc("ngSubmit",(function(){return!r.form.invalid&&!r.loading&&r.submit()})),b.Pb(1,"img",1),b.Ub(2,"mat-form-field",2),b.Ub(3,"mat-label"),b.xc(4," Email "),b.Tb(),b.Pb(5,"input",3),b.wc(6,w,2,1,"mat-error",4),b.Tb(),b.Ub(7,"mat-form-field",2),b.Ub(8,"mat-label"),b.xc(9," Password "),b.Tb(),b.Pb(10,"input",5),b.wc(11,v,2,1,"mat-error",4),b.Tb(),b.Ub(12,"button",6),b.xc(13),b.wc(14,C,1,0,"mat-progress-spinner",7),b.Tb(),b.Ub(15,"button",8),b.xc(16," sign up "),b.Tb(),b.Tb()),2&e&&(b.mc("formGroup",r.form),b.Cb(6),b.mc("ngIf",r.errors.email),b.Cb(5),b.mc("ngIf",r.errors.password),b.Cb(2),b.zc(" ",r.loading?"":"sign in"," "),b.Cb(1),b.mc("ngIf",r.loading))},directives:[l.q,l.j,l.e,m.c,m.g,o.a,l.a,l.i,l.c,l.o,n.n,s.a,p.d,m.b,h.a],styles:["img[_ngcontent-%COMP%]{width:100px;display:block;margin:25px auto}form[_ngcontent-%COMP%]{width:400px;margin:auto}@media screen and (max-width:420px){form[_ngcontent-%COMP%]{width:calc(100% - 20px)}}"]}),y)}],I=((x=function e(){_classCallCheck(this,e)}).\u0275mod=b.Mb({type:x}),x.\u0275inj=b.Lb({factory:function(e){return new(e||x)},imports:[[p.g.forChild(P)],p.g]}),x),T=((k=function e(){_classCallCheck(this,e)}).\u0275mod=b.Mb({type:k}),k.\u0275inj=b.Lb({factory:function(e){return new(e||k)},imports:[[l.f,n.c,i.b,o.b,s.b,a.b,c.b,m.e,l.n,I,h.b]]}),k)}}]);