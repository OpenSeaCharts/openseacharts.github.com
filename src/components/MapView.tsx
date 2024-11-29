import {
  FullscreenControl,
  GeolocateControl,
  Map,
  NavigationControl,
  ScaleControl,
} from 'react-map-gl/maplibre';
import { Protocol } from "pmtiles";
import maplibregl from 'maplibre-gl';

export function MapView() {
  const protocol = new Protocol()
  maplibregl.addProtocol('pmtiles', protocol.tile)

  return (
    <>
      <Map
        initialViewState={{
          longitude: 8.26,
          latitude: 53.71,
          zoom: 9,
        }}
        maxPitch={80}
        style={{width: "100%", height: "93.5623vh"}}
        mapStyle="https://raw.githubusercontent.com/OpenSeaCharts/osc-style/refs/heads/main/openseacharts.json"
      >
        <NavigationControl visualizePitch={true}/>
        <FullscreenControl/>
        <GeolocateControl trackUserLocation={true} showAccuracyCircle={true}
                          showUserLocation={true}/>
        <ScaleControl unit={"metric"}/>
      </Map>
    </>
  );
}