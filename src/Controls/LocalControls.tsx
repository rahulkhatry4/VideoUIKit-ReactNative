import React, {useContext} from 'react';
import {Modal, View, TouchableOpacity, TouchableWithoutFeedback, Text, StyleSheet} from 'react-native';
import styles from '../Style';
import EndCall from './Local/EndCall';
import LocalAudioMute from './Local/LocalAudioMute';
import LocalVideoMute from './Local/LocalVideoMute';
import SwitchCamera from './Local/SwitchCamera';
import RemoteControls from './RemoteControls';
import {MaxUidConsumer} from '../Contexts/MaxUidContext';
import PropsContext, {Layout} from '../Contexts/PropsContext';
import {LocalContext} from '../Contexts/LocalUserContext';
import RtcContext from '../Contexts/RtcContext';
import {ClientRoleType} from 'react-native-agora';
import LocalHandsRaised from 'agora-rn-uikit/src/Controls/Local/LocalHandsRaised';
import LocalScreenShare from 'agora-rn-uikit/src/Controls/Local/LocalScreenShare';
import LocalChat from 'agora-rn-uikit/src/Controls/Local/LocalChat';
import MenuOptions, {handleMenu} from './Local/MenuOptions';

interface ControlsPropsInterface {
  showButton?: boolean;
  onPress?:any;
}

const Controls: React.FC<ControlsPropsInterface> = (props) => {
  const {styleProps, rtcProps} = useContext(PropsContext);
  const {dispatch}  = useContext(RtcContext);
  const localUser = useContext(LocalContext);
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
            <MenuOptions />
          </>
        )}
        <EndCall />
        <Modal
          transparent
          animationType={"slide"}
          visible={localUser.menuOptions == 0 ? true : false}
          onRequestClose={() => handleMenu(localUser, dispatch)}>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => handleMenu(localUser, dispatch)}
            style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.65)',
              justifyContent: 'flex-end',
              alignItems: 'center'
            }}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: 232,
                  width: '98%',
                  backgroundColor: '#fff',
                  borderTopLeftRadius: 15,
                  borderTopRightRadius: 15,
                }}>
                  <View style={{height: 5, width: 125, backgroundColor: 'grey', alignSelf: 'center', borderRadius: 5, marginVertical: 12}} />
                <View>
                  <View style={style.option}>
                    <LocalHandsRaised />
                    <Text style={style.optionText}>{localUser.raiseHand ? "Raise " : "Lower "}Hand</Text>
                  </View>
                  <View style={style.option}>
                    <LocalScreenShare />
                    <Text style={style.optionText}>{localUser.screenShare ? "Stop " : "Start "}Screen Share</Text>
                  </View>
                  <View style={style.option}>
                    <LocalChat onPress={props.onPress} />
                    <Text style={style.optionText}>Chat</Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
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

const style = StyleSheet.create({
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    paddingHorizontal: 16
  },
  optionText: {
    marginLeft: 8
  }
})
