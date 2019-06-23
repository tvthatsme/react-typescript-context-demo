import * as React from 'react';

import PageIndex from '../components/PageIndex';
import { Page } from '../contexts/CurrentPage';
import { AudienceMember, useAudienceList } from '../contexts/AudienceList';
import AudienceList from '../components/AudienceList';
import AudienceForm from '../components/AudienceForm';

// Define the name for this page
const pageName = Page.VIEW_AND_UPDATE;

const ViewAndUpdate: React.FC = () => {
  const audience: AudienceMember[] = useAudienceList();
  const [selectedMember, setSelectedMember] = React.useState<
    AudienceMember | undefined
  >(undefined);

  // Because we are passing the selected member to the form as an object, it is
  // possible that it gets out of sync with the audience list because of
  // context versus local component state. Anytime the audience changes, let's
  // check for the selected member in the list and update if found.
  React.useEffect(() => {
    if (selectedMember !== undefined) {
      const selectedInAudience = audience.find((member: AudienceMember) => {
        if (selectedMember) {
          return member.id === selectedMember.id;
        } else {
          return false;
        }
      });
      if (selectedInAudience) {
        setSelectedMember(selectedInAudience);
      }
    }
  }, [audience, selectedMember]);

  // Provide a method for selected a member from the audience
  const selectMember = (member: AudienceMember | undefined) => {
    setSelectedMember(member);
  };

  return (
    <PageIndex pageName={pageName}>
      <h1>View and Update</h1>
      <AudienceList audience={audience} handleSelection={selectMember} />
      {selectedMember !== undefined ? (
        <AudienceForm
          member={selectedMember}
          handleDelete={() => {
            setSelectedMember(undefined);
          }}
        />
      ) : null}
      {selectedMember === undefined && audience.length > 0 ? (
        <p>Select an audience member to edit</p>
      ) : null}
    </PageIndex>
  );
};

export default ViewAndUpdate;
