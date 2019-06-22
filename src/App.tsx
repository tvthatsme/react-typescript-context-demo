import React from 'react';

import AppContext from './contexts/AppContext';
import ViewAndUpdate from './pages/ViewAndUpdate';
import Create from './pages/Create';

const App: React.FC = () => {
  return (
    <div className="App">
      <AppContext>
        <ViewAndUpdate />
        <Create />
      </AppContext>
    </div>
  );
};

export default App;
