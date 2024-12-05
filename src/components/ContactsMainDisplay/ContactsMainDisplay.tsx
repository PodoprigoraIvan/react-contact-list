import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { selectAllContacts, deleteAllContactsThunk } from "../../store/contactsSlice";
import AccordionList from "../AccordionList/AccordionList";
import { Button } from "@mui/material";
import "./ContactsMainDisplay.scss";

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
      <Button className="clear-contacts-btn" variant="contained" color="warning" onClick={handleClearContacts}>
        Clear all contacts
      </Button>
      {Object.keys(contactsList).map((letter) => (
        <AccordionList key={letter} letter={letter} />
      ))}
    </>
  );
};

export default ContactsMainDisplay;
