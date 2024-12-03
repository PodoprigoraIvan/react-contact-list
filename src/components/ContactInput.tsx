import { Alert, Box, Button, Container, Fade, TextField } from "@mui/material";
import { FC, useState } from "react";
import { useValidation } from "../hooks/useValidation";
import { useTemporaryMessage } from "../hooks/useTemporaryMessage";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import { useAppDispatch } from "../store/hooks";
import { addContactThunk, editContactThunk } from "../store/contactsSlice";
import type { Contact } from "../store/contactsSlice";

type ContactInputProps = {
  type: "add" | "edit";
  prevContact?: Contact;
};

const ContactInput: FC<ContactInputProps> = ({ type, prevContact }) => {
  const [name, setName, nameError, nameValidationResult] = useValidation("name", prevContact ? prevContact.name : "");
  const [phone, setPhone, phoneError, phoneValidationResult] = useValidation(
    "phone",
    prevContact ? prevContact.phone : ""
  );
  const [vacancy, setVacancy] = useState(prevContact ? prevContact.vacancy : "");
  const [errorMessage, setErrorMessage] = useTemporaryMessage(3000);
  const [successMessage, setSuccessMessage] = useTemporaryMessage(1000);
  const [contactToEdit, setContactToEdit] = useState(prevContact);
  const dispatch = useAppDispatch();

  const clearFields = () => {
    setName("");
    setPhone("");
    setVacancy("");
  };

  const handleClick = () => {
    if (!nameValidationResult || !phoneValidationResult) {
      setErrorMessage("Incorrect input");
      return;
    }
    if (!name.trim() || !vacancy.trim() || !phone.trim()) {
      setErrorMessage("Empty input");
      return;
    }
    let modificationResultError = "";
    switch (type) {
      case "add":
        modificationResultError = dispatch(addContactThunk({ name, vacancy, phone }));
        break;
      case "edit":
        modificationResultError = dispatch(editContactThunk(contactToEdit!, { name, vacancy, phone }));
        if (!modificationResultError) {
          setContactToEdit({ name, vacancy, phone });
        }
        break;
    }
    if (modificationResultError) {
      setErrorMessage(modificationResultError);
    } else {
      setErrorMessage("");
      switch (type) {
        case "add":
          setSuccessMessage("Successfully added!");
          break;
        case "edit":
          setSuccessMessage("Successfully edited!");
          break;
      }
    }
  };

  return (
    <>
      <Container sx={{ display: "flex", flexFlow: "column" }}>
        <TextField
          error={!nameValidationResult}
          helperText={nameError || " "}
          label="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          variant="outlined"
        />
        <TextField
          helperText=" "
          label="Vacancy"
          value={vacancy}
          onChange={(e) => setVacancy(e.target.value)}
          variant="outlined"
        />
        <TextField
          error={!phoneValidationResult}
          helperText={phoneError || " "}
          label="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          variant="outlined"
        />
        <Box sx={{ marginBottom: 3 }}>
          <Button variant="contained" sx={{ marginRight: 3 }} onClick={clearFields}>
            Clear fields
          </Button>
          <Button
            variant="contained"
            color="primary"
            startIcon={type === "add" ? <AddIcon /> : <EditIcon />}
            onClick={handleClick}
          >
            {type}
          </Button>
        </Box>
        <Fade in={errorMessage || successMessage ? true : false}>
          <Alert sx={{ marginBottom: 3 }} severity={errorMessage === "" ? "success" : "warning"}>
            {errorMessage === "" ? successMessage : errorMessage}
          </Alert>
        </Fade>
      </Container>
    </>
  );
};

export default ContactInput;
