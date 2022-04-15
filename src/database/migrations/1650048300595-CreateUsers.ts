import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsers1650048300595 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar(60)",
          },
          {
            name: "username",
            type: "varchar(20)",
            isUnique: true,
          },
          {
            name: "email",
            type: "varchar(60)",
          },
          {
            name: "password",
            type: "varchar(60)",
          },
          {
            name: "driver_license",
            type: "varchar(60)",
          },
          {
            name: "isAdmin",
            type: "boolean",
            default: false,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
