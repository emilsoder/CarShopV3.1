export class ICar {
  id: number;
  registrationNumber: string = "N/A";
  brand: string = "N/A";
  model: string = "N/A";
  year: number;
  miles: number;
  price: number;
  color: string = "N/A";
  description: string = "N/A";

  sold: boolean;
  sellerId: number;
  soldDate: string;
  soldPrice: number;
  buyerId: number;
  createdDate: string;
  updatedDate: string;
}
//
// export class ICar implements ICar {
//   id: number;
//   registrationNumber: string;
//   brand: string;
//   model: string;
//   year: number;
//   miles: number;
//   price: number;
//   color: string;
//   description: string;
//   sold: boolean;
//   sellerId: number;
//   soldDate: string;
//   soldPrice: number;
//   buyerId: number;
//   createdDate: string;
//   updatedDate: string;
// }
