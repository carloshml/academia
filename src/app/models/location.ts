import { Schedule } from "./schedule";

export class Location {
    id: number = 0;
    title: string = '';
    street: string = '';
    region: string = '';
    city_name: string = '';
    state_name: string = '';
    uf: string = '';
    content = '\n<p>Av. Dom Severino, 1733 &#8211; Fátima<br>Teresina, PI</p>\n';
    opened: boolean = false;
    mask: 'required' | 'partial' = "required";
    towel: 'required' | 'partial' = "required";
    fountain: 'required' | 'partial' = "required";
    locker_room: 'allowed' = "allowed";
    schedules: Schedule[] = [];
}
