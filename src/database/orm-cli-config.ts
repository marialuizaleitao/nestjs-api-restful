import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';
import { CreateUsersTable } from 'src/migrations/1722710609574-CreateUsersTable';
import { CreateProductsTable } from 'src/migrations/1722721968156-CreateProductsTable';
import { CreateProductCharacteristicsTable } from 'src/migrations/1722722136350-CreateProductCharacteristicsTable';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [CreateUsersTable, CreateProductsTable, CreateProductCharacteristicsTable],
});
