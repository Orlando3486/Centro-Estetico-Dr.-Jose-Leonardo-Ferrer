import { EntityManager } from "typeorm";
import { Credential } from "../entities/Credentials.entity";
export declare const createCredential: (entityManager: EntityManager, username: string, password: string) => Promise<Credential | undefined>;
export declare const loginUser: (username: string, password: string) => Promise<number | undefined>;
//# sourceMappingURL=CredentialService.d.ts.map