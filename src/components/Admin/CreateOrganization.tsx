import React, { useRef, useState } from "react";
import BaseModal from "../BaseModal";
import {
  IonItem,
  IonRouterLink,
  IonGrid,
  IonRow,
  IonCol,
  IonCheckbox,
  IonButton,
  IonSpinner,
  IonLoading,
} from "@ionic/react";
import ButtonSpinner from "../ButtonSpinner";
import InputValidationComponent from "../InputValidationComponent";
import AxiosInstance, { AxiosNoHeaders } from "../../Http/AxiosInstance";
import getResponseErrors from "../../helpers/getResponseErrors";
import TextInput from "../Inputs/TextInput";
import GoogleMapJsComponent, {
  PlacesAutocomplete,
} from "../ExternalServices/GoogleMapJsComponent";
import { GEOCODE } from "../../constants/Geocode";
import { FormProvider, useForm } from "../../context/useForm";
import BasePaths from "../../Http/BasePaths";
import { APIKEYS } from "../../Keys/APIKEYS";
import transformGeoapifyResponse, {
  getMostPopularResponse,
} from "../../helpers/transformGeoapifyResponse";
interface Props {
  isModalOpen: boolean;
  onClose: () => void;
  onCreateSuccess: (data: any) => void;
  onCreateFailed?: () => void;
}
function CreateOrganization({
  isModalOpen,
  onClose,
  onCreateSuccess,
  onCreateFailed,
}: Props) {
  const [showSpinner, setShowSpinner] = useState(false);
  const [responseError, setResponseError] = useState("");
  const [isAddManual, setIsAddManual] = useState(false);
  const [isGeoLoading, setIsGeoLoading] = useState(false);
  const [marker, setMarker] = useState<any>(null);
  const form = useForm();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [barangay, setBarangay] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  async function handleSubmit() {
    setResponseError((s) => "");
    if (!description) {
      setResponseError((s) => {
        s = "The description field is required. \n";
        return s;
      });
    }
    if (isAddManual) {
      if (!name) {
        setResponseError((s) => {
          s += "The name field is required. \n";
          return s;
        });
      }
      if (!city) {
        setResponseError((s) => {
          s += "The city field is required. \n";
          return s;
        });
      }
      if (!street) {
        setResponseError((s) => {
          s += "The street field is required. \n";
          return s;
        });
      }
    } else {
      if (!name) {
        setResponseError((s) => {
          s += "Please search an organization. \n";
          return s;
        });
      }
    }

    if (name && description && city && zipCode && marker) {
      setShowSpinner((s) => true);
      try {
        const response = await AxiosInstance().post(
          "admin/create-organization",
          {
            name: name,
            description: description,
            street: street,
            barangay: barangay,
            city: city,
            zip_code: zipCode,
            latitude: marker.lat,
            longitude: marker.lon,
          }
        );
        onCreateSuccess(response.data);
        clearFields();
      } catch (error: any) {
        setResponseError((s) => getResponseErrors(error));
        if (error.response.status == 403) {
          alert("You do not have permission to perform this action.");
        }
      }
      setShowSpinner((s) => false);
    }
  }
  function onAddressSelected(address: any) {
    setMarker((marker: any) => {
      marker = {
        lat: address.lat,
        lon: address.lon,
        draggable: false,
      };
      return marker;
    });
    setName(address.formattedAddress.split(",")[0]);
    setStreet(address.street);
    setCity(address.city);
    setZipCode(address.zip_code);
    setLatitude(address.lat);
    setLongitude(address.lon);
  }
  function onCheckboxManualChange(value: boolean) {
    if (value) {
      clearFields();
      setMarker(null);
    }
    setIsAddManual((s) => value);
  }
  function clearFields() {
    setName("");
    setStreet("");
    setDescription("");
    setBarangay("");
    setCity("");
    setZipCode("");
    setLatitude(0);
    setLongitude(0);
  }
  async function getLatLng() {
    setIsGeoLoading((s) => true);
    try {
      // `${BasePaths.GEOAPIFY}search?name=${name}&street=${fullStreet}&city=${city}&postcode=${zipCode}&apiKey=${APIKEYS.GEOAPIFY}`
      const fullStreet = street + ", " + barangay;
      const response = await AxiosNoHeaders().get(
        `${BasePaths.GEOAPIFY}search?name=${name}&postcode=${zipCode}&apiKey=${APIKEYS.GEOAPIFY}`
      );
      const popular = getMostPopularResponse(response.data);
      console.log(popular);
      setMarker((marker: any) => {
        marker = {
          lat: popular?.latitude,
          lon: popular?.longitude,
          draggable: true,
          dragCallback: (e: any) => {
            setMarker((m: any) => {
              m.lat = e.latLng.lat();
              m.lon = e.latLng.lng();
              return m;
            });
          },
        };
        return marker;
      });
    } catch (error) {
      alert("An error occured while fetching data, please try again later.");
    }

    setIsGeoLoading((s) => false);
  }
  return (
    <BaseModal
      isOpen={isModalOpen}
      title="Create Organization"
      onClose={onClose}
    >
      <div className="text-end">
        <IonCheckbox
          labelPlacement="end"
          onIonChange={(e) => onCheckboxManualChange(!isAddManual)}
          value={isAddManual}
        >
          Add Manually
        </IonCheckbox>
      </div>
      {!isAddManual && (
        <>
          <PlacesAutocomplete onSelectPlace={(e) => onAddressSelected(e)} />
          <div className="my-2">
            <TextInput
              value={description}
              required
              label="Description"
              onChange={(v) => setDescription((s) => v)}
            />
          </div>
        </>
      )}
      {isAddManual && (
        <div className="spacing-y-2">
          <TextInput
            value={name}
            required
            label="Name"
            onChange={(v) => setName((s) => v)}
          />
          <TextInput
            value={description}
            required
            label="Description"
            onChange={(v) => setDescription((s) => v)}
          />
          <TextInput
            value={street}
            required
            label="Street"
            onChange={(v) => setStreet((s) => v)}
          />
          <TextInput
            value={barangay}
            required={false}
            label="Barangay"
            onChange={(v) => setBarangay((s) => v)}
          />
          <TextInput
            value={city}
            required
            label="City"
            onChange={(v) => setCity((s) => v)}
          />
          <TextInput
            value={zipCode}
            required
            label="Zip Code"
            onChange={(v) => setZipCode((s) => v)}
          />
          <div className="text-end mb-3">
            <IonButton
              color="dark"
              size="small"
              className="me-2"
              onClick={() => getLatLng()}
              disabled={isGeoLoading}
            >
              <IonSpinner className={`me-1 ${isGeoLoading ? "" : "d-none"}`} />
              Get Latitude & longitude
            </IonButton>
          </div>
        </div>
      )}

      <GoogleMapJsComponent
        zoom={16}
        center={marker ?? GEOCODE.CAGAYANDEORO}
        markers={marker != null ? [marker] : undefined}
      />
      <p className="text-danger ws-pre">{responseError}</p>
      <div className="text-center">
        <ButtonSpinner
          text="Add Organization"
          onClick={handleSubmit}
          textSize="sm"
        />
      </div>
      <IonLoading isOpen={showSpinner} />
    </BaseModal>
  );
}

export default CreateOrganization;
