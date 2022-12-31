import { BadRequestException } from '@nestjs/common/exceptions';
import { vehicleTypeEnum } from '../../../../shared/constants/vehicle-type.enum';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { Company } from '../company/company';

const EMPTY_SPACES = 0;

const isAvailableToDecreaseSpot = {
  [vehicleTypeEnum.CAR]: (company: Company) => {
    if (company.carSpaces <= EMPTY_SPACES) {
      throw new BadRequestException('Vagas para carro indisponivel');
    }
    company.carSpaces -= 1;
  },
  [vehicleTypeEnum.MOTORCYCLE]: (company: Company) => {
    if (company.motorCycleSpaces <= EMPTY_SPACES) {
      throw new BadRequestException('Vagas para moto indisponivel');
    }
    company.motorCycleSpaces -= 1;
  },
};

const isAvailableToIncreaseSpot = {
  [vehicleTypeEnum.CAR]: (company: Company) => {
    if (company.carSpaces <= EMPTY_SPACES) {
      throw new BadRequestException('Vagas para carro indisponivel');
    }
    company.carSpaces += 1;
  },
  [vehicleTypeEnum.MOTORCYCLE]: (company: Company) => {
    if (company.motorCycleSpaces <= EMPTY_SPACES) {
      throw new BadRequestException('Vagas para moto indisponivel');
    }
    company.motorCycleSpaces += 1;
  },
};

export class ParkingLotReservation {
  id: number;
  company: Company;
  vehicle: VehicleSchema;
  departTime: Date;
  constructor(company: Company, vehicle: VehicleSchema, id?: number) {
    this.id = id || null;
    this.company = company;
    this.vehicle = vehicle;
  }

  handleDecreaseSpace?() {
    isAvailableToDecreaseSpot[this.vehicle.vehicleType.type](this.company);
  }

  handleIncreaseSpace?() {
    isAvailableToIncreaseSpot[this.vehicle.vehicleType.type](this.company);
  }

  addDepartTime?() {
    this.departTime = new Date();
  }
}
