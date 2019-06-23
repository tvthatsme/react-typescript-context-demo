import * as React from 'react';

import { CurrentPageProvider } from './CurrentPage';
import { AudienceListProvider } from './AudienceList';

type AppContextProps = { children: React.ReactNode | React.ReactNode[] };

// Compose all the contexts needed for the application state
const AppContext = ({ children }: AppContextProps) => (
  <CurrentPageProvider>
    <AudienceListProvider>{children}</AudienceListProvider>
  </CurrentPageProvider>
);

export default AppContext;
