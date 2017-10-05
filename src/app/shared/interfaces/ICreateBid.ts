export interface ICreateBid {
  bidPrice: number;
  bidderId: number;
  carId: number;
}

export class CreateBid implements ICreateBid {
  bidPrice: number;
  bidderId: number = 0;
  carId: number;
}
