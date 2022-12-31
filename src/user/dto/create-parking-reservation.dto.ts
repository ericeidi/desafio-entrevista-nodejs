export class CreateParkingReservationDto {
  vehicle: {
    licensePlate: string;
  };
  company: {
    cnpj: string;
  };
}
