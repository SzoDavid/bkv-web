import {RailLine} from "../../models/railLine.model";
import {Train} from "../../models/train.model";

export interface TrainService {
    getAllByRailLineDirectionAndDate(line: RailLine, ascendingDirection: boolean, date: Date): Promise<Train[]>;
}
