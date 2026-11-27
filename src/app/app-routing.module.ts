import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetalleComponent } from './detalle/detalle.component';

const routes: Routes = [
    { path: '', redirectTo: '/busqueda', pathMatch: 'full' },
    { path: 'busqueda', component: BusquedaComponent },
    { path: 'detalle/:id', component: DetalleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
