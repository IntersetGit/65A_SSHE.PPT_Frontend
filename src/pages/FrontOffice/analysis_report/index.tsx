import { Button, Drawer, Modal } from "antd"
import React from "react";


const AnalysisReport : React.FC = () =>{

    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const [isBigdrawervis, setBigdrawervis] = React.useState(false);

    const showModal = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };
    return (
    <>
        AnalysisReport
        {/* <Drawer
            closable={false}
            visible={true}
        >
            <Button type="primary" onClick={showModal}>
                Open Modal
            </Button>
            <Button type="primary" onClick={() => setBigdrawervis(true)}>
                Open Drawer
            </Button>
            <Modal title="Basic Modal" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Modal>
        </Drawer>
        <Drawer width={250} visible={isBigdrawervis}>
            250 WIDTH
        </Drawer> */}
    </>)
}

export default AnalysisReport