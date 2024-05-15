import {RailLine} from "../../models/railLine.model";
import {Station} from "../../models/station.model";

export interface RailLineService {
    getById(id: String): Promise<RailLine>;
    getAllByStartAndDestinationStations(start: Station, destination: Station): Promise<RailLine[]>;
}
