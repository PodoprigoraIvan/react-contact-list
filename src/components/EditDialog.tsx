import { Contact } from "../store/contactsSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import ContactInput from "./ContactInput";

type EditDialogProps = {
  contactToEdit: Contact;
  onClose: (...args: any) => void;
  open: boolean;
};

const EditDialog: FC<EditDialogProps> = ({ contactToEdit, onClose, open: isEditDialogOpen }) => {
  return (
    <Dialog onClose={onClose} aria-labelledby="customized-dialog-title" open={isEditDialogOpen}>
      <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
        Edit contact
      </DialogTitle>
      <IconButton
        aria-label="close"
        onClick={onClose}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.grey[500],
        })}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ContactInput type="edit" prevContact={contactToEdit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
