import { CreateUsersTable1722710609574 } from 'src/migrations/1722710609574-CreateUsersTable';
import { CreateProductsTable1722721968156 } from 'src/migrations/1722721968156-CreateProductsTable';
import { CreateProductCharacteristicsTable1722722136350 } from 'src/migrations/1722722136350-CreateProductCharacteristicsTable';
import { CreateProductImagesTable1722722669760 } from 'src/migrations/1722722669760-CreateProductImagesTable';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from './database.module';

export const dataSource = new DataSource({
  ...dataSourceOptions,
  synchronize: false,
  migrations: [
    CreateUsersTable1722710609574,
    CreateProductsTable1722721968156,
    CreateProductCharacteristicsTable1722722136350,
    CreateProductImagesTable1722722669760,
  ],
});
