import { FC, useContext } from "react";
import { useAppDispatch } from "../store/hooks";
import { deleteContactThunk } from "../store/contactsSlice";
import { Box, IconButton, List, ListItem, ListItemText, Typography } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import type { Contact } from "../store/contactsSlice";
import { EditDialogContext } from "../App";
import LongPressDeleteButton from "./LongPressDeleteButton";

type ContactsListProps = {
  contactsList: Contact[];
};

const ContactsList: FC<ContactsListProps> = ({ contactsList }) => {
  const dispatch = useAppDispatch();
  const openEditDialog = useContext(EditDialogContext);
  const handleDelete = (contact: Contact) => {
    dispatch(deleteContactThunk(contact));
  };
  return (
    <List>
      {contactsList.map((contact, index) => (
        <ListItem
          key={contact.phone}
          style={{
            backgroundColor: index % 2 === 0 ? "transparent" : "#f5f5f5",
            justifyContent: "space-between",
          }}
        >
          <ListItemText
            primary={<strong>Name: {contact.name}</strong>}
            secondary={
              <Box>
                <Typography>Vacancy: {contact.vacancy}</Typography>
                <Typography>Phone: {contact.phone}</Typography>
              </Box>
            }
          />
          <Box>
            <IconButton aria-label="edit" color="primary" onClick={() => openEditDialog(contact)}>
              <EditIcon />
            </IconButton>
            <LongPressDeleteButton onLongPress={() => handleDelete(contact)} />
          </Box>
        </ListItem>
      ))}
    </List>
  );
};

export default ContactsList;
