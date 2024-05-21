import express from "express";
import contacts from "../controllers/contactsControllers.ts";
import { validateBody } from "../middlewares/validateBody.ts";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.ts";

export const contactsRouter = express.Router();

contactsRouter.get("/", contacts.getAllContacts);

contactsRouter.get("/:id", contacts.getOneContact);

contactsRouter.delete("/:id", contacts.deleteContact);

contactsRouter.post(
  "/",
  validateBody(createContactSchema),
  contacts.createContact,
);

contactsRouter.put(
  "/:id",
  validateBody(updateContactSchema, "Body must have at least one field"),
  contacts.updateContact,
);
