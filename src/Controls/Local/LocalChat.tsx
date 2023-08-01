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
  onPress?: any;
}

const LocalChat: React.FC<LocalScreenShareProps> = (props) => {
  return (
    <BtnTemplate
      name={'chat'}
      // btnText={btnText}
      style={{
        ...styles.localBtn,
          alignSelf: 'center'
      }}
      onPress={() => {
        props.onPress()

      }
      }
    />
  );
};



export default LocalChat;
