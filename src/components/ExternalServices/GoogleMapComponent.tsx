import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker } from "@capacitor/google-maps";
import generateGuid from "../../helpers/generateGuid";
import { useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import { Geolocation, Position } from "@capacitor/geolocation";
import { APIKEYS } from "../../Keys/APIKEYS";

interface Props {
  center: { lat: number; lon: number };
  markers?: {
    lat: number;
    lon: number;
    draggable?: boolean;
    dragCallback?: () => void;
    title?: string;
    label?: string;
    isLabelShown?: boolean;
  }[];
  zoom?: number;
}

function GoogleMapComponent({ center, markers, zoom }: Props) {
  const mapRef = useRef<HTMLElement>();
  const newMapRef = useRef<HTMLDivElement>(null);
  let map: GoogleMap;
  const guid = generateGuid();
  useEffect(() => {
    const get = async () => {
      await createMap();
      await addMapMarker();
    };
    get();
  }, []);

  // useIonViewDidEnter(async () => {
  //   await createMap();
  //   await addMapMarker();
  //   alert("test");
  // });
  // useIonViewWillEnter(async () => {
  //   if (firstLoad.current) {
  //     userCoordinates = await Geolocation.getCurrentPosition();

  //     await createMap();
  //     // await addMapMarker();

  //     firstLoad.current = false;
  //   }
  // });
  async function createMap() {
    if (!mapRef.current) return;
    map = await GoogleMap.create({
      id: guid,
      element: mapRef.current,
      apiKey: APIKEYS.GOOGLE,
      config: {
        center: {
          lat: parseFloat(center.lat.toString()),
          lng: parseFloat(center.lon.toString()),
        },
        mapTypeId: "hybrid",
        zoom: zoom ?? 17,
      },
    });
  }
  async function addMapMarker() {
    if (!map)
      alert("Map is not loaded properly, please check internet connection.");
    if (markers) {
      for (let i = 0; i < markers.length; i++) {
        var marker: Marker = {
          coordinate: {
            lat: parseFloat(markers[i].lat.toString()),
            lng: parseFloat(markers[i].lon.toString()),
          },
          draggable: markers[i].draggable,
          title: markers[i].title,
          snippet: markers[i].title,
        };
        await map.addMarker(marker);
        // if (markers[i].isLabelShown) {
        //   var info = new google.maps.InfoWindow({ content: markers[i].label });
        // }
      }
      // const iW = new google.maps.InfoWindow({ content: "test" });
    }
  }
  return (
    <>
      <div className="component-wrapper">
        <capacitor-google-map
          ref={mapRef}
          style={{
            display: "inline-block",
            width: "100%",
            height: 400,
          }}
        ></capacitor-google-map>
      </div>
    </>
  );
}
export const getUserCoordinates = async () => {
  return await Geolocation.getCurrentPosition();
};
export default GoogleMapComponent;
