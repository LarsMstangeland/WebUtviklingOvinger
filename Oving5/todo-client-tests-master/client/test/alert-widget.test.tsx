import * as React from 'react';
import { Alert } from '../src/widgets';
import { shallow } from 'enzyme';

describe('Alert tests', () => {
  test('No alerts initially', () => {
    const wrapper = shallow(<Alert />);

    expect(wrapper.matchesElement(<div></div>)).toEqual(true);
  });

  test('Show alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <div>
            <div>
              test
              <button />
            </div>
          </div>
        )
      ).toEqual(true);

      done();
    });
  });

  test('Close alert message', (done) => {
    const wrapper = shallow(<Alert />);

    Alert.danger('test');

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.matchesElement(
          <div>
            <div>
              test
              <button />
            </div>
          </div>
        )
      ).toEqual(true);

      wrapper.find('button.btn-close').simulate('click');

      expect(wrapper.matchesElement(<div></div>)).toEqual(true);

      done();
    });
  });


    test('Open 3 alert components', (done) => {

      //made 3 alerts
      const wrapper = shallow(
        <Alert></Alert>
      );

      Alert.danger('nummer1');
      Alert.danger('nummer2');
      Alert.danger('nummer3');



      //check if the three different buttons are here
      setTimeout(() => {
        expect(wrapper.containsMatchingElement(
            <div>
              <div>
                nummer1
                <button></button>
              </div>
            </div>
        )).toEqual(true)

        expect(wrapper.containsMatchingElement(
          <div>
            <div>
              nummer2
              <button></button>
            </div>
          </div>
      )).toEqual(true)

      expect(wrapper.containsMatchingElement(
        <div>
          <div>
            nummer3
            <button></button>
          </div>
        </div>
      )).toEqual(true)

        //take away a button by clicking it
      wrapper.find('button').at(2).simulate('click');

        //expect to find two buttons
      expect(wrapper.containsMatchingElement(
        <div>
          <div>
            nummer1
            <button></button>
          </div>
        </div>
      )).toEqual(true)

      expect(wrapper.containsMatchingElement(
        <div>
          <div>
            nummer2
            <button></button>
          </div>
        </div>
      )).toEqual(true)

    })
    done();
  })
});
