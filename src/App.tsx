import ContactInput from "./components/ContactInput";
import ContactsMainDisplay from "./components/ContactsMainDisplay";
import { createContext, useCallback, useState } from "react";
import { Contact } from "./store/contactsSlice";
import EditDialog from "./components/EditDialog";
import { BrowserRouter, Link, Route, Routes, useLocation } from "react-router";
import { Box, Tab, Tabs } from "@mui/material";
import ContactsSearch from "./components/ContactsSearch";

export const EditDialogContext = createContext<(contact: Contact) => void>((_contact: Contact) => {});

const AppTabs = () => {
  const { pathname } = useLocation();
  return (
    <Tabs value={pathname} centered>
      <Tab label="Home" value="/" to="/" component={Link} />
      <Tab label="Search" value="/search" to="/search" component={Link} />
    </Tabs>
  );
};

function App() {
  const [contactToEdit, setContactToEdit] = useState<Contact>({ name: "", vacancy: "", phone: "" });
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const openDialog = useCallback((contact: Contact) => {
    setContactToEdit(contact);
    setIsEditDialogOpen(true);
  }, []);
  const closeDialog = () => {
    setIsEditDialogOpen(false);
  };

  return (
    <>
      <header>
        <h1>Contact list</h1>
      </header>
      <EditDialog onClose={closeDialog} open={isEditDialogOpen} contactToEdit={contactToEdit} />
      <EditDialogContext.Provider value={openDialog}>
        <BrowserRouter>
          <Box sx={{ marginBottom: 2 }}>
            <AppTabs />
          </Box>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <ContactInput type="add" />
                  <ContactsMainDisplay />
                </>
              }
            />
            <Route path="/search" element={<ContactsSearch />} />
          </Routes>
        </BrowserRouter>
      </EditDialogContext.Provider>
    </>
  );
}

export default App;
