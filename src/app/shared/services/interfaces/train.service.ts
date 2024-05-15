import {RailLine} from "../../models/railLine.model";
import {Observable} from "rxjs";
import {Train} from "../../models/train.model";

export interface TrainService {
    getAllByRailLineDirectionAndDate(line: RailLine, ascendingDirection: boolean, date: Date): Observable<Train[]>;
}
