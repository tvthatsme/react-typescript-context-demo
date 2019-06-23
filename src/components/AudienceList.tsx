import * as React from 'react';

import { AudienceMember } from '../contexts/AudienceList';

interface AudienceListProps {
  audience: AudienceMember[];
  handleSelection: (member: AudienceMember) => void;
}

// Define a function to sort a list by first name
const sortByFirstName = (a: AudienceMember, b: AudienceMember): number => {
  const aName = a.firstName.toLowerCase();
  const bName = b.firstName.toLowerCase();
  if (aName < bName) {
    return -1;
  }
  if (aName > bName) {
    return 1;
  }
  return 0;
};

const AudienceList = ({ audience, handleSelection }: AudienceListProps) => {
  const sortedByFirstName: AudienceMember[] = audience.sort(sortByFirstName);

  if (sortedByFirstName.length > 0) {
    return (
      <ul>
        {sortedByFirstName.map(member => {
          return (
            <li key={member.id}>
              <div onClick={() => handleSelection(member)}>
                <p>{member.firstName}</p>
                <p>{member.lastName}</p>
                <p>{member.email}</p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  } else {
    return <p>There is nobody in your audience yet.</p>;
  }
};

export default AudienceList;
