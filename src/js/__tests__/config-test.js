jest.dontMock('../config');

const config = require('../config');

describe('config', () => {
    const defaultPort = 5000;
    it('should be defined', () => {
        expect(config).toBeDefined();
    });
    it('should have the default port', () => {
        expect(config.port).toEqual(defaultPort);
    });
    it('should have default host localhost with a port', () => {
        expect(config.host).toMatch(/^localhost:\d+/);
    });
    it('should have default host with default port', () => {
        expect(config.host).toEqual('localhost:' + defaultPort);
    });
});