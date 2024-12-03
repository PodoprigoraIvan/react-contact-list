import { useAppDispatch, useAppSelector } from "../store/hooks";
import { selectAllContacts, deleteAllContactsThunk } from "../store/contactsSlice";
import AccordionList from "./AccordionList";
import { Button } from "@mui/material";

const ContactsMainDisplay = () => {
  const contactsList = useAppSelector(selectAllContacts);
  const dispatch = useAppDispatch();
  const handleClearContacts = () => {
    const confirmed = window.confirm("Are you sure you want to clear all contacts?");
    if (confirmed) {
      dispatch(deleteAllContactsThunk());
    }
  };
  return (
    <>
      <Button sx={{ marginBottom: 3 }} variant="contained" color="warning" onClick={handleClearContacts}>
        Clear all contacts
      </Button>
      {Object.keys(contactsList).map((letter) => (
        <AccordionList key={letter} letter={letter} />
      ))}
    </>
  );
};

export default ContactsMainDisplay;
