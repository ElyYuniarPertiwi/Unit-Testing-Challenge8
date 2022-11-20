const CarController = require('../controllers/CarController');
const {Car, UserCar} = require('../models');
const userCar = UserCar;
const carModel = Car;
const dayjs = require('dayjs');

describe('CarController', () => {
  let carController;
  beforeEach(() => {
    carController = new CarController({userCar, carModel, dayjs});
  });

  describe('handleListCars', () => {
    it('should return list of data cars', async () => {
      const request = {
        query: {
          pageSize: 10,
          page: 1,
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await carController.handleListCars(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        cars: expect.any(Array),
        meta: {
          pagination: expect.any(Object),
        },
      });
    });
  });

  describe('handleGetCar', () => {
    it('should return a data car', async () => {
      const request = {
        params: {
          id: 8,
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await carController.handleGetCar(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(
          expect.any(Object));
    });
  });

  describe('handleCreateCar', () => {
    it('should return a new data car', async () => {
      const request = {
        body: {
          name: 'Mobilio',
          price: 300000,
          size: 'medium',
          image: 'https://asset.honda-indonesia.com/colors/r3uggHgsB8UhNq6BbuGltCYZvn58nGcTmDmD7cCb.png',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await carController.handleCreateCar(request, response);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(
          expect.any(Object));
    });
  });

  describe('handleUpdateCar', () => {
    it('should return an updating data car', async () => {
      const request = {
        params: {
          id: 8,
        },
        body: {
          name: 'Mobilio',
          price: 200000,
          size: 'medium',
          image: 'https://asset.honda-indonesia.com/colors/r3uggHgsB8UhNq6BbuGltCYZvn58nGcTmDmD7cCb.png',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await carController.handleUpdateCar(request, response);
      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith(
          expect.any(Object));
    });
  });

  describe('handleRentCar', () => {
    it('should return a renting data car', async () => {
      const request = {
        params: {
          id: 5,
        },
        body: {
          userId: 3,
          startDate: '2022-11-08',
          endDate: '2022-11-22',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await carController.handleRentCar(request, response);
      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(
          expect.any(Object));
    });
  });

  describe('handleDeleteCar', () => {
    it('should delete a data car', async () => {
      const request = {
        params: {
          id: 10,
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn(),
      };

      await carController.handleDeleteCar(request, response);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith(
          expect.any(Object));
    });
  });
});
