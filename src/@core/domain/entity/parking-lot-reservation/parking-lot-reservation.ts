import { BadRequestException } from '@nestjs/common/exceptions';
import { vehicleTypeEnum } from '../../../../shared/constants/vehicle-type.enum';
import { ConvertUtc } from '../../../../shared/utils/convert-utc';
import { VehicleSchema } from '../../../infra/db/vehicle/vehicle.schema';
import { Company } from '../company/company';

const EMPTY_SPACES = 0;

export class ParkingLotReservation {
  id: number;
  company: Company;
  vehicle: VehicleSchema;
  departTime: string;
  arrivalTime: string;
  constructor(company: Company, vehicle: VehicleSchema, id?: number) {
    this.id = id || null;
    this.company = company;
    this.vehicle = vehicle;
  }

  handleDecreaseSpace?() {
    const isAvailableToDecreaseSpot = {
      [vehicleTypeEnum.CAR]: () => {
        if (this.company.carSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para carro indisponivel');
        }
        this.decreaseSpace();
      },
      [vehicleTypeEnum.MOTORCYCLE]: () => {
        if (this.company.motorCycleSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para moto indisponivel');
        }
        this.decreaseSpace();
      },
    };
    isAvailableToDecreaseSpot[this.vehicle.vehicleType.type]();
  }

  handleIncreaseSpace?() {
    const isAvailableToIncreaseSpot = {
      [vehicleTypeEnum.CAR]: () => {
        if (this.company.carSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para carro indisponivel');
        }
        this.increaseSpace();
      },
      [vehicleTypeEnum.MOTORCYCLE]: () => {
        if (this.company.motorCycleSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para moto indisponivel');
        }
        this.increaseSpace();
      },
    };
    isAvailableToIncreaseSpot[this.vehicle.vehicleType.type]();
  }

  private decreaseSpace?() {
    this.company.motorCycleSpaces -= 1;
  }

  private increaseSpace?() {
    this.company.carSpaces += 1;
  }

  addDepartTime?() {
    this.departTime = ConvertUtc(new Date());
  }

  addArrivalTime?() {
    this.arrivalTime = ConvertUtc(new Date());
  }
}
