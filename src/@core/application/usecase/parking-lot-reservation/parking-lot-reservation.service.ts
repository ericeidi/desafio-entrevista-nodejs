import { Logger } from '@nestjs/common';
import { CompanyRepository } from '../../../../@core/domain/repository/company/company.repository';
import { CreateParkingReservationDto } from '../../../../parking-lot-reservation/dto/create-parking-reservation.dto';
import { UpdateParkingReservationDto } from '../../../../parking-lot-reservation/dto/update-parking-reservation.dto';
import { ParkingLotReservationRepository } from '../../../domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { VehicleRepository } from '../../../domain/repository/vehicle/vehicle.repository';
import { Company } from '../../../domain/entity/company/company';
import { ParkingLotReservation } from '../../../domain/entity/parking-lot-reservation/parking-lot-reservation';
import { FindArrivalQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-depart-reservation-quantity.dto';
import { FindDepartQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-arrival-reservation-quantity.dto';
import { ParkingLotSpaceCounter } from '../../../domain/entity/parking-lot-reservation/parking-lot-space-counter';

export class ParkingLotReservationService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly parkingLotReservationRepository: ParkingLotReservationRepository,
  ) {}

  async startReservation(
    createParkingReservationDto: CreateParkingReservationDto,
  ): Promise<ParkingLotReservation> {
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

    if (!parkingLot.departTime) return;

    await this.companyRepository.update(company.cnpj, company);
    await this.parkingLotReservationRepository.insert(parkingLotReservation);
    return parkingLotReservation;
  }

  async finishReservation(
    updateParkingReservationDto: UpdateParkingReservationDto,
  ): Promise<ParkingLotReservation> {
    const [vehicleInRepository] =
      await this.vehicleRepository.findByLicensePlate(
        updateParkingReservationDto.licensePlate,
      );

    const [parkingLot] =
      await this.parkingLotReservationRepository.findByVehicle(
        vehicleInRepository,
      );

    if (parkingLot.departTime) return;

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

  async findAllReservations() {
    const reservations =
      await this.parkingLotReservationRepository.findAllReservations();
    const spaceCounter = new ParkingLotSpaceCounter();
    spaceCounter.handleCountArrivalSpace(reservations);
    spaceCounter.handleCountDepartSpace(reservations);
    return [reservations, spaceCounter];
  }

  async findReservationByCompany(companyId: number) {
    const reservations =
      await this.parkingLotReservationRepository.findReservationByCompany(
        companyId,
      );
    const spaceCounter = new ParkingLotSpaceCounter();
    spaceCounter.handleCountArrivalSpace(reservations);
    spaceCounter.handleCountDepartSpace(reservations);
    return [reservations, spaceCounter];
  }

  async findArrivalReservationQuantityByHour(
    query: FindArrivalQuantityReservationDto,
  ) {
    return await this.parkingLotReservationRepository.findArrivalReservationQuantityByHour(
      query,
    );
  }

  async findDepartReservationQuantityByHour(
    query: FindDepartQuantityReservationDto,
  ) {
    return await this.parkingLotReservationRepository.findDepartReservationQuantityByHour(
      query,
    );
  }
}
