const AuthenticationController = require('../controllers/AuthenticationController');
const {User, Role} = require('../models');
const bcrypt = require('bcryptjs');
const jwtToken = require('jsonwebtoken');
const userModel = User;
const roleModel = Role;

describe('AuthenticationController', () => {
  let authenticationController;
  beforeEach(() => {
    authenticationController = new AuthenticationController({userModel, roleModel, jwtToken, bcrypt});
  });

  describe('handleLogin', () => {
    it('should return 201 status and token', async () => {
      const request = {
        body: {
          email: 'brian@binar.co.id',
          password: '123456',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await authenticationController.handleLogin(request, response, next);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        accessToken: expect.any(String),
      });
    });
    it('should return 404 status if email not registered', async () => {
      const request = {
        body: {
          email: 'elyyuniar@binar.co.id',
          password: '123456',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await authenticationController.handleLogin(request, response, next);

      expect(response.status).toHaveBeenCalledWith(404);
    });
    it('should return 401 status if wrong password', async () => {
      const request = {
        body: {
          email: 'elyyuniar@binar.co.id',
          password: 'pippappuppip',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await authenticationController.handleLogin(request, response, next);

      expect(response.status).toHaveBeenCalledWith(401);
    });
  });

  describe('handleRegister', () => {
    it('should return 201 status and token', async () => {
      const request = {
        body: {
          name: 'Tiwi',
          email: 'tiwi@binar.co.id',
          password: '123456',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await authenticationController.handleRegister(request, response, next);

      expect(response.status).toHaveBeenCalledWith(201);
      expect(response.json).toHaveBeenCalledWith({
        accessToken: expect.any(String),
      });
    });
    it('should return 422 status if email already taken', async () => {
      const request = {
        body: {
          name: 'Brian',
          email: 'brian@binar.co.id',
          password: '123456',
        },
      };
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };
      const next = jest.fn();

      await authenticationController.handleRegister(request, response, next);

      expect(response.status).toHaveBeenCalledWith(422);
    });

    describe('handleGetUser', () => {
      it('should return 200 status and a data user', async () => {
        const request = {
          user: {
            id: 1,
          },
        };
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();

        await authenticationController.handleGetUser(request, response, next);

        expect(response.status).toHaveBeenCalledWith(200);
        expect(response.json).toHaveBeenCalledWith(
            expect.any(Object),
        );
      });
      it('should return 404 status if user not found', async () => {
        const request = {
          user: {
            id: 50,
          },
        };
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();

        await authenticationController.handleGetUser(request, response, next);

        expect(response.status).toHaveBeenCalledWith(404);
      });
      it('should return 404 status if role not found', async () => {
        const request = {
          user: {
            id: 50,
          },
        };
        const response = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn().mockReturnThis(),
        };
        const next = jest.fn();

        await authenticationController.handleGetUser(request, response, next);

        expect(response.status).toHaveBeenCalledWith(404);
      });
    });
  });
});
