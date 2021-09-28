import {max, min} from '../src/lib/types/defaultValues';

test("all values are set to default", () => {
    expect(max).toBeNull();
    expect(min).toBe(0);
})