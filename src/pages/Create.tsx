import * as React from 'react';

import PageIndex from '../components/PageIndex';
import AudienceForm from '../components/AudienceForm';
import { Page } from '../contexts/CurrentPage';

// Define the name for this page
const pageName = Page.CREATE;

const Create: React.FC = () => {
  return (
    <PageIndex pageName={pageName}>
      <h1>Create</h1>
      <AudienceForm />
    </PageIndex>
  );
};

export default Create;
