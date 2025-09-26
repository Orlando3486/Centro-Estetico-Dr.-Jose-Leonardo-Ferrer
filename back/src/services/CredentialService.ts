import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
import bcrypt from "bcrypt";
import { CredentialModel } from "../config/data-source";

export const createCredential = async (
  entityManager: EntityManager,
  username: string,
  password: string
): Promise<Credential | undefined> => {
  try {
    const hashedPassword = await bcrypt.hash(password, 12);

    const newCredential = entityManager.create(Credential, {
      username: username,
      password: hashedPassword,
    });

    await entityManager.save(newCredential);
    return newCredential;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    return undefined;
  }
};

export const loginUser = async (
  username: string,
  password: string
): Promise<number | undefined> => {
  const userCredential = await CredentialModel.findOne({
    where: { username },
  });
  if (
    userCredential &&
    (await bcrypt.compare(password, userCredential.password))
  ) {
    return userCredential.id;
  }
  throw new Error(`Credenciales Incorrectas`);
};
