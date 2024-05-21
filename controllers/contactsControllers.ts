import { Request, Response, NextFunction } from "express";
import { controllersWrapper } from "../helpers/controllersWrapper.ts";
import { HttpError } from "../helpers/HttpError.ts";
import contactsService from "../services/contactsServices.ts";

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

const deleteContact = async (req: Request, res: Response, next: NextFunction) => {

  const result = await contactsService.removeContact(req.params.id);

  if (!result) {
    throw HttpError(404, `Contact with id ${req.params.id} not found`);
  }

  res.json(result);
};

const createContact = (req: Request, res: Response, next: NextFunction) => {};

const updateContact = (req: Request, res: Response, next: NextFunction) => {};

export default {
  getAllContacts: controllersWrapper(getAllContacts),
  getOneContact: controllersWrapper(getOneContact),
  deleteContact: controllersWrapper(deleteContact),
  // createContact: controllersWrapper(createContact),
  // updateContact: controllersWrapper(updateContact),
};
