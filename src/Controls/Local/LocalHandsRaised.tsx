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
      onPress={() => raiseHand(localUser, dispatch, sendChannelMessage)}
    />
  );
};

export const raiseHand = async (
  local: UidInterface,
  dispatch: DispatchType,
  sendChannelMessage
) => {

  const localState = local.raiseHand;

  sendChannelMessage({
    messageType: "HandsRequest",
    rtcId: local.uid as number,
  });
  dispatch({
    type: "LocalRaiseHand",
    value: [
      localState === ToggleState.enabled
        ? ToggleState.disabling
        : ToggleState.enabling,
    ],
  });
};



export default LocalHandsRaised;
