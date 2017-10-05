export interface IUpdateCar {
  id: number;
  registrationNumber: string;
  brand: string;
  model: string;
  year: number;
  miles: number;
  price: number;
  color: string;
  description: string;
  sold: boolean;
  sellerId: number;
  soldDate: Date;
  soldPrice: number;
  buyerId: number;
  createdDate: Date;
  updatedDate: Date;
}

export class UpdateCar implements IUpdateCar{
  id: number;
  registrationNumber: string = "";
  brand: string = "";
  model: string = "";
  year: number;
  miles: number;
  price: number;
  color: string = "";
  description: string = "";
  sold: boolean = false;
  sellerId: number;
  soldDate: Date = new Date();
  soldPrice: number;
  buyerId: number;
  createdDate: Date = new Date();
  updatedDate: Date = new Date();

}
