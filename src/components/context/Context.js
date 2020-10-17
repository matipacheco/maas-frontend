import { createContext } from 'react';

export const MaasContext = createContext({
  service: null,
  week: null,
});

export const MaasContextProvider = MaasContext.Provider;
