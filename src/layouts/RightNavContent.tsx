import { Space, Tooltip } from 'antd';
import { history } from 'umi';
import backoffice_menu from '../../config/backoffice';
import frontoffice_menu from '../../config/frontoffice';
import AvatarDropdown from './AvatarDropdown';

const RightNavContent = () => {
  return (
    <>
      <Space direction="horizontal">
        <Tooltip title={'Front office'}>
          <p onClick={() => history.push(frontoffice_menu.REDIRECT_PATH)}>
            <img
              src="/assets/sshe 64x64.png"
              width={40}
              height={40}
              alt="frontoffice-icon"
            />
          </p>
        </Tooltip>
        <Tooltip title={'Back office'}>
          <p onClick={() => history.push(backoffice_menu.REDIRECT_PATH)}>
            <img
              src="/assets/backoffice 64x64.png"
              width={40}
              height={40}
              alt="backoffice-icon"
            />
          </p>
        </Tooltip>
        <Tooltip title={'Manual'}>
          <p>
            <a href="/PTT-SSHE-AI-Prototype2-v1.5.pdf">
              <img
                src="/assets/manual 64x64.png"
                width={40}
                height={40}
                alt="manual-icon"
              />
            </a>
          </p>
        </Tooltip>
        <Tooltip title={'การแจ้งเตือน'}>
          <p>
            <img
              src="/assets/bell-01.png"
              width={40}
              height={40}
              alt="bell-icon"
            />
          </p>
        </Tooltip>
        <AvatarDropdown />
      </Space>
    </>
  );
};

export default RightNavContent;
