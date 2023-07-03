import { UidInterface } from "../Contexts/PropsContext";
import { ActionType, UidStateInterface } from "../Contexts/RtcContext";

export default function LocalScreenShare(
  state: UidStateInterface,
  action: ActionType<"LocalScreenShare">
) {
  let stateUpdate = {};
  const LocalScreenShare = (user: UidInterface) => {
    if (user.uid === "local") {
      user.screenShare = action.value[0];
    }
    return user;
  };
  stateUpdate = {
    min: state.min.map(LocalScreenShare),
    max: state.max.map(LocalScreenShare),
  };
  return stateUpdate;
}
