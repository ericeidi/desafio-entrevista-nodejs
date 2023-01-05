import { Logger } from '@nestjs/common';
import { CompanyRepository } from 'src/@core/domain/repository/company/company.repository';
import { CreateParkingReservationDto } from 'src/parking-lot-reservation/dto/create-parking-reservation.dto';
import { UpdateParkingReservationDto } from 'src/parking-lot-reservation/dto/update-parking-reservation.dto';
import { ParkingLotReservationRepository } from '../../../domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { VehicleRepository } from '../../../domain/repository/vehicle/vehicle.repository';
import { Company } from '../../../domain/entity/company/company';
import { ParkingLotReservation } from '../../../domain/entity/parking-lot-reservation/parking-lot-reservation';
import { FindArrivalQuantityReservationDto } from 'src/parking-lot-reservation/dto/find-depart-reservation-quantity.dto';
import { FindDepartQuantityReservationDto } from 'src/parking-lot-reservation/dto/find-arrival-reservation-quantity.dto';

export class ParkingLotReservationService {
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
    parkingLotReservation.addArrivalTime();

    const company = new Company(companyInRepository);

    if (!parkingLot) {
      await this.companyRepository.update(company.cnpj, company);
      await this.parkingLotReservationRepository.insert(parkingLotReservation);

      return parkingLotReservation;
    }

    if (!parkingLot.departTime)
      return Logger.error('Já existe uma reserva para esse veiculo');

    await this.companyRepository.update(company.cnpj, company);
    await this.parkingLotReservationRepository.insert(parkingLotReservation);
    return parkingLotReservation;
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

    await this.companyRepository.update(
      companyInRepository.cnpj,
      companyInRepository,
    );
    await this.parkingLotReservationRepository.update(parkingLotReservation);
  }

  findAllReservations() {
    return this.parkingLotReservationRepository.findAllReservations();
  }

  findReservationByCompany(companyId: number) {
    return this.parkingLotReservationRepository.findReservationByCompany(
      companyId,
    );
  }

  findArrivalReservationQuantityByHour(
    query: FindArrivalQuantityReservationDto,
  ) {
    return this.parkingLotReservationRepository.findArrivalReservationQuantityByHour(
      query,
    );
  }

  findDepartReservationQuantityByHour(query: FindDepartQuantityReservationDto) {
    return this.parkingLotReservationRepository.findDepartReservationQuantityByHour(
      query,
    );
  }
}
