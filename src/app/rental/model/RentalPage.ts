import { Pageable } from "../../core/model/page/Pageable";
import { Rental } from "./Rental";

export class RentalPage {
    content: Rental[];
    pageable: Pageable;
    totalElements: number;
}