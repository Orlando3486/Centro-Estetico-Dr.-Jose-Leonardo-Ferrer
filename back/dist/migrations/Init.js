"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Init1680000000000 = void 0;
class Init1680000000000 {
    constructor() {
        this.name = "Init1680000000000";
    }
    async up(queryRunner) {
        await queryRunner.query(`
            CREATE TABLE "credentials" (
                "id" SERIAL PRIMARY KEY,
                "username" VARCHAR(255) NOT NULL UNIQUE,
                "password" VARCHAR(255) NOT NULL,
                "createAt" TIMESTAMP DEFAULT now(),
                "updateAt" TIMESTAMP DEFAULT now()
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL PRIMARY KEY,
                "name" VARCHAR(50) NOT NULL,
                "email" VARCHAR(100) NOT NULL UNIQUE,
                "birthday" DATE NOT NULL,
                "nDni" INT NOT NULL UNIQUE,
                "credentialId" INT UNIQUE,
                "createAt" TIMESTAMP DEFAULT now(),
                "updateAt" TIMESTAMP DEFAULT now(),
                CONSTRAINT "FK_user_credential" FOREIGN KEY ("credentialId") REFERENCES "credentials"("id") ON DELETE CASCADE
            )
        `);
        await queryRunner.query(`
            CREATE TABLE "appointments" (
                "id" SERIAL PRIMARY KEY,
                "date" TIMESTAMP NOT NULL,
                "time" VARCHAR(5) NOT NULL,
                "userId" INT NOT NULL,
                "status" VARCHAR(10) NOT NULL DEFAULT 'active',
                "createAt" TIMESTAMP DEFAULT now(),
                "updateAt" TIMESTAMP DEFAULT now(),
                CONSTRAINT "FK_appointment_user" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE
            )
        `);
    }
    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "appointments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "credentials"`);
    }
}
exports.Init1680000000000 = Init1680000000000;
//# sourceMappingURL=Init.js.map