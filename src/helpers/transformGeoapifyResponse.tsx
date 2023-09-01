import React from "react";

interface GeoapifyModel {
  name: string;
  street: string;
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  postcode: number;
  formattedAddress: string;
}

function transformGeoapifyResponse(response: any): GeoapifyModel[] | null {
  if (response == null) return null;
  const model: GeoapifyModel[] = quickSortPopularity(response.features);
  return model;
}
function quickSortPopularity(array: any): any {
  console.log(array);
  if (array.length <= 1) {
    return array;
  }

  let pivot = array[0];
  const left = [];
  const right = [];

  for (let i = 1; i < array.length; i++) {
    if (array[i].rank.popularity > pivot.rank.popularity) {
      left.push(array[i]);
    } else {
      right.push(array[i]);
    }
  }
  pivot = transformObjectToModel(pivot);

  return [...quickSortPopularity(left), pivot, ...quickSortPopularity(right)];
}
function transformObjectToModel(obj: any) {
  return {
    name: obj?.properties?.name ?? "",
    street: obj?.properties?.street ?? "",
    city: obj?.properties?.city ?? "",
    country: obj?.properties?.country ?? "",
    latitude: obj?.properties?.lat,
    longitude: obj?.properties?.lon,
    postcode: obj?.properties?.postcode ?? "",
    formattedAddress: obj?.properties?.formatted,
  };
}
export function getMostPopularResponse(response: any): null | GeoapifyModel {
  if (response == null) return null;
  if (response.features.length == 0) return null;

  var popular = response.features[0];
  if (response.features.length < 4) {
    for (let i = 1; i < response.features.length; i++) {
      if (
        response.features[i].properties.rank.popularity >
        popular.properties.rank.popularity
      ) {
        popular = response.features[i];
      }
    }
  }
  var result: GeoapifyModel = {
    name: popular.properties?.name ?? "",
    street: popular.properties?.street ?? "",
    city: popular.properties?.city ?? "",
    country: popular.properties?.country ?? "",
    latitude: popular.properties?.lat,
    longitude: popular.properties?.lon,
    postcode: popular.properties?.postcode ?? "",
    formattedAddress: popular.properties?.formatted,
  };
  return result;
}

export default transformGeoapifyResponse;
