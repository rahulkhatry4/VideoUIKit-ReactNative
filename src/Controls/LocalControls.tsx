import React, {useContext} from 'react';
import {View} from 'react-native';
import styles from '../Style';
import EndCall from './Local/EndCall';
import LocalAudioMute from './Local/LocalAudioMute';
import LocalVideoMute from './Local/LocalVideoMute';
import SwitchCamera from './Local/SwitchCamera';
import RemoteControls from './RemoteControls';
import {MaxUidConsumer} from '../Contexts/MaxUidContext';
import PropsContext, {Layout} from '../Contexts/PropsContext';
import {ClientRoleType} from 'react-native-agora';
import LocalHandsRaised from 'agora-rn-uikit/src/Controls/Local/LocalHandsRaised';
import LocalScreenShare from 'agora-rn-uikit/src/Controls/Local/LocalScreenShare';
import LocalChat from 'agora-rn-uikit/src/Controls/Local/LocalChat';

interface ControlsPropsInterface {
  showButton?: boolean;
  onPress?:any;
}

const Controls: React.FC<ControlsPropsInterface> = (props) => {
  const {styleProps, rtcProps} = useContext(PropsContext);
  const {localBtnContainer} = styleProps || {};
  const showButton = props.showButton !== undefined ? props.showButton : true;
  return (
    <>
      <View style={{...styles.Controls, ...(localBtnContainer as object)}}>
        {rtcProps.role !== ClientRoleType.ClientRoleAudience && (
          <>
            <LocalAudioMute />
            <LocalVideoMute />
            <SwitchCamera />
            <LocalHandsRaised />
            <LocalScreenShare />
            <LocalChat onPress={props.onPress} />
          </>
        )}
        <EndCall />
      </View>
      {showButton ? (
        <MaxUidConsumer>
          {(users) => (
            <View
              style={{
                ...styles.Controls,
                bottom: styles.Controls.bottom + 70,
              }}>
              {rtcProps.layout !== Layout.Grid && (
                <RemoteControls user={users[0]} showRemoteSwap={false} />
              )}
            </View>
          )}
        </MaxUidConsumer>
      ) : (
        <></>
      )}
    </>
  );
};

export default Controls;
