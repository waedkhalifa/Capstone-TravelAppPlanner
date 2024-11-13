import { getImg } from "../js";
import { notAvailableImage } from "../js/getImg"; 

describe('getImg', () => {
    test('should return image of canada', async () => {
        const res = await getImg('Canada');

        expect(res).toBeDefined();
    });

    test('should return notAvailableImage if there is an error in fetching', async () => {
        const res = await getImg('invalidName'); 
        expect(res).toBe(notAvailableImage);
    });
});