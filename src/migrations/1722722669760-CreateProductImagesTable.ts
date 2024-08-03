import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateProductImagesTable implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'product_images',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'url',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'description',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'productId',
            type: 'uuid',
            isNullable: true,
          },
        ],
      }),
      true, // ifExists
    );

    // Create foreign key constraint for productId
    await queryRunner.createForeignKey(
      'product_images',
      new TableForeignKey({
        columnNames: ['productId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'products',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );

    // Optionally set the owner of the table
    await queryRunner.query(
      'ALTER TABLE IF EXISTS public.product_images OWNER TO root',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Drop the foreign key constraint first
    const table = await queryRunner.getTable('product_images');
    const foreignKey = table!.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('productId') !== -1,
    );
    await queryRunner.dropForeignKey('product_images', foreignKey!);

    // Drop the product_images table if it exists
    await queryRunner.dropTable('product_images');
  }
}
