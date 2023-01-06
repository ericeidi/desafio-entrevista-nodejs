import { CompanySchema } from '../../@core/infra/db/company/company.schema';
import { ParkingLotReservationSchema } from '../../@core/infra/db/parking-lot-reservation/parking-lot-reservation.schema';
import { UserSchema } from '../../@core/infra/db/user/user.schema';
import { VehicleTypeSchema } from '../../@core/infra/db/vehicle-type/vehicle-type.schema';
import { VehicleSchema } from '../../@core/infra/db/vehicle/vehicle.schema';

export const dataSourceDevParams = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  dropSchema: true,
  logging: true,
  entities: [
    VehicleSchema,
    VehicleTypeSchema,
    UserSchema,
    CompanySchema,
    ParkingLotReservationSchema,
  ],
};
