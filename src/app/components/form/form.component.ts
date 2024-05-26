import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClientService } from '../../services/client.service';
import { Result } from '../../models/return';
import { Location } from '../../models/location';
import { Schedule } from '../../models/schedule';


@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  providers: [ClientService],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class FormComponent {

  // form = new FormGroup({ address: new FormGroup({ street: new FormControl() }) });
  form: FormGroup<{
    horario: FormControl<string>;
    showClosed: FormControl<boolean>;
  }> = new FormGroup<any>({
    horario: new FormControl<string>('M', {
      nonNullable: false,
      validators: [Validators.requiredTrue],
    }),
    showClosed: new FormControl<boolean>(false, {
      nonNullable: false,
      validators: [Validators.requiredTrue],
    }),
  });


  periodo = {
    M: [6, 12],
    T: [12, 18],
    N: [18, 23],
  } as any;

  @Output() abertosEmitter = new EventEmitter<any>();
  abertos: Location[] = [];
  constructor(private clientService: ClientService) {
  }

  async procurar() {
    const diaHoje = new Date().getDay();
    const results = await this.clientService.get() as Result;
    this.abertos = [];
    results.locations.forEach((location: Location) => {
      location.schedules?.forEach((schedule: Schedule) => {
        if (
          this.permitidoPeloDia(schedule, diaHoje)
          && this.permitidoPeloTurno(schedule, this.periodo[this.form.controls.horario.value])
        ) {
          if (!this.form.controls.showClosed.value && !location.opened) {

          } else {
            this.abertos.push(location);
          }
        }
      })
    });
    this.abertosEmitter.emit(this.abertos);
  }

  permitidoPeloDia(schedule: Schedule, diaHoje: number): boolean {
    let dias = {
      "Seg. à Sex.": [1, 2, 3, 4, 5],
      "Dom.": [0],
      "Sáb.": [6]
    } as any;
    try {
      return dias[schedule.weekdays].includes(diaHoje);
    } catch (error) {
      console.error(' error schedule.weekdays ::::', schedule.weekdays);
    }
    return false;
  }

  permitidoPeloTurno(schedule: Schedule, periodoBusca: number[]): boolean {
    let periodoAcademia = schedule.hour
      .replace(/h/g, '')
      .split(' às ')
      .map(time => Number(time));
    if (
      (
        periodoAcademia[0] >= periodoBusca[0]
        && periodoAcademia[0] < periodoBusca[1]
      )
      ||
      (
        periodoAcademia[0] < periodoBusca[0]
        && periodoAcademia[1] > periodoBusca[0]
      )
    ) {
      return true;
    }
    return false;
  }

}
