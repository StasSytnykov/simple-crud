import { v4 } from "uuid";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contactsPath = path.join(
  __dirname.slice(0, __dirname.indexOf("services")),
  "db",
  "contacts.json",
);

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const listContacts = async (): Promise<Contact[]> => {
  const data = await fs.readFile(contactsPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId: string) => {
  const contacts = await listContacts();
  const foundContact = contacts.find(
    (contact: Contact) => contact.id === contactId,
  );

  if (!foundContact) {
    return null;
  }

  return foundContact;
};

const addContact = async (name: string, email: string, phone: string) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, " "));
  return newContact;
};

const updateContact = async (
  contactId: string,
  name: string,
  email: string,
  phone: string,
) => {
  const contacts: Contact[] = await listContacts();
  let updatedContact = null;
  const updatedContacts = contacts.map((contact: Contact) => {
    if (contact.id === contactId) {
      updatedContact = {
        ...contact,
        name: name ?? contact.name,
        email: email ?? contact.email,
        phone: phone ?? contact.phone,
      };
      return updatedContact;
    }
    return contact;
  });

  if (!updatedContact) {
    return null;
  }

  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, " "));
  return updatedContact;
};

const removeContact = async (contactId: string) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (contact: Contact) => contact.id === contactId,
  );

  if (index === -1) {
    return null;
  }

  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, " "));
  return removedContact[0];
};

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
