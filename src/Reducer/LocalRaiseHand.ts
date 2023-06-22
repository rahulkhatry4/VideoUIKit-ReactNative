import { UidInterface } from "../Contexts/PropsContext";
import { ActionType, UidStateInterface } from "../Contexts/RtcContext";

export default function LocalRaiseHand(
  state: UidStateInterface,
  action: ActionType<"LocalRaiseHand">
) {
  let stateUpdate = {};
  const LocalRaiseHand = (user: UidInterface) => {
    if (user.uid === "local") {
      user.raiseHand = action.value[0];
    }
    return user;
  };
  stateUpdate = {
    min: state.min.map(LocalRaiseHand),
    max: state.max.map(LocalRaiseHand),
  };
  return stateUpdate;
}
