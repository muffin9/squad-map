import { CategoryType } from '@/interfaces/Category';

export type PlaceType = {
  place_id: number;
  place_name: string;
  address: string;
  latitude: number;
  longitude: number;
  detail_link?: string;
};

export type CategorizedPlaces = {
  category_info: CategoryType;
  places: PlaceType[];
};

export type MapUserType = {
  host_id: number;
  host_nickname: string;
  host_profile_image: string;
};

export type MapHeaderType = {
  map_id: number;
  category_info: CategoryType[];
};
