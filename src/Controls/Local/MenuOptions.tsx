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
interface MenuOptionsProps {
  btnText?: string;
  variant?: 'outlined' | 'text';
}

const MenuOptions: React.FC<MenuOptionsProps> = (props) => {
  const {btnText = 'Menu', variant = 'Outlined'} = props;
  const {rtcProps} = useContext(PropsContext);
  const {RtcEngine, dispatch} = useContext(RtcContext);
  const localUser = useContext(LocalContext);

  return (
    <BtnTemplate
      name={"menu"}
      btnText={btnText}
      style={styles.localBtn}
      onPress={() => handleMenu(localUser, dispatch, RtcEngine)}
    />
  );
};

export const handleMenu = async (
  local: UidInterface,
  dispatch: DispatchType,
  RtcEngine: IRtcEngine,
) => {
  const localState = local.menuOptions;
  console.log(localState);

  dispatch({
    type: 'MenuOptions',
    value: [
      localState === ToggleState.disabled
        ? ToggleState.enabled
        : ToggleState.disabled,
    ],
  });
};

export default MenuOptions;
