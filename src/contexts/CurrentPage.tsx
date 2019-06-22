import * as React from 'react';

// Provide a enum of possible pages for the application
enum Page {
  CREATE = 'create',
  VIEW_AND_UPDATE = 'view-and-update'
}

type CurrentPage = Page;
type Setter = (page: CurrentPage) => void;
type CurrentPageProviderProps = {
  children: React.ReactNode;
  initialPage?: Page;
};

const CurrentPageContext = React.createContext<CurrentPage | undefined>(
  undefined
);
const CurrentPageSetterContext = React.createContext<Setter | undefined>(
  undefined
);

const CurrentPageProvider = ({
  children,
  initialPage = Page.VIEW_AND_UPDATE
}: CurrentPageProviderProps) => {
  const [currentPage, setCurrentPage] = React.useState(initialPage);

  return (
    <CurrentPageContext.Provider value={currentPage}>
      <CurrentPageSetterContext.Provider value={setCurrentPage}>
        {children}
      </CurrentPageSetterContext.Provider>
    </CurrentPageContext.Provider>
  );
};

// Provide a method for consuming the current page context
const useCurrentPage = () => {
  const context = React.useContext(CurrentPageContext);
  if (context === undefined) {
    throw new Error('useCurrentPage must be used within a CurrentPageProvider');
  }
  return context;
};

// Provide a method for consuming the setter for the current page context
const useSetCurrentPage = () => {
  const context = React.useContext(CurrentPageSetterContext);
  if (context === undefined) {
    throw new Error('useCurrentPage must be used within a CurrentPageProvider');
  }
  return context;
};

export { Page, CurrentPageProvider, useCurrentPage, useSetCurrentPage };
