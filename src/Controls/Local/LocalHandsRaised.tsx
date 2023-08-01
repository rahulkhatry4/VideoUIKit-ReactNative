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
  const {styleProps, setUserHandRaised, rtmProps} = useContext(PropsContext);
  const {dispatch} = useContext(RtcContext);
  const {sendChannelMessage} = useContext(RtmContext || {});

  return (
    <BtnTemplate
      name={localUser.raiseHand === ToggleState.enabled ? 'raiseHand' : 'lowerHand'}
      // btnText={btnText}
      style={{
        ...styles.localBtn,
          alignSelf: 'center'
      }}
      onPress={() => raiseHand(localUser, dispatch, sendChannelMessage, rtmProps.username, setUserHandRaised)}
    />
  );
};

export const raiseHand = async (
  local: UidInterface,
  dispatch: DispatchType,
  sendChannelMessage,
  username,
  setUserHandRaised
) => {

  const localState = local.raiseHand;
  // console.log("staet", localState);
  
  if (localState === 1) {
    sendChannelMessage({
      messageType: "HandsRequest",
      username: username,
    });
    setUserHandRaised(username)
  } else {
    sendChannelMessage({
      messageType: 'HandsRequest',
      username: "",
    });
    setUserHandRaised("")
  }


  dispatch({
    type: "LocalRaiseHand",
    value: [
      localState === ToggleState.disabled
        ? ToggleState.enabled
        : ToggleState.disabled,
    ],
  });
};

export default LocalHandsRaised;
