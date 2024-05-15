import { Request, Response, NextFunction } from "express";
import { controllersWrapper } from "../helpers/controllersWrapper";
import contactsService from "../services/contactsServices";

const getAllContacts = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOneContact = (req: Request, res: Response, next: NextFunction) => {};

const deleteContact = (req: Request, res: Response, next: NextFunction) => {};

const createContact = (req: Request, res: Response, next: NextFunction) => {};

const updateContact = (req: Request, res: Response, next: NextFunction) => {};

export default {
  getAllContacts: controllersWrapper(getAllContacts),
  // getOneContact: controllersWrapper(getOneContact),
  // deleteContact: controllersWrapper(deleteContact),
  // createContact: controllersWrapper(createContact),
  // updateContact: controllersWrapper(updateContact),
};
