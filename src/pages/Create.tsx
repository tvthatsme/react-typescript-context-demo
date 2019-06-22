import * as React from 'react';

import PageIndex from '../components/PageIndex';
import { Page } from '../contexts/CurrentPage';

// Define the name for this page
const pageName = Page.CREATE;

const Create: React.FC = () => {
  return (
    <PageIndex pageName={pageName}>
      <h1>Create</h1>
    </PageIndex>
  );
};

export default Create;
