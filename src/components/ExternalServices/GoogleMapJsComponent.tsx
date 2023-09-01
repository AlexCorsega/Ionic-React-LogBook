import React, { useMemo, useState } from "react";
import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import { APIKEYS } from "../../Keys/APIKEYS";
import generateGuid from "../../helpers/generateGuid";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { AxiosNoHeaders } from "../../Http/AxiosInstance";
import {
  IonCard,
  IonIcon,
  IonInput,
  IonItem,
  IonRippleEffect,
  IonSearchbar,
  IonSpinner,
} from "@ionic/react";
import { refreshOutline } from "ionicons/icons";
import { Autocomplete, Box, TextField } from "@mui/material";
import BasicCard from "../Cards/BasicCard";
import BasePaths from "../../Http/BasePaths";

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
function GoogleMapJsComponent({ center, markers, zoom }: Props) {
  const libraries = ["places"];
  let libRef = React.useRef(libraries);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: APIKEYS.GOOGLE,
  });
  if (!isLoaded && !loadError)
    return <div className="text-center mt-3 fw-bold">Loading maps...</div>;
  if (loadError)
    return (
      <div className="text-center text-danger mt-3 fw-bold">
        An error occured while loading maps, please check internet connection.
      </div>
    );
  return <Map center={center} markers={markers} zoom={zoom} />;
}
function Map({ center, markers, zoom }: Props) {
  const [showPlaceSpinner, setShowPlaceSpinner] = useState(false);
  function handleAddressSelection(value: any) {
    console.log(value);
  }
  return (
    <>
      <GoogleMap
        onClick={(e) => console.log(e.latLng?.lat(), e.latLng?.lng())}
        zoom={zoom ?? 17}
        center={{
          lat: parseFloat(center.lat.toString()),
          lng: parseFloat(center.lon.toString()),
        }}
        mapContainerStyle={{ height: "500px", width: "100%" }}
      >
        {markers &&
          markers.length > 0 &&
          markers.map((marker, index) => {
            const position = {
              lat: parseFloat(marker.lat.toString()),
              lng: parseFloat(marker.lon.toString()),
            };

            return (
              <Marker
                key={index}
                position={position}
                draggable={marker.draggable}
                onDragEnd={marker.dragCallback}
              >
                {marker.isLabelShown && marker.isLabelShown == true && (
                  <InfoWindow position={position}>
                    <p className="fw-bold">{marker.label}</p>
                  </InfoWindow>
                )}
              </Marker>
            );
          })}
      </GoogleMap>
    </>
  );
}
interface PlacesProps {
  onSelectPlace: (place: any) => void;
}
export const PlacesAutocomplete = ({ onSelectPlace }: PlacesProps) => {
  const [suggestedPlaces, setSuggestedPlaces] = useState<any>();
  const [showSpinner, setShowSpinner] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string>();
  async function handleOnSearchOrganization(text: string) {
    if (text.trim() == "") {
      setIsOpen(false);
      setSuggestedPlaces([]);
    } else {
      setShowSpinner((s) => true);
      try {
        const response = await AxiosNoHeaders()
          .get(`${BasePaths.GEOAPIFY}search?text=${text}&format=json&apiKey=${APIKEYS.GEOAPIFY}
            `);
        if (response.data.results.length == 0) {
          setSuggestedPlaces([]);
          setIsOpen(false);
        } else {
          setSuggestedPlaces(
            response.data.results.map((res: any) => {
              return {
                lat: res.lat,
                lon: res.lon,
                formattedAddress: res.formatted,
                street: res.street,
                zip_code: res.postcode,
                city: res.city,
                state: res.state,
              };
            })
          );
          setIsOpen(true);
        }
        console.log(response);
      } catch (error) {
        alert(error);
      }
      setShowSpinner((s) => false);
    }
  }

  return (
    <div className="relative">
      <div className="relative">
        <IonSearchbar
          debounce={500}
          value={value}
          onIonInput={(e) => {
            setValue(e.target.value?.toString() ?? "");
            handleOnSearchOrganization(e.target.value?.toString() ?? "");
          }}
        ></IonSearchbar>
        <IonSpinner
          name="circular"
          className={`absolute center-right ${showSpinner ? "" : "d-none"}`}
          style={{ zIndex: 100, right: 50 }}
        />
      </div>
      <IonCard
        style={{
          marginTop: "-5px",
          zIndex: 101,
          maxHeight: "500px",
          overflowY: "auto",
        }}
        className={`absolute w-100 ${isOpen ? "" : "d-none"}`}
      >
        {suggestedPlaces &&
          suggestedPlaces.map((suggested: any, index: number) => (
            <div
              key={index}
              className="ion-activatable ripple-parent rectangle"
              onClick={() => {
                setValue(suggested.formattedAddress);
                onSelectPlace(suggested);
                setIsOpen(false);
              }}
            >
              <IonItem>
                <h6>{suggested.formattedAddress}</h6>
              </IonItem>
              <IonRippleEffect></IonRippleEffect>
            </div>
          ))}
      </IonCard>
    </div>
  );
};
export default GoogleMapJsComponent;
