import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class v11639020992845 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(new Table({
            name: "estoque",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                },
                {
                    name: "nome",
                    type: "varchar",
                }
            ]
        }), true);
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("estoque");
    }

}
