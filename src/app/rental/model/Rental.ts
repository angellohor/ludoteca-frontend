import { Customer } from "../../customer/model/Customer";
import { Game } from "../../game/model/Game";

export class Rental{
    id: number;
    startDate: Date;
    endDate: Date;
    game: Game;
    customer: Customer;
}