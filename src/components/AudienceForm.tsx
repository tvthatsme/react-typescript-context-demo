import * as React from 'react';

import {
  ActionTypes,
  AudienceMember,
  useAudienceListReducer
} from '../contexts/AudienceList';

interface AudienceFormProps {
  member?: AudienceMember;
  handleDelete?: () => void;
}

const AudienceForm = ({ member, handleDelete }: AudienceFormProps) => {
  const isEdit = member !== undefined;

  // If the caller has a member value to edit, use that. Otherwise, use empty
  // values for every part of the form.
  const initialMemberValue: AudienceMember = member
    ? member
    : {
        firstName: '',
        lastName: '',
        email: ''
      };

  // Setup form state hooks
  const [firstName, setFirstName] = React.useState<string>(
    initialMemberValue.firstName
  );
  const [lastName, setLastName] = React.useState<string>(
    initialMemberValue.lastName
  );
  const [email, setEmail] = React.useState<string>(initialMemberValue.email);
  const [showConfirm, setShowConfirm] = React.useState<boolean>(false);
  const dispatch = useAudienceListReducer();

  // Because we are using controlled inputs in this component (for the ability
  // to clear and update), we need to update things if the initial member value
  // changes at all.
  React.useEffect(() => {
    setFirstName(initialMemberValue.firstName);
    setLastName(initialMemberValue.lastName);
    setEmail(initialMemberValue.email);
  }, [
    initialMemberValue.firstName,
    initialMemberValue.lastName,
    initialMemberValue.email
  ]);

  // Have a confirmation message to show after any successful aciton
  const confirmationMessage = isEdit
    ? 'User successfully updated!'
    : 'New user successfully added!';

  // Add or edit the selected member
  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Assemble AudienceMember object form form state
    const memberFromForm: AudienceMember = {
      firstName,
      lastName,
      email
    };

    // Add or update
    if (member === undefined) {
      dispatch({ type: ActionTypes.ADD_MEMBER, member: memberFromForm });
      setFirstName('');
      setLastName('');
      setEmail('');
    } else {
      dispatch({
        type: ActionTypes.EDIT_MEMBER,
        member: {
          ...memberFromForm,
          id: member.id
        }
      });
    }

    // Show a confirmation message so the user knows what happened
    setShowConfirm(true);
  };

  // Delete the member of the audience
  const deleteMember = () => {
    if (member) {
      dispatch({
        type: ActionTypes.DELETE_MEMBER,
        member
      });
      if (handleDelete) {
        handleDelete();
      }
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <div>
        <label htmlFor="first-name">First name</label>
        <input
          id="first-name"
          type="text"
          required={true}
          value={firstName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setFirstName(e.currentTarget.value);
            setShowConfirm(false);
          }}
        />
      </div>
      <div>
        <label htmlFor="last-name">Last name</label>
        <input
          id="last-name"
          type="text"
          required={true}
          value={lastName}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setLastName(e.currentTarget.value);
            setShowConfirm(false);
          }}
        />
      </div>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          required={true}
          value={email}
          onChange={(e: React.FormEvent<HTMLInputElement>) => {
            setEmail(e.currentTarget.value);
            setShowConfirm(false);
          }}
        />
      </div>
      {isEdit && (
        <button type="button" onClick={deleteMember}>
          Delete
        </button>
      )}
      <button type="submit">{isEdit ? 'Update' : 'Add'}</button>
      {showConfirm && <p>{confirmationMessage}</p>}
    </form>
  );
};

export default AudienceForm;
