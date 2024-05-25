import { Location } from "./location";
export class Result {
    current_country_id!: number;
    locations: Location[] = [];
    wp_total!: number;
    total!: number;
    success: boolean = false;
}