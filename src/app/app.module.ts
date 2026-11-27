import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptModule, NativeScriptFormsModule, registerElement } from '@nativescript/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetalleComponent } from './detalle/detalle.component';
import { MinLongitudDirective } from './directives/min-longitud.directive';

registerElement('PullToRefresh', () => require('@nativescript-community/ui-pulltorefresh').PullToRefresh);

@NgModule({
    bootstrap: [AppComponent],
    imports: [
        NativeScriptModule,
        NativeScriptFormsModule,
        AppRoutingModule
    ],
    declarations: [
        AppComponent,
        BusquedaComponent,
        DetalleComponent,
        MinLongitudDirective
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
