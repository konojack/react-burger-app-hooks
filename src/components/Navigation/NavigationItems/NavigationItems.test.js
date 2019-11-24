import React from 'react';
import { configure, shallow }from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import NavigationItems from './NavigationItems';
import { NavLink } from 'react-router-dom';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => { 
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NavigationItems />);
    });

    it('should render two NavLinks if not authenticated', () => {
        expect(wrapper.find(NavLink)).toHaveLength(2);
    })

    it('should render three NavLinks if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.find(NavLink)).toHaveLength(3);
    })

    it('should render "auth" NavLink if not authenticated', () => {
        expect(wrapper.contains(<NavLink to="/auth" activeClassName="active">Authenticate</NavLink>)).toEqual(true);
    })

    it('should render "logout" NavLink if authenticated', () => {
        wrapper.setProps({isAuth: true});
        expect(wrapper.contains(<NavLink to="/logout" activeClassName="active">Logout</NavLink>)).toEqual(true);
    })


});