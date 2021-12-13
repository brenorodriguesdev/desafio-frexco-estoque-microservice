import {MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey} from "typeorm";

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
        

        await queryRunner.createTable(new Table({
            name: "produtoEstoque",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true
                }
            ]
        }), true);

        await queryRunner.addColumn("produtoEstoque", new TableColumn({
            name: "idProduto",
            type: "int"
        }));

        await queryRunner.addColumn("produtoEstoque", new TableColumn({
            name: "idEstoque",
            type: "int"
        }));

        await queryRunner.createForeignKey("produtoEstoque", new TableForeignKey({
            columnNames: ["idProduto"],
            referencedColumnNames: ["id"],
            referencedTableName: "produto",
            onDelete: "CASCADE"
        }));

        await queryRunner.createForeignKey("produtoEstoque", new TableForeignKey({
            columnNames: ["idEstoque"],
            referencedColumnNames: ["id"],
            referencedTableName: "estoque",
            onDelete: "CASCADE"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {

        const table = await queryRunner.getTable("produtoEstoque");
        const foreignKeyProduto = table.foreignKeys.find(fk => fk.columnNames.indexOf("idProduto") !== -1);
        await queryRunner.dropForeignKey("produtoEstoque", foreignKeyProduto);

        const foreignKeyEstoque = table.foreignKeys.find(fk => fk.columnNames.indexOf("idEstoque") !== -1);
        await queryRunner.dropForeignKey("produtoEstoque", foreignKeyEstoque);

        await queryRunner.dropTable("estoque");
        await queryRunner.dropTable("produtoEstoque");

    }

}
