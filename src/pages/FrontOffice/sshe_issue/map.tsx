import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import { useState } from 'react';
import {
  GoogleMap,
  InfoWindow,
  Marker,
  withGoogleMap,
  withScriptjs,
} from 'react-google-maps';

type MapPropsType = {
  visible: boolean;
  onCancel: () => void;
  onConfirm: (e: Latlngtype | null) => void;
  markerVal: Latlngtype | null;
  mode: string;
  dataSource: Array<APITypes.SSHEIssueApitype>;
};

type GoogleMapComponentPropsTyep = {
  mode: string;
  handlemapSelectClick: (e: Latlngtype) => void;
  markerVal: Latlngtype | null;
  dataSource: Array<APITypes.SSHEIssueApitype>;
};

export type Latlngtype = {
  lat: number | undefined;
  lng: number | undefined;
};

const svgMarker = {
  path: 'M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z',
  fillColor: 'blue',
  fillOpacity: 1,
  strokeWeight: 0,
  rotation: 0,
  scale: 1.5,
  // anchor: new google.maps.Point(15, 30),
};

const MyMapComponent = withScriptjs(
  withGoogleMap<GoogleMapComponentPropsTyep>((props) => {
    const [markerpos, setmarkerpos] = useState<Latlngtype | null>(
      props.markerVal,
    );
    const [infodataview, setinfodataview] = useState<string | null>(null);

    const onMarkerClick = (data: string) => {
      if (data === infodataview) {
        return;
      }
      setinfodataview(data);
    };

    return (
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 13.740819806880188, lng: 100.51283607894975 }}
        onClick={(e) => {
          setmarkerpos({ lat: e.latLng?.lat(), lng: e.latLng?.lng() });
          props.handlemapSelectClick({
            lat: e.latLng?.lat(),
            lng: e.latLng?.lng(),
          });
        }}
      >
        {props.mode == 'select' && markerpos !== null && (
          <Marker
            position={{
              lat: markerpos?.lat as number,
              lng: markerpos?.lng as number,
            }}
          />
        )}

        {props.mode == 'display' && (
          <>
            {props.dataSource.map((item) => (
              <Marker
                key={item.id}
                position={{
                  lat: parseFloat(item.lat),
                  lng: parseFloat(item.long),
                }}
                onClick={() => onMarkerClick(item.id)}
              >
                {infodataview === item.id && (
                  <InfoWindow
                    position={{
                      lat: parseFloat(item.lat),
                      lng: parseFloat(item.long),
                    }}
                    onCloseClick={() => setinfodataview(null)}
                  >
                    <>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>Date : </span>
                        {item.date}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>Location : </span>
                        {item.location}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>
                          Primary Case :{' '}
                        </span>
                        {item.issue_type_name}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>Hazard : </span>
                        {item.hazard_name}
                      </p>
                      <p>
                        <span style={{ fontWeight: 'bold' }}>
                          Description :{' '}
                        </span>
                        {item.description}
                      </p>
                    </>
                  </InfoWindow>
                )}
              </Marker>
            ))}
          </>
        )}
      </GoogleMap>
    );
  }),
);
const Map: React.FC<MapPropsType> = (props) => {
  const [latlng, setlatlng] = useState<Latlngtype | null>(null);
  const handlemapSelectClick = (params: Latlngtype) => {
    console.log(params);
    setlatlng(params);
  };
  // console.log(props.dataSource)
  return (
    <>
      <Modal
        visible={props.visible}
        destroyOnClose
        onCancel={props.onCancel}
        width={1300}
        footer={[
          <Button
            key="cancel"
            onClick={props.onCancel}
            icon={<CloseOutlined />}
          >
            ยกเลิก
          </Button>,
          props.mode == 'select' ? (
            <Button
              key="confirm"
              type="primary"
              onClick={() => props.onConfirm(latlng)}
              icon={<CheckOutlined />}
            >
              ยืนยันตำแหน่งของโครงการ
            </Button>
          ) : (
            ''
          ),
        ]}
      >
        <MyMapComponent
          googleMapURL={
            'https://maps.googleapis.com/maps/api/js?key=AIzaSyDgJ_GNQDIGrhLK4KQJSOijmzULn_GTjo8'
          }
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={<div style={{ height: `600px` }} />}
          mapElement={<div style={{ height: `100%` }} />}
          mode={props.mode}
          handlemapSelectClick={handlemapSelectClick}
          markerVal={props.markerVal}
          dataSource={props.dataSource}
        />
      </Modal>
    </>
  );
};

export default Map;
