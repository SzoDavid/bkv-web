import {Station} from "../../models/station.model";

export interface StationService {
    getAll(): Promise<Station[]>;
}
