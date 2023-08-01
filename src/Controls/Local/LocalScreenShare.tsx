import React, {useContext} from 'react';
import PropsContext, {
  ToggleState,
  UidInterface,
} from '../../Contexts/PropsContext';
import RtcContext from '../../Contexts/RtcContext';
import BtnTemplate from '../BtnTemplate';
import styles from '../../Style';
import {LocalContext} from '../../Contexts/LocalUserContext';
import {DispatchType} from '../../Contexts/RtcContext';
import RtmContext from "agora-rn-uikit/src/Contexts/RtmContext";
interface LocalScreenShareProps {
  btnText?: string;
  variant?: 'outlined' | 'text';
}

const LocalScreenShare: React.FC<LocalScreenShareProps> = (props) => {
  const localUser = useContext(LocalContext);
  const {RtcEngine, dispatch} = useContext(RtcContext);

  return (
    <BtnTemplate
      name={localUser.screenShare === ToggleState.enabled ?  'stopScreenShare' : 'startScreenShare'}
      // btnText={btnText}
      style={{
        ...styles.localBtn,
          alignSelf: 'center'
      }}
      onPress={() => {
        dispatch({
          type: 'LocalScreenShare',
          value: [
            localUser.screenShare === ToggleState.disabled
              ? ToggleState.enabled
              : ToggleState.disabled,
          ],
        });
        console.log(localUser.screenShare);

        console.log('CLICK SEE');
        if (localUser.screenShare === ToggleState.enabled) {
          RtcEngine.stopScreenCapture();
        } else {
          RtcEngine.startScreenCapture({
            captureVideo: true,
          });
        }
      }
      }
    />
  );
};



export default LocalScreenShare;
