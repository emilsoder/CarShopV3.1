export class IAddCar {
  registrationNumber: string = ""; //OK
  sellerId: number = 0; //readonly
  brand: string = ""; //OK
  model: string  = ""; //OK
  year: number = 0; //OK
  miles: number = 0; //OK
  price: number = 0; //OK
  color: string = ""; //OK
  description: string = ""; //OK
}

export class AddCarViewModel{
  brands: string[] = [];
  colors: string[] = [];
}
