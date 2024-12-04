import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState, AppThunk } from "./store";

export type Contact = {
  name: string;
  vacancy: string;
  phone: string;
};

type ContactsList = {
  [key: string]: Contact[];
};

interface ContactsState {
  contactsList: ContactsList;
  lastModificationError: string;
}

const isEqualContacts = (first: Contact, second: Contact) => {
  return first.name === second.name && first.vacancy === second.vacancy && first.phone === second.phone;
};

const isDuplicate = (contactsList: ContactsList, phone: string) => {
  for (let firstLetter in contactsList) {
    for (let contact of contactsList[firstLetter]) {
      if (contact.phone === phone) return true;
    }
  }
  return false;
};

const getInitialState: () => ContactsState = () => {
  const storageValue: string | null = localStorage.getItem("contactsList");
  let contactsState: ContactsState = { contactsList: {}, lastModificationError: "" };
  if (storageValue === null) {
    for (let i = 0; i < 26; i++) {
      contactsState.contactsList[String.fromCharCode("A".charCodeAt(0) + i)] = []; // letter
    }
    localStorage.setItem("contactsList", JSON.stringify(contactsState.contactsList));
  } else {
    contactsState.contactsList = JSON.parse(storageValue);
  }
  return contactsState;
};

export const contactsSlice = createSlice({
  name: "contacts",
  initialState: getInitialState(),
  reducers: {
    addContact: (state, action: PayloadAction<Contact>) => {
      const newContact: Contact = action.payload;
      if (isDuplicate(state.contactsList, newContact.phone)) {
        state.lastModificationError = "Cant add equal pnone numbers";
        return;
      }
      const newContactFirstLetter = newContact.name[0].toUpperCase();
      state.contactsList[newContactFirstLetter].push(newContact);
      state.lastModificationError = "";
    },

    deleteContact: (state, action: PayloadAction<Contact>) => {
      const contactToDelete = action.payload;
      const firstLetter = contactToDelete.name[0].toUpperCase();
      state.contactsList[firstLetter] = state.contactsList[firstLetter].filter(
        (contact) => !isEqualContacts(contact, contactToDelete)
      );
      state.lastModificationError = "";
    },

    deleteAllContacts: (state) => {
      for (let letter in state.contactsList) {
        state.contactsList[letter] = [];
      }
      state.lastModificationError = "";
    },

    editContact: (
      state,
      action: PayloadAction<{
        contactToEdit: Contact;
        newContactValues: Contact;
      }>
    ) => {
      const contactToEdit: Contact = action.payload.contactToEdit;
      const newContactValues: Contact = action.payload.newContactValues;

      if (contactToEdit.phone !== newContactValues.phone && isDuplicate(state.contactsList, newContactValues.phone)) {
        state.lastModificationError = "Cant add equal pnone numbers";
        return;
      }

      const firstLetter = contactToEdit.name[0].toUpperCase();
      const foundIndex = state.contactsList[firstLetter].findIndex((contact) =>
        isEqualContacts(contact, contactToEdit)
      );
      if (foundIndex === -1) {
        state.lastModificationError = "Cant find contact to edit";
        return;
      }
      const newFirstLetter = newContactValues.name[0].toUpperCase();
      if (firstLetter === newFirstLetter) {
        state.contactsList[firstLetter][foundIndex] = newContactValues;
      } else {
        state.contactsList[firstLetter] = state.contactsList[firstLetter].filter(
          (contact) => !isEqualContacts(contact, contactToEdit)
        );
        state.contactsList[newFirstLetter].push(newContactValues);
      }
      state.lastModificationError = "";
    },
  },
});

// Action creators
export const { addContact, editContact, deleteContact, deleteAllContacts } = contactsSlice.actions;

// Selectors
export const selectAllContacts = (state: RootState) => state.contacts.contactsList;
export const selectListByFirstLetter = (state: RootState, firstLetter: string) =>
  state.contacts.contactsList[firstLetter];
export const selectLastModificationError = (state: RootState) => state.contacts.lastModificationError;

// Thunks
export const addContactThunk = (newContact: Contact): AppThunk<string> => {
  return (dispatch, getState) => {
    dispatch(addContact(newContact));
    localStorage.setItem("contactsList", JSON.stringify(getState().contacts.contactsList));
    return getState().contacts.lastModificationError;
  };
};

export const deleteContactThunk = (contactToDelete: Contact): AppThunk => {
  return (dispatch, getState) => {
    dispatch(deleteContact(contactToDelete));
    localStorage.setItem("contactsList", JSON.stringify(getState().contacts.contactsList));
  };
};

export const deleteAllContactsThunk = (): AppThunk => {
  return (dispatch, getState) => {
    dispatch(deleteAllContacts());
    localStorage.setItem("contactsList", JSON.stringify(getState().contacts.contactsList));
  };
};

export const editContactThunk = (contactToEdit: Contact, newContactValues: Contact): AppThunk<string> => {
  return (dispatch, getState) => {
    dispatch(editContact({ contactToEdit, newContactValues }));
    localStorage.setItem("contactsList", JSON.stringify(getState().contacts.contactsList));
    return getState().contacts.lastModificationError;
  };
};

export default contactsSlice.reducer;
