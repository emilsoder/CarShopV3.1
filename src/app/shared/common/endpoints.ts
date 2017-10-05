export class BaseEndpoint {
  public static Url = "http://nackademiskabilshopen.azurewebsites.net/"
}


export class AuctionEndPoint {
  public static getall = BaseEndpoint.Url + "api/cars"; // GET
  public static add = BaseEndpoint.Url + "api/cars"; // POST
  public static update = BaseEndpoint.Url + "api/cars"; // PUT

  private static getById = BaseEndpoint.Url + "api/cars/"; // GET

  // GET
  public static getbyid(id: number) {
    return AuctionEndPoint.getById + id;
  }
}


export class BidEndpoint {
  public static create = BaseEndpoint.Url + "api/bids";
  public static get = BaseEndpoint.Url + "api/bids";

  private static readonly _getBidsByCarId = "api/cars/ "

  public static getbyid(carId: number): string {
    return BaseEndpoint.Url + BidEndpoint._getBidsByCarId + carId + "/bids";
  }

  // private static readonly _getbyid = "api/bids/";

  // public static getbyid(id: number): string {
  //   return BidEndpoint._getbyid + id;
  // }
}

export class FilterEndpoint {
  public static getColors = "./assets/jsondata/colors.json";
}

export class AuthenticationEndPoint {
  public static login: string = `${BaseEndpoint.Url}token`;
  public static register: string = `${BaseEndpoint.Url}api/account/register `;
}

export class ExternalSneakyApi{
  private static BaseUrl = "http://anyorigin.com/go?url=http%3A//m.mobile.de/svc/r/";
  public static getBrands = `${ExternalSneakyApi.BaseUrl}makes/Car%3F_jsonp%3D_loadMakes%26_lang%3Den&callback=?`;

  private static getModelsSuffix = "%3F_jsonp%3D_loadModels%26_lang%3Den&callback=?"
  public static getModels(brandId: any){
    return `${this.BaseUrl}models/${brandId}${this.getModelsSuffix}`;
  }
}
