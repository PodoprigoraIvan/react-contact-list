import { useAppSelector } from "../../store/hooks";
import { Contact, selectAllContacts } from "../../store/contactsSlice";
import ContactsList from "../ContactsList/ContactsList";
import { Button, Container, TextField } from "@mui/material";
import { useState } from "react";
import "./ContactsSearch.scss";

const ContactsSearch = () => {
  const [inputName, setInputName] = useState("");
  const [showAll, setShowAll] = useState(false);
  const allContacts = useAppSelector(selectAllContacts);
  let foundContacts: Contact[] = [];

  for (let firstLetter in allContacts) {
    if (showAll) {
      foundContacts = foundContacts.concat(allContacts[firstLetter]);
    } else {
      if (inputName.trim() !== "")
        foundContacts = foundContacts.concat(
          allContacts[firstLetter].filter((contact) => contact.name.toLowerCase().includes(inputName.toLowerCase()))
        );
    }
  }

  return (
    <>
      <Container className="text-field-wrapper">
        <TextField
          helperText={" "}
          label="Name"
          value={inputName}
          onChange={(e) => {
            setInputName(e.target.value);
            setShowAll(false);
          }}
          variant="outlined"
        />
      </Container>
      <Button
        variant="contained"
        onClick={() => {
          setShowAll(true);
        }}
      >
        Show all
      </Button>
      <ContactsList contactsList={foundContacts} />
    </>
  );
};

export default ContactsSearch;
