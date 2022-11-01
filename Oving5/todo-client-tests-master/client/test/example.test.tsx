import * as React from 'react';
import { shallow } from 'enzyme';

describe('hello tests', () => {
    test('Hello test', () => {
        const wrapper = shallow(

            <div>
                <b className='example'>test</b>
            </div>
        );

        expect(
            wrapper.matchesElement(
                <div>
                    <b>test</b>
                </div>
            )
        ).toEqual(true);
        expect(wrapper.containsMatchingElement(<b>test</b>)).toEqual(true);
        expect(wrapper.containsMatchingElement(<b className='example'>test</b>));
    });
});


describe("test alert functions", () => {
    test("test")


})

