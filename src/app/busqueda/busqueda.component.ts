import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    AnimationCurve,
    Color,
    Dialogs,
    GestureEventData,
    ItemEventData,
    View
} from '@nativescript/core';
import { RouterExtensions } from '@nativescript/angular';
import { Toasty } from '@triniwiz/nativescript-toasty';
import { ElementoItem, ElementosService } from '../services/elementos.service';

@Component({
    selector: 'ns-busqueda',
    templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {
    @ViewChild('iconoHeader', { static: false }) iconoHeaderRef!: ElementRef;

    terminoBusqueda = '';
    elementosFiltrados: ElementoItem[] = [];

    constructor(
        private elementosService: ElementosService,
        private routerExtensions: RouterExtensions
    ) {}

    ngOnInit(): void {
        this.filtrarLista();
    }

    filtrarLista(): void {
        const todos = this.elementosService.obtenerTodos();
        const filtro = this.terminoBusqueda.trim().toLowerCase();

        if (!filtro) {
            this.elementosFiltrados = [...todos];
            return;
        }

        this.elementosFiltrados = todos.filter(
            item =>
                item.titulo.toLowerCase().includes(filtro) ||
                item.categoria.toLowerCase().includes(filtro)
        );
    }

    onItemTap(args: ItemEventData): void {
        const itemSeleccionado = this.elementosFiltrados[args.index];
        if (itemSeleccionado) {
            this.routerExtensions.navigate(['/detalle', itemSeleccionado.id], {
                transition: { name: 'slideLeft', duration: 250 }
            });
        }
    }

    onPullToRefresh(args: any): void {
        const pullRefresh = args.object;
        setTimeout(() => {
            const nuevo = this.elementosService.agregarElementoAleatorio();
            this.filtrarLista();
            pullRefresh.refreshing = false;
            this.mostrarToast(`Nuevo elemento agregado: ${nuevo.titulo}`);
        }, 700);
    }

    onCambiarCategoria(args: GestureEventData, item: ElementoItem): void {
        const icono = <View>args.object;

        icono.animate({
            rotate: 360,
            backgroundColor: new Color('#DBEAFE'),
            duration: 350,
            curve: AnimationCurve.easeInOut
        }).then(() => {
            icono.rotate = 0;
            return Dialogs.action({
                title: 'Seleccionar categoría',
                message: `Asigna una nueva categoría para "${item.titulo}"`,
                cancelButtonText: 'Cancelar',
                actions: ['Tecnología', 'Diseño', 'Gestión', 'General']
            });
        }).then((seleccion: string) => {
            if (seleccion && seleccion !== 'Cancelar') {
                this.elementosService.actualizarCategoria(
                    item.id,
                    seleccion as ElementoItem['categoria']
                );
                this.filtrarLista();
                this.mostrarToast(`Categoría actualizada a: ${seleccion}`);
            }
        });
    }

    onLongPressIcono(args: GestureEventData, item: ElementoItem): void {
        const icono = <View>args.object;
        this.mostrarToast(`Long press detectado en: ${item.titulo}`);

        icono.animate({
            backgroundColor: new Color('#F59E0B'),
            scale: { x: 1.25, y: 1.25 },
            duration: 300,
            delay: 100
        }).then(() => icono.animate({
            backgroundColor: new Color('#EFF6FF'),
            scale: { x: 1, y: 1 },
            duration: 300
        }));
    }

    onDoubleTapIcono(args: GestureEventData, item: ElementoItem): void {
        const icono = <View>args.object;
        this.mostrarToast(`Double tap en: ${item.titulo}`);
        icono.animate({
            rotate: 180,
            duration: 250
        }).then(() => {
            icono.rotate = 0;
        });
    }

    onAnimarIconoActionBar(args: GestureEventData): void {
        const vista = this.iconoHeaderRef?.nativeElement as View;
        if (vista) {
            vista.animate({
                rotate: 360,
                scale: { x: 1.3, y: 1.3 },
                duration: 400
            }).then(() => vista.animate({
                rotate: 0,
                scale: { x: 1, y: 1 },
                duration: 250
            }));
        }
    }

    private mostrarToast(mensaje: string): void {
        new Toasty({ text: mensaje }).show();
    }
}
