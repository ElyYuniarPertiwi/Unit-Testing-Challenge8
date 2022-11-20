const ApplicationController = require('../controllers/ApplicationController');
const NotFoundError = require('../errors/NotFoundError');
const ApplicationError = require('../errors/ApplicationError');

describe('ApplicationController', () => {
  describe('handleGetRoot', () => {
    it('should return 200 status', () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const controller = new ApplicationController();
      controller.handleGetRoot({}, response);

      expect(response.status).toHaveBeenCalledWith(200);
      expect(response.json).toHaveBeenCalledWith({
        status: 'OK',
        message: 'BCR API is up and running!',
      });
    });
  });

  describe('handleNotFound', () => {
    it('should return 404 status', () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new NotFoundError();
      const controller = new ApplicationController();
      controller.handleNotFound({}, response);

      expect(response.status).toHaveBeenCalledWith(404);
      expect(response.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details,
        },
      });
    });
  });

  describe('handleError', () => {
    it('should return 500 status', () => {
      const response = {
        status: jest.fn().mockReturnThis(),
        json: jest.fn().mockReturnThis(),
      };

      const err = new ApplicationError();
      const controller = new ApplicationController();
      controller.handleGetRoot({}, response);

      expect(response.status).toHaveBeenCalledWith(500);
      expect(response.json).toHaveBeenCalledWith({
        error: {
          name: err.name,
          message: err.message,
          details: err.details || null,
        },
      });
    });
  });

  describe('getOffsetFromRequest', () => {
    it('should return offset', () => {
      const request = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };

      const controller = new ApplicationController();
      const offset = controller.getOffsetFromRequest(request);

      expect(offset).toBe(0);
    });
  });

  describe('buildPaginationObject', () => {
    it('should return pagination object', () => {
      const request = {
        query: {
          page: 1,
          pageSize: 10,
        },
      };
      const count = 1;

      const controller = new ApplicationController();
      const result = controller.buildPaginationObject(request, count);

      expect(result).toEqual({
        page: 1,
        pageCount: 1,
        pageSize: 10,
        count: 1,
      });
    });
  });
});
