import { Injectable } from '@angular/core';

export interface ElementoItem {
    id: number;
    titulo: string;
    categoria: 'Tecnología' | 'Diseño' | 'Gestión' | 'General';
    descripcion: string;
    imagenSrc: string;
}

@Injectable({
    providedIn: 'root'
})
export class ElementosService {
    private contadorId = 5;

    private items: ElementoItem[] = [
        {
            id: 1,
            titulo: 'Arquitectura NativeScript',
            categoria: 'Tecnología',
            descripcion: 'Componentes nativos multiplataforma con Angular.',
            imagenSrc: 'res://icon'
        },
        {
            id: 2,
            titulo: 'Formularios y Directivas',
            categoria: 'Gestión',
            descripcion: 'Validación reactiva y personalizada con two-way binding.',
            imagenSrc: '~/imagenes/logo.png'
        },
        {
            id: 3,
            titulo: 'Animaciones y Gestos UI',
            categoria: 'Diseño',
            descripcion: 'Transiciones de color, rotación y respuesta táctil.',
            imagenSrc: 'https://raw.githubusercontent.com/NativeScript/docs/master/src/_images/nativescript-logo.png'
        },
        {
            id: 4,
            titulo: 'Splash Screen Android',
            categoria: 'General',
            descripcion: 'Personalización de recursos gráficos en App_Resources.',
            imagenSrc: 'res://icon'
        }
    ];

    obtenerTodos(): ElementoItem[] {
        return this.items;
    }

    obtenerPorId(id: number): ElementoItem | undefined {
        return this.items.find(item => item.id === id);
    }

    actualizarCategoria(id: number, nuevaCategoria: ElementoItem['categoria']): void {
        const item = this.obtenerPorId(id);
        if (item) {
            item.categoria = nuevaCategoria;
        }
    }

    agregarElementoAleatorio(): ElementoItem {
        const muestras: Array<{ titulo: string; categoria: ElementoItem['categoria']; descripcion: string }> = [
            {
                titulo: 'Optimización ListView',
                categoria: 'Tecnología',
                descripcion: 'Reciclaje eficiente de celdas con FlexboxLayout.'
            },
            {
                titulo: 'Navegación RouterExtensions',
                categoria: 'Gestión',
                descripcion: 'Transiciones nativas entre listado y vista de detalle.'
            },
            {
                titulo: 'Iconografía Multi-densidad',
                categoria: 'Diseño',
                descripcion: 'Soporte para mdpi, hdpi, xhdpi y xxhdpi en Android.'
            }
        ];

        const elegido = muestras[Math.floor(Math.random() * muestras.length)];
        const nuevo: ElementoItem = {
            id: this.contadorId++,
            titulo: `${elegido.titulo} #${this.contadorId - 1}`,
            categoria: elegido.categoria,
            descripcion: elegido.descripcion,
            imagenSrc: 'res://icon'
        };

        this.items.unshift(nuevo);
        return nuevo;
    }
}
