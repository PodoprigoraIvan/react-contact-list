import { Contact } from "../../store/contactsSlice";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { FC } from "react";
import ContactInput from "../ContactInput/ContactInput";
import "./EditDialog.scss";

type EditDialogProps = {
  contactToEdit: Contact;
  onClose: (...args: any) => void;
  open: boolean;
};

const EditDialog: FC<EditDialogProps> = ({ contactToEdit, onClose, open: isEditDialogOpen }) => {
  return (
    <Dialog onClose={onClose} className="edit-dialog" open={isEditDialogOpen}>
      <DialogTitle className="edit-dialog__dialog-title">Edit contact</DialogTitle>
      <IconButton onClick={onClose} className="edit-dialog__close-btn">
        <CloseIcon />
      </IconButton>
      <DialogContent dividers>
        <ContactInput type="edit" prevContact={contactToEdit} />
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
