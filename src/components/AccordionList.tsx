import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import { FC, memo, useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectListByFirstLetter } from "../store/contactsSlice";
import type { RootState } from "../store/store";
import ContactsList from "./ContactsList";

interface AccordionListProps {
  letter: string;
  children?: any;
}

const AccordionList: FC<AccordionListProps> = memo(({ letter }) => {
  const [expanded, setExpanded] = useState(false);
  const contactsList = useAppSelector((state: RootState) => selectListByFirstLetter(state, letter));
  const disabled = contactsList.length === 0 ? true : false;
  return (
    <Accordion expanded={expanded && !disabled} disabled={disabled} onChange={() => setExpanded((prev) => !prev)}>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography style={{ fontWeight: "bold" }}>
          {letter}: {contactsList.length}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ContactsList contactsList={contactsList} />
      </AccordionDetails>
    </Accordion>
  );
});

export default AccordionList;
