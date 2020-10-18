import { createContext } from 'react';

export const MaasContext = createContext({
  week: null,
  service: null,
  employees: [],
  editModeOn: false,
  currentShift: null,
  refreshShifts: false,
});

export const MaasContextProvider = MaasContext.Provider;
