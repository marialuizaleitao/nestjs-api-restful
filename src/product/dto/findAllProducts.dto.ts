// class ListProductCharacteristicDTO {
//   name: string;
//   description: string;
// }

// class ListProductImageDTO {
//   url: string;
//   description: string;
// }

export class FindAllProductsDTO {
  constructor(
    readonly id: string,
    readonly name: string,
    // readonly characteristics: ListProductCharacteristicDTO[],
    // readonly images: ListProductImageDTO[],
  ) {}
}
