import {UidInterface} from '../Contexts/PropsContext';
import {ActionType, UidStateInterface} from '../Contexts/RtcContext';

export default function OptionsMenu(
  state: UidStateInterface,
  action: ActionType<'MenuOptions'>,
) {
  let stateUpdate = {};
  const MenuOptions = (user: UidInterface) => {
    if (user.uid === 'local') {
      user.menuOptions = action.value[0];
    }
    return user;
  };
  stateUpdate = {
    min: state.min.map(MenuOptions),
    max: state.max.map(MenuOptions),
  };
  return stateUpdate;
}
