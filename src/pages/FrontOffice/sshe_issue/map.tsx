import { Modal } from 'antd';
import { useState } from 'react';
import {
  GoogleMap,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

type MapPropsType = {
  visible: boolean;
  onCancel: () => void;
  mode: string;
};

const MyMapComponent = withScriptjs(
  withGoogleMap((props) => {
    const [markerpos, setmarkerpos] = useState<{
      lat: number | undefined;
      lng: number | undefined;
    } | null>(null);
    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 13.740819806880188, lng: 100.51283607894975 }}
        onClick={(e) => {
          console.log(e.latLng?.lat(), e.latLng?.lng());
          setmarkerpos({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
        }}
      >
        {markerpos !== null && (
          <Marker
            position={{
              lat: markerpos?.lat as number,
              lng: markerpos?.lng as number,
            }}
          />
        )}
      </GoogleMap>
    );
  }),
);
const Map: React.FC<MapPropsType> = (props) => {
  return (
    <>
      <Modal
        visible={props.visible}
        destroyOnClose
        onCancel={props.onCancel}
        width={1300}
      >
        <MyMapComponent
          googleMapURL={
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgJ_GNQDIGrhLK4KQJSOijmzULn_GTjo8'
          }
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
        />
      </Modal>
    </>
  );
};

export default Map;
