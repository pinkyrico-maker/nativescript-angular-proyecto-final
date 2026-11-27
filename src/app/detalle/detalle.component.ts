import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterExtensions } from '@nativescript/angular';
import { Toasty } from '@triniwiz/nativescript-toasty';
import { ElementoItem, ElementosService } from '../services/elementos.service';

@Component({
    selector: 'ns-detalle',
    templateUrl: './detalle.component.html'
})
export class DetalleComponent implements OnInit {
    item?: ElementoItem;

    constructor(
        private route: ActivatedRoute,
        private routerExtensions: RouterExtensions,
        private elementosService: ElementosService
    ) {}

    ngOnInit(): void {
        const id = Number(this.route.snapshot.params['id']);
        this.item = this.elementosService.obtenerPorId(id);
    }

    guardarYVolver(): void {
        new Toasty({ text: 'Cambios guardados correctamente' }).show();
        this.volver();
    }

    volver(): void {
        this.routerExtensions.backToPreviousPage();
    }
}
