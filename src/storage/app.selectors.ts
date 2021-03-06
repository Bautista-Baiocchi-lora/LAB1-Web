import { TypedUseSelectorHook, useSelector } from "react-redux";
import { GuardiaState } from "./guardias.reducer";
import { LoteState } from "./lote.reducer";
import { PropietarioState } from "./propietarios.reducer";
import { RootState } from "./root.reducer";

export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;

export const usePropietarioSelector: TypedUseSelectorHook<PropietarioState> = (
  selector
) => useRootSelector((state) => selector(state.propietario));

export const useLoteSelector: TypedUseSelectorHook<LoteState> = (selector) =>
  useRootSelector((state) => selector(state.lote));

export const useGuardiaSelector: TypedUseSelectorHook<GuardiaState> = (
  selector
) => useRootSelector((state) => selector(state.guardia));
