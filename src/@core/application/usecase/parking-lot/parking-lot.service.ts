import { Logger } from '@nestjs/common';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { CreateParkingReservationDto } from 'src/user/dto/create-parking-reservation.dto';
import { UpdateParkingReservationDto } from 'src/user/dto/update-parking-reservation.dto';
import { ParkingLotReservationRepository } from '../../../../@core/domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { VehicleRepository } from '../../../../@core/domain/repository/vehicle/vehicle.repository';
import { Company } from '../../../domain/entity/company/company';
import { ParkingLotReservation } from '../../../domain/entity/parking-lot-reservation/parking-lot-reservation';

export class ParkingLotService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly parkingLotReservationRepository: ParkingLotReservationRepository,
  ) {}

  async startReservation(
    createParkingReservationDto: CreateParkingReservationDto,
  ) {
    const [vehicleInRepository] =
      await this.vehicleRepository.findByLicensePlate(
        createParkingReservationDto.licensePlate,
      );

    const [parkingLot] =
      await this.parkingLotReservationRepository.findByVehicle(
        vehicleInRepository,
      );
    const companyInRepository = await this.companyRepository.findByCnpj(
      createParkingReservationDto.cnpj,
    );

    const parkingLotReservation = new ParkingLotReservation(
      companyInRepository,
      vehicleInRepository,
    );
    parkingLotReservation.handleDecreaseSpace();

    const company = new Company(companyInRepository);

    if (!parkingLot) {
      await this.companyRepository.update(company.cnpj, company);
      await this.parkingLotReservationRepository.insert(parkingLotReservation);

      return parkingLotReservation;
    }

    if (!parkingLot.departTime)
      return Logger.error('Já existe uma reserva para esse veiculo');

    try {
      await this.companyRepository.update(company.cnpj, company);
      await this.parkingLotReservationRepository.insert(parkingLotReservation);
      return parkingLotReservation;
    } catch (e) {
      throw new Error(e);
    }
  }

  async finishReservation(
    updateParkingReservationDto: UpdateParkingReservationDto,
  ): Promise<any> {
    const [vehicleInRepository] =
      await this.vehicleRepository.findByLicensePlate(
        updateParkingReservationDto.licensePlate,
      );

    const [parkingLot] =
      await this.parkingLotReservationRepository.findByVehicle(
        vehicleInRepository,
      );

    if (parkingLot.departTime)
      return Logger.error('Reserva já está finalizada');

    const companyInRepository = await this.companyRepository.findByCnpj(
      parkingLot.company.cnpj,
    );

    const parkingLotReservation = new ParkingLotReservation(
      companyInRepository,
      vehicleInRepository,
      parkingLot.id,
    );
    parkingLotReservation.handleIncreaseSpace();
    parkingLotReservation.addDepartTime();

    await this.parkingLotReservationRepository.update(parkingLotReservation);
  }
}
