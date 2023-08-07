import React, {useContext} from 'react';
import {Text} from 'react-native';
import {RenderModeType, RtcSurfaceView} from 'react-native-agora';
import styles from '../Style';
import RtmContext from '../Contexts/RtmContext';
import PropsContext, {UidInterface} from '../Contexts/PropsContext';
import {StyleSheet, View} from 'react-native';
import ImageIcon from '../Controls/ImageIcon';
import Username from './Usernames';

// const LocalView = RtcLocalView.SurfaceView;
// const RemoteView = RtcRemoteView.SurfaceView;

interface MaxViewInterface {
  user: UidInterface;
  fallback?: React.ComponentType;
}
/**
 * MaxVideoView takes in a user and renders the video
 */
const MaxVideoView: React.FC<MaxViewInterface> = (props) => {
  const {styleProps, rtcProps} = useContext(PropsContext);
  const {maxViewStyles} = styleProps || {};
  const Fallback = props.fallback;

  return (
    <React.Fragment>
      {!rtcProps.disableRtm && <Username user={props.user} />}
      {props.user.uid === 'local' ? (
        props.user.video ? (
          <RtcSurfaceView
            style={{...styles.fullView, ...(maxViewStyles as object)}}
            canvas={{renderMode: RenderModeType.RenderModeFit, uid: 0}}
          />
        ) : Fallback ? (
          <Fallback />
        ) : (
          <DefaultFallback />
        )
      ) : props.user.video ? (
        <>
          <RtcSurfaceView
            style={{...styles.fullView, ...(maxViewStyles as object)}}
            canvas={{
              renderMode: RenderModeType.RenderModeFit,
              uid: props.user.uid as number,
            }}
          />
        </>
      ) : Fallback ? (
        <Fallback />
      ) : (
        <DefaultFallback user={props.user}/>
      )}
    </React.Fragment>
  );
};

const DefaultFallback = ({user}) => {
  const {styleProps} = useContext(PropsContext);
  const {usernames} = useContext(RtmContext);
  const {videoPlaceholderContainer} = styleProps || {};
  const username_val = usernames[user.uid] || 'User'
  return (
    <View style={[style.placeholderContainer, videoPlaceholderContainer]}>
      <Text style={{'color' : 'white', 'alignSelf' : 'center', 'fontSize' : 86}}> {username_val[0]}</Text>
      <Text style={{'color' : 'white', 'marginLeft' : 10}}> {username_val}</Text>
    </View>
  );
};

const style = StyleSheet.create({
  placeholderContainer: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
  },
});

export default MaxVideoView;
