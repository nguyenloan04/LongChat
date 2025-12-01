import type { store } from "../redux/store";

export type ReduxState = ReturnType<typeof store.getState>