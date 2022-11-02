import * as React from 'react';
import { Column, Row, Card, Button, Form } from '../src/widgets';
import { shallow } from 'enzyme';


describe('Row tests', () => {
    test('draws rows correctly', () => {

        const wrapper = shallow(<Row>test</Row>);

        expect(wrapper.containsMatchingElement(
            <div>test</div>
        )).toEqual(true)
    })
});

describe('Collumn tests', () => {
    test('draws collum correctly', () => {

        const wrapper = shallow(<Column>test</Column>);

        expect(wrapper.containsMatchingElement(
            <div>
                <div>test</div>
            </div>
        )).toEqual(true)
    })

    test('draws collum correctly right', () => {

        const wrapper = shallow(<Column right={true}>test</Column>);

        expect(wrapper.containsMatchingElement(
            <div>
                <div className='float-end'>test</div>
            </div>
        )).toEqual(true)
    })

    test('draws collum width correctly', () => {

        const wrapper = shallow(<Column width={2}>test</Column>);

        expect(wrapper.containsMatchingElement(
            <div className='col-2'>
                <div>test</div>
            </div>
        )).toEqual(true)
    })
})

describe('Card tests', () => {

    test('draws card correctly', () => {

        const wrapper = shallow(<Card title={"test"}>test2</Card>)

        expect(wrapper.matchesElement(
            <div className="card">
                <div className="card-body">
                    <h5 className="card-title">{"test"}</h5>
                    <div className="card-text">{"test2"}</div>
                </div>
            </div> 
        ))
    })
})

describe('Button tests', () => {


    test('Button danger is drawn correctly', () => {

        // @ts-ignore: do not type check next line.
        const wrapper = shallow(<Button.Danger onClick={(event)=> console.log(event.currentTarget)}></Button.Danger>)
        expect(wrapper.matchesElement(
            <button onClick={(event) => console.log(event.currentTarget)} className={"btn btn-danger"}></button>
        ))
    })

    test('Button success is drawn correctly', () => {

        // @ts-ignore: do not type check next line.
        const wrapper = shallow(<Button.Success onClick={(event)=> console.log(event.currentTarget)}></Button.Success>)
        expect(wrapper.matchesElement(
            <button onClick={(event) => console.log(event.currentTarget)} className={"btn btn-success"}></button>
        ))
    })

    
    test('Button light is drawn correctly', () => {

        // @ts-ignore: do not type check next line.
        const wrapper = shallow(<Button.Light onClick={(event)=> console.log(event.currentTarget)}></Button.Light>)
        expect(wrapper.matchesElement(
            <button onClick={(event) => console.log(event.currentTarget)} className={"btn btn-light"}></button>
        ))
    })

})

    describe('FormInput tests', () => {


        test('Form label is drawn correctly ', () => {
            
            // @ts-ignore: do not type check next line.
            const wrapper = shallow(<Form.Label>test</Form.Label>)

            expect(wrapper.matchesElement(
                <label className='col-form-label'>test</label>
            ))
        })

        test('Form input is drawn correctly ', () => {
            
            // @ts-ignore: do not type check next line.
            const wrapper = shallow(<Form.Input></Form.Input>)

            expect(wrapper.matchesElement(
                <input className='form-controll'></input>
                ))      
            })

        test('Form textarea is drawn correctly ', () => {
            
            // @ts-ignore: do not type check next line.
            const wrapper = shallow(<Form.Textarea></Form.Textarea>)

            expect(wrapper.matchesElement(
                <input className='form-control'></input>
                ))      
            })


        test('Form checkbox is drawn correctly ', () => {
            
            // @ts-ignore: do not type check next line.
            const wrapper = shallow(<Form.Checkbox></Form.Checkbox>)
            
            expect(wrapper.matchesElement(
                <input className='form-check-input'></input>
                ))      
            })
    

            
})