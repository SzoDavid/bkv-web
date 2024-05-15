import {Observable} from "rxjs";
import {RailLine} from "../../models/railLine.model";
import {Station} from "../../models/station.model";

export interface RailLineService {
    getById(id: String): Observable<RailLine>;
    getAllByStartAndDestinationStations(start: Station, destination: Station): Observable<RailLine[]>;
}
