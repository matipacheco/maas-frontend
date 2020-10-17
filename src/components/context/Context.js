import { createContext } from 'react';

export const MaasContext = createContext({
  service: null,
  week: null,
  editModeOn: false,
});

export const MaasContextProvider = MaasContext.Provider;
