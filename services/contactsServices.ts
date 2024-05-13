const { v4 } = require("uuid");
const fs = require("fs/promises");
const path = require("node:path");

const contactsPath = path.join(__dirname, "db", "contacts.json");

interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
}

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getContactById = async (contactId: string) => {
  const contacts = await listContacts();
  const foundContact = contacts.find((contact: Contact) => contact.id === contactId);

  if (!foundContact) {
    return null;
  }

  return foundContact;
};

const addContact = async (name: string, email: string, phone: string) => {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return newContact;
};

const removeContact = async (contactId: string) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact: Contact) => contact.id === contactId);

  if (index === -1) {
    return null;
  }

  const removedContact = contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
  return removedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
