import { Modal } from 'antd';
3; //import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"

type MapPropsType = {
  visible: boolean;
};

const Map: React.FC<MapPropsType> = (props) => {
  return (
    <>
      <Modal visible={props.visible} destroyOnClose></Modal>
    </>
  );
};

export default Map;
