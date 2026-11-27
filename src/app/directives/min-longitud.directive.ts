import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appMinLongitud]',
    providers: [
        {
            provide: NG_VALIDATORS,
            useExisting: MinLongitudDirective,
            multi: true
        }
    ]
})
export class MinLongitudDirective implements Validator {
    @Input('appMinLongitud') minCaracteres = 3;

    validate(control: AbstractControl): ValidationErrors | null {
        const valor = (control.value || '').toString().trim();
        if (valor.length === 0) {
            return null;
        }
        if (valor.length < Number(this.minCaracteres)) {
            return {
                minLongitud: {
                    requerido: this.minCaracteres,
                    actual: valor.length
                }
            };
        }
        return null;
    }
}
