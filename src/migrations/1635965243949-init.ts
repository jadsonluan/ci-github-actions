import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class init1635965243949 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const movies = new Table({
            name: 'movies',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: 'increment',
                    isGenerated: true,
                    isUnique: true,
                },
                {
                    type: 'varchar(255)',
                    name: 'name',
                    isUnique: true,
                    isNullable: false
                }
            ]
        })

        queryRunner.createTable(movies)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropTable('movies')
    }

}
