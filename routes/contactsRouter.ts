import express from "express";
import contacts from "../controllers/contactsControllers.ts";

export const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

// contactsRouter.post("/", contacts.createContact);
//
// contactsRouter.put("/:id", contacts.updateContact);
