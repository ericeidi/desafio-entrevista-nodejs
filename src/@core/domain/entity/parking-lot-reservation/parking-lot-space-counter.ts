import { ParkingLotReservation } from './parking-lot-reservation';
export class ParkingLotSpaceCounter {
  counterArrivalSpace = 0;
  counterDepartSpace = 0;

  handleCountArrivalSpace(parkingLotReservation: ParkingLotReservation[]) {
    parkingLotReservation.forEach((reservation) => {
      if (reservation.arrivalTime) {
        this.counterArrivalSpace += 1;
      }
    });
    return this.counterArrivalSpace;
  }
  handleCountDepartSpace(parkingLotReservation: ParkingLotReservation[]) {
    parkingLotReservation.forEach((reservation) => {
      if (reservation.departTime) {
        this.counterDepartSpace += 1;
      }
    });
    return this.counterDepartSpace;
  }
}
