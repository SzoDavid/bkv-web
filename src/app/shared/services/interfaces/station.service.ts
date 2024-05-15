import {Observable} from "rxjs";
import {Station} from "../../models/station.model";

export interface StationService {
    getAll(): Observable<Station[]>;
}
