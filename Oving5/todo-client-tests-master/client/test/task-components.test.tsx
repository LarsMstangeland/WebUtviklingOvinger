import * as React from 'react';
import { TaskDetails, TaskEdit, TaskList, TaskNew } from '../src/task-components';
import { shallow } from 'enzyme';
import { Form, Button } from '../src/widgets';
import { NavLink } from 'react-router-dom';

jest.mock('../src/task-service', () => {
  class TaskService {
    getAll() {
      return Promise.resolve([
        { id: 1, title: 'Les leksjon', done: false },
        { id: 2, title: 'Møt opp på forelesning', done: false },
        { id: 3, title: 'Gjør øving', done: false },
      ]);
    }

    create() {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }

    get(){
      return Promise.resolve(
        {
          id:1, title: 'les leksjon', done: false
        }
      )
    }

    update() {
      return Promise.resolve(); // Same as: return new Promise((resolve) => resolve(4));
    }

    delete() {
      return Promise.resolve(4); // Same as: return new Promise((resolve) => resolve(4));
    }

  }
  return new TaskService();
});

describe('Task component tests', () => {
  test('TaskList draws correctly', (done) => {
    const wrapper = shallow(<TaskList />);

    // Wait for events to complete
    setTimeout(() => {
      expect(
        wrapper.containsAllMatchingElements([
          <NavLink to="/tasks/1">Les leksjon</NavLink>,
          <NavLink to="/tasks/2">Møt opp på forelesning</NavLink>,
          <NavLink to="/tasks/3">Gjør øving</NavLink>,
        ])
      ).toEqual(true);
      done();
    });
  });

  test('TaskList success button works', (done) => {

    const wrapper = shallow(<TaskList></TaskList>)

    wrapper.find(Button.Success).simulate('click')

    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/new')
      done();
    })

  })

  test('Tasknew draws correctly', (done) => {
    
    const wrapper = shallow(<TaskNew></TaskNew>)

    setTimeout(() => {

      expect(wrapper).toMatchSnapshot();
      done();
    });

  })

  test('TaskNew correctly sets location on create', (done) => {
    const wrapper = shallow(<TaskNew />);

    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'Kaffepause' } });
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Input value="Kaffepause" />)).toEqual(true);
    wrapper.find(Button.Success).simulate('click');
    // Wait for events to complete
    setTimeout(() => {
      expect(location.hash).toEqual('#/tasks/4');
      done();
    });
  });

  test('TaskDetails draws correctly', (done) => {

    const wrapper = shallow(<TaskDetails match={{params: {id:1}}}></TaskDetails>)
    setTimeout(() => {

      expect(wrapper).toMatchSnapshot();
      done();
    });
  });


  test('TaskEdit draws correctly', (done) => {

    const wrapper = shallow(<TaskEdit match={{params: {id:1}}}></TaskEdit>)
    
    wrapper.find(Form.Input).simulate('change', { currentTarget: { value: 'detailer' }});

    wrapper.find(Form.Textarea).simulate('change', { currentTarget: { value: 'merDetalier' }});

    wrapper.find(Form.Checkbox).simulate('change', {currentTarget: {checked: true}});


    
        
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Input value='detailer' />)).toEqual(true)
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Textarea value='merDetalier' />)).toEqual(true)
    // @ts-ignore
    expect(wrapper.containsMatchingElement(<Form.Checkbox checked={true} />)).toEqual(true)


    wrapper.find(Button.Success).simulate('click');
    wrapper.find(Button.Danger).simulate('click');


    setTimeout(() =>{

      expect(location.hash).toEqual('#/tasks');


      expect(wrapper).toMatchSnapshot();
      done();
    })

  })


  


});
