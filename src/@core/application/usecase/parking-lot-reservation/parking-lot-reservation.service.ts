import { BadRequestException } from '@nestjs/common';
import { NotFoundException } from '@nestjs/common/exceptions';
import { CompanyRepository } from '../../../../@core/domain/repository/company/company.repository';
import { CreateParkingReservationDto } from '../../../../parking-lot-reservation/dto/create-parking-reservation.dto';
import { FindDepartQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-arrival-reservation-quantity.dto';
import { FindArrivalQuantityReservationDto } from '../../../../parking-lot-reservation/dto/find-depart-reservation-quantity.dto';
import { UpdateParkingReservationDto } from '../../../../parking-lot-reservation/dto/update-parking-reservation.dto';
import { ParkingLotReservation } from '../../../domain/entity/parking-lot-reservation/parking-lot-reservation';
import { ParkingLotSpaceCounter } from '../../../domain/entity/parking-lot-reservation/parking-lot-space-counter';
import { ParkingLotReservationRepository } from '../../../domain/repository/parking-lot-reservation/parking-lot-reservation.repository';
import { VehicleRepository } from '../../../domain/repository/vehicle/vehicle.repository';

export class ParkingLotReservationService {
  constructor(
    private readonly vehicleRepository: VehicleRepository,
    private readonly companyRepository: CompanyRepository,
    private readonly parkingLotReservationRepository: ParkingLotReservationRepository,
  ) {}

  async startReservation(
    createParkingReservationDto: CreateParkingReservationDto,
  ) {
    try {
      const repositories =
        await this.getRequiredRepositoriesForCreateReservation(
          createParkingReservationDto,
        );

      const parkingLotReservation = new ParkingLotReservation(
        repositories.companyInRepository,
        repositories.vehicleInRepository,
      );
      parkingLotReservation.handleDecreaseSpace();
      parkingLotReservation.addArrivalTime();

      const responseCreated = await this.createReservationIfVehicleNotExists(
        repositories,
        parkingLotReservation,
      );
      if (responseCreated) return parkingLotReservation;

      if (!repositories.parkedVehicle.departTime)
        throw new BadRequestException(
          'Ainda existe uma reserva ativa para este veiculo',
        );

      await this.createReservationIfVehicleExists(
        repositories,
        parkingLotReservation,
      );

      return parkingLotReservation;
    } catch (e) {
      throw e;
    }
  }

  async finishReservation(
    updateParkingReservationDto: UpdateParkingReservationDto,
  ): Promise<void> {
    try {
      const repositories =
        await this.getRequiredRepositoriesForUpdateReservation(
          updateParkingReservationDto,
        );

      if (repositories.parkedVehicle.departTime)
        throw new BadRequestException('Reserva do veiculo já está finalizada');

      await this.updateReservationIfVehicleIsNotDeparted(repositories);
    } catch (e) {
      throw e;
    }
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

  private async getRequiredRepositoriesForCreateReservation(
    createParkingReservationDto: CreateParkingReservationDto,
  ) {
    const [vehicleInRepository] =
      await this.vehicleRepository.findByLicensePlate(
        createParkingReservationDto.licensePlate,
      );

    if (!vehicleInRepository)
      throw new NotFoundException('Veiculo nao encontrado');

    const companyInRepository = await this.companyRepository.findByCnpj(
      createParkingReservationDto.cnpj,
    );

    if (!companyInRepository)
      throw new NotFoundException('Estabelecimento nao encontrado');

    const [parkedVehicle] =
      await this.parkingLotReservationRepository.findByVehicle(
        vehicleInRepository,
      );

    return { vehicleInRepository, companyInRepository, parkedVehicle };
  }

  private async createReservationIfVehicleExists(
    repositories,
    parkingLotReservation: ParkingLotReservation,
  ) {
    await this.companyRepository.update(
      repositories.companyInRepository.cnpj,
      repositories.companyInRepository,
    );
    await this.parkingLotReservationRepository.insert(parkingLotReservation);
  }
  private async createReservationIfVehicleNotExists(
    repositories,
    parkingLotReservation: ParkingLotReservation,
  ) {
    if (!repositories.parkedVehicle) {
      await this.companyRepository.update(
        repositories.companyInRepository.cnpj,
        repositories.companyInRepository,
      );
      await this.parkingLotReservationRepository.insert(parkingLotReservation);

      return parkingLotReservation;
    }
  }

  private async updateReservationIfVehicleIsNotDeparted(repositories) {
    const parkingLotReservation = new ParkingLotReservation(
      repositories.companyInRepository,
      repositories.vehicleInRepository,
      repositories.parkedVehicle.id,
    );
    parkingLotReservation.handleIncreaseSpace();
    parkingLotReservation.addDepartTime();

    await this.companyRepository.update(
      repositories.companyInRepository.cnpj,
      repositories.companyInRepository,
    );
    console.log(parkingLotReservation);
    await this.parkingLotReservationRepository.update(parkingLotReservation);
  }
  private async getRequiredRepositoriesForUpdateReservation(
    updateParkingReservationDto: UpdateParkingReservationDto,
  ) {
    const [vehicleInRepository] =
      await this.vehicleRepository.findByLicensePlate(
        updateParkingReservationDto.licensePlate,
      );

    const [parkedVehicle] =
      await this.parkingLotReservationRepository.findByVehicle(
        vehicleInRepository,
      );

    const companyInRepository = await this.companyRepository.findByCnpj(
      parkedVehicle.company.cnpj,
    );

    return { vehicleInRepository, parkedVehicle, companyInRepository };
  }
}
