export class Auction {
  id: number;
  title: string;
  registrationNumber: string;
  registrationDate: number;
  description: string;
  images: string[];
  horsePower: number;
  reservationPrice: number;
  buyItNowPrice: number;
  startPrice: number;
  categoryId: number;
  makerId: number;
  endDate: Date;
  currentBidPrice: number = 0;
}
