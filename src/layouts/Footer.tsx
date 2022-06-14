import { Layout } from "antd"


const { Footer } = Layout;

const Footers = () =>{
    return (
        <>
            <Footer style={{padding : '10px'  , background : 'linear-gradient(to right,#247CB3 0%,#247CB3 80%,#68BE58 100%)' }}>
              <div style={{ color : 'white' , height : '100%' , width : '100%' , display : 'flex' , justifyItems : 'center' , justifyContent : 'space-between' , alignItems : 'center'  }}>
                    <div style={{width : '50%'}}>
                    <img
                        src={`/assets/white-logo.png`}
                        width={60}
                        height={30}
                        alt="ptt-logo"
                        style={{marginRight : '2%'}}
                    />
                      บริษัท ปตท. จำกัด (มหาชน)
                    </div>
                    <div>
                      555 ถนนวิภาวดีรังสิต แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900
                    </div>
                </div>
              </Footer>
        </>
    )
}

export default Footers