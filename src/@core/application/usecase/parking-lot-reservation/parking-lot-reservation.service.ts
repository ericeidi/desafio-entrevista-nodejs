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
import { Company } from '../../../domain/entity/company/company';
import { Vehicle } from '../../../domain/entity/vehicle/vehicle';

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
      const { companyInRepository, vehicleInRepository, parkedVehicle } =
        await this.getRequiredRepositoriesForCreateReservation(
          createParkingReservationDto,
        );

      const parkingLotReservation = new ParkingLotReservation(
        companyInRepository,
        vehicleInRepository,
      );
      parkingLotReservation.handleDecreaseSpace();
      parkingLotReservation.addArrivalTime();

      const responseCreated = await this.createReservationIfVehicleNotExists(
        companyInRepository,
        parkedVehicle,
        parkingLotReservation,
      );
      if (responseCreated) return parkingLotReservation;

      if (!parkedVehicle.departTime)
        throw new BadRequestException(
          'Ainda existe uma reserva ativa para este veiculo',
        );

      await this.createReservationIfVehicleExists(
        companyInRepository,
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
      const { parkedVehicle, companyInRepository, vehicleInRepository } =
        await this.getRequiredRepositoriesForUpdateReservation(
          updateParkingReservationDto,
        );

      if (parkedVehicle.departTime)
        throw new BadRequestException('Reserva do veiculo já está finalizada');

      await this.updateReservationIfVehicleIsNotDeparted(
        companyInRepository,
        parkedVehicle,
        vehicleInRepository,
      );
    } catch (e) {
      throw e;
    }
  }

  async findAllReservations() {
    try {
      const reservations =
        await this.parkingLotReservationRepository.findAllReservations();
      const spaceCounter = new ParkingLotSpaceCounter();
      spaceCounter.handleCountArrivalSpace(reservations);
      spaceCounter.handleCountDepartSpace(reservations);
      return [reservations, spaceCounter];
    } catch (e) {
      throw e;
    }
  }

  async findReservationByCompany(companyId: number) {
    try {
      const reservations =
        await this.parkingLotReservationRepository.findReservationByCompany(
          companyId,
        );
      const spaceCounter = new ParkingLotSpaceCounter();
      spaceCounter.handleCountArrivalSpace(reservations);
      spaceCounter.handleCountDepartSpace(reservations);
      return [reservations, spaceCounter];
    } catch (e) {
      throw e;
    }
  }

  async findArrivalReservationQuantityByHour(
    query: FindArrivalQuantityReservationDto,
  ) {
    try {
      return await this.parkingLotReservationRepository.findArrivalReservationQuantityByHour(
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  async findDepartReservationQuantityByHour(
    query: FindDepartQuantityReservationDto,
  ) {
    try {
      return await this.parkingLotReservationRepository.findDepartReservationQuantityByHour(
        query,
      );
    } catch (e) {
      throw e;
    }
  }

  private async getRequiredRepositoriesForCreateReservation(
    createParkingReservationDto: CreateParkingReservationDto,
  ) {
    try {
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
    } catch (e) {
      throw e;
    }
  }

  private async createReservationIfVehicleExists(
    companyInRepository: Company,
    parkingLotReservation: ParkingLotReservation,
  ) {
    try {
      await this.companyRepository.update(
        companyInRepository.cnpj,
        companyInRepository,
      );
      await this.parkingLotReservationRepository.insert(parkingLotReservation);
    } catch (e) {
      throw e;
    }
  }
  private async createReservationIfVehicleNotExists(
    companyInRepository: Company,
    parkedVehicle: ParkingLotReservation,
    parkingLotReservation: ParkingLotReservation,
  ) {
    try {
      if (!parkedVehicle) {
        await this.companyRepository.update(
          companyInRepository.cnpj,
          companyInRepository,
        );
        await this.parkingLotReservationRepository.insert(
          parkingLotReservation,
        );

        return parkingLotReservation;
      }
    } catch (e) {
      throw e;
    }
  }

  private async updateReservationIfVehicleIsNotDeparted(
    companyInRepository: Company,
    parkedVehicle: ParkingLotReservation,
    vehicleInRepository: Vehicle,
  ) {
    try {
      const parkingLotReservation = new ParkingLotReservation(
        companyInRepository,
        vehicleInRepository,
        parkedVehicle.id,
      );
      parkingLotReservation.handleIncreaseSpace();
      parkingLotReservation.addDepartTime();

      await this.companyRepository.update(
        companyInRepository.cnpj,
        companyInRepository,
      );
      await this.parkingLotReservationRepository.update(parkingLotReservation);
    } catch (e) {
      throw e;
    }
  }
  private async getRequiredRepositoriesForUpdateReservation(
    updateParkingReservationDto: UpdateParkingReservationDto,
  ) {
    try {
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
    } catch (e) {
      throw e;
    }
  }
}
