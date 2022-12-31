import { VehicleType } from './vehicle-type';

const mockInput: VehicleType = {
  id: 1,
  brand: 'chevrolet',
  model: 'montana',
  type: 1,
  color: 'prata',
};

describe('Vehicle Type Unit Tests', () => {
  it('should create a new Vehicle', () => {
    const vehicleType = new VehicleType(mockInput);
    expect(vehicleType).toEqual(vehicleType);
  });
});
