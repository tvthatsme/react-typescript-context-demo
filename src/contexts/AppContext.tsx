import * as React from 'react';

import { CurrentPageProvider } from './CurrentPage';

type AppContextProps = { children: React.ReactNode | React.ReactNode[] };

const AppContext = ({ children }: AppContextProps) => (
  <CurrentPageProvider>{children}</CurrentPageProvider>
);

export default AppContext;
