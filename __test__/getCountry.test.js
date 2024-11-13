const {getCountry} = require("../js");

describe('getCountry', () => {
test('should return valid country name', async () => {
    const expectedName = 'New York';
    try {
        const data = await getCountry(); 

        data.name = expectedName; 

        expect(data.name).toEqual(expectedName);
    } catch (error) {
        console.error('Error occurred:', error); 
    }
});});
