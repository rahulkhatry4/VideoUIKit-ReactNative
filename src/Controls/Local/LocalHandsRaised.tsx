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
import {IRtcEngine} from 'react-native-agora';
import RtmContext from "agora-rn-uikit/src/Contexts/RtmContext";
interface LocalAudioMuteProps {
  btnText?: string;
  variant?: 'outlined' | 'text';
}

const LocalHandsRaised: React.FC<LocalAudioMuteProps> = (props) => {
  const localUser = useContext(LocalContext);
  const {
    btnText = localUser.raiseHand === ToggleState.enabled
      ? "Lower Hand"
      : "Raise Hand",
    variant = "Outlined",
  } = props;
  const {styleProps} = useContext(PropsContext);
  const {localBtnStyles, remoteBtnStyles} = styleProps || {};
  const {muteLocalAudio} = localBtnStyles || {};
  const {muteRemoteAudio} = remoteBtnStyles || {};
  const {RtcEngine, dispatch} = useContext(RtcContext);
  const {sendChannelMessage, uidMap} = useContext(RtmContext || {});

  return (
    <BtnTemplate
      name={localUser.raiseHand === ToggleState.enabled ? 'lowerHand' : 'raiseHand'}
      btnText={btnText}
      style={{
        ...styles.localBtn,
        ...(variant === 'Outlined'
          ? (muteLocalAudio as object)
          : (muteRemoteAudio as object)),
          alignSelf: 'center'
      }}
      onPress={() => {
        sendChannelMessage({
          messageType:"HandsRequest",
          rtcId:localUser.uid as number
        })
      }}
    />
  );
};


export default LocalHandsRaised;
