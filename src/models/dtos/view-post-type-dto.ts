export interface ViewPostTypeDto {
  viewType: string;
}

export interface RegionType extends ViewPostTypeDto {
  viewType: "region";
}

export interface CityType extends ViewPostTypeDto {
  viewType: "city";
  polygon: string;
  markerCount: number;
}
