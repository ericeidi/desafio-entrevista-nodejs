import { BadRequestException } from '@nestjs/common';
import { vehicleTypeEnum } from '../../../../shared/constants/vehicle-type.enum';
import { ConvertUtc } from '../../../../shared/utils/convert-utc';
import { Company } from '../company/company';
import { Vehicle } from '../vehicle/vehicle';

const EMPTY_SPACES = 0;

export class ParkingLotReservation {
  id: number;
  company: Company;
  vehicle: Vehicle;
  departTime: string;
  arrivalTime: string;
  constructor(company: Company, vehicle: Vehicle, id?: number) {
    this.id = id || null;
    this.company = company;
    this.vehicle = vehicle;
  }

  handleDecreaseSpace?(): number | BadRequestException {
    const isAvailableToDecreaseSpot = {
      [vehicleTypeEnum.CAR]: () => {
        if (this.company.carSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para carro indisponivel');
        }
        return (this.company.carSpaces -= 1);
      },
      [vehicleTypeEnum.MOTORCYCLE]: () => {
        if (this.company.motorCycleSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para moto indisponivel');
        }
        return (this.company.motorCycleSpaces -= 1);
      },
    };
    if (this.vehicle.vehicleType.type)
      return isAvailableToDecreaseSpot[this.vehicle.vehicleType.type]();
  }

  handleIncreaseSpace?() {
    const isAvailableToIncreaseSpot = {
      [vehicleTypeEnum.CAR]: () => {
        if (this.company.carSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para carro indisponivel');
        }
        return (this.company.carSpaces += 1);
      },
      [vehicleTypeEnum.MOTORCYCLE]: () => {
        if (this.company.motorCycleSpaces <= EMPTY_SPACES) {
          throw new BadRequestException('Vagas para moto indisponivel');
        }
        return (this.company.motorCycleSpaces += 1);
      },
    };
    if (this.vehicle.vehicleType.type)
      return isAvailableToIncreaseSpot[this.vehicle.vehicleType.type]();
  }

  addDepartTime?() {
    this.departTime = ConvertUtc(new Date());
  }

  addArrivalTime?() {
    this.arrivalTime = ConvertUtc(new Date());
  }
}
