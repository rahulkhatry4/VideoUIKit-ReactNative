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
interface LocalRaiseHandProps {
  btnText?: string;
  variant?: 'outlined' | 'text';
}

const LocalHandsRaised: React.FC<LocalRaiseHandProps> = (props) => {
  const localUser = useContext(LocalContext);
  const {
    btnText = localUser.raiseHand === ToggleState.enabled
      ? "Raise Hand"
      : "Lower Hand",
  } = props;
  const {styleProps, rtmProps} = useContext(PropsContext);
  const {localBtnStyles, remoteBtnStyles} = styleProps || {};
  const {RtcEngine, dispatch} = useContext(RtcContext);
  const {sendChannelMessage, uidMap} = useContext(RtmContext || {});

  return (
    <BtnTemplate
      name={localUser.raiseHand === ToggleState.enabled ? 'raiseHand' : 'lowerHand'}
      btnText={btnText}
      style={{
        ...styles.localBtn,
          alignSelf: 'center'
      }}
      onPress={() => raiseHand(localUser, dispatch, sendChannelMessage, rtmProps.username)}
    />
  );
};

export const raiseHand = async (
  local: UidInterface,
  dispatch: DispatchType,
  sendChannelMessage,
  username
) => {

  const localState = local.raiseHand;
  console.log("staet", username)
  
  sendChannelMessage({
    messageType: "HandsRequest",
    username: username,
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
