import { Request, Response, NextFunction } from "express";
import { controllersWrapper } from "../helpers/controllersWrapper.ts";
import { HttpError } from "../helpers/HttpError.ts";
import contactsService from "../services/contactsServices.ts";
import {
  createContactSchema,
  updateContactSchema,
} from "../schemas/contactsSchemas.ts";

const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await contactsService.getContactById(req.params.id);

  if (!result) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }

  res.json(result);
};

const deleteContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await contactsService.removeContact(req.params.id);

  if (!result) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }

  res.json(result);
};

const createContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = createContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { name, email, phone } = req.body;
  const result = await contactsService.addContact(name, email, phone);

  res.status(201);
  res.json(result);
};

const updateContact = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { error } = updateContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "Body must have at least one field");
  }

  const { id } = req.params;
  const { name, email, phone } = req.body;
  const result = await contactsService.updateContact(id, name, email, phone);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

export default {
  getAllContacts: controllersWrapper(getAllContacts),
  getOneContact: controllersWrapper(getOneContact),
  deleteContact: controllersWrapper(deleteContact),
  createContact: controllersWrapper(createContact),
  updateContact: controllersWrapper(updateContact),
};
