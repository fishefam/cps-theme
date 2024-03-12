/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { ISearchFormViewProps } from '@msdyn365-commerce-modules/search';

import { ISearchResources } from '../../definition-extensions/search.ext.props.autogenerated';
import { FormComponent } from '../../views/components/search.form';

const mockProps = {
    searchText: 'test',
    config: { noSearchResultImage: 'test' },
    resources: {
        productSuggestionHeading: '123',
        emptyMobileSearchTextHeading: 'text',
        emptyMobileSearchText: 'text'
    },
    callbacks: { clearSearch: jest.fn() },
    isSearchFormExpanded: true,
    form: {
        input: 'input',
        submitBtn: 'submitBtn',
        cancelBtn: 'cancelBtn'
    }
};

// @ts-expect-error only mock partial data
const mockResources: ISearchResources = {
    clearSearchButtonText: 'Clear'
};
const form: ISearchFormViewProps = {
    input: 'input',
    submitBtn: 'submitBtn',
    cancelBtn: 'cancelBtn'
};
const searchForm = { className: 'node-class-SearchForm' };
const formWrapper = { className: 'node-class-FormWrapper' };
const funccall = jest.fn();
describe('Search unit tests - Form Component', () => {
    it('renders correctly when isMobile is true', () => {
        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, true, 'Clear', mockProps, true, funccall);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when clear search button text is empty', () => {
        mockResources.clearSearchButtonText = '';

        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, true, 'Clear', mockProps, true, funccall);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when isMobile is set to true and isMobile is set to false', () => {
        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, false, undefined, mockProps, true, funccall);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when isMobile and isSearchText are set to false', () => {
        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, false, 'Clear', mockProps, false, funccall);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when clearSearchButtonText as undefined', () => {
        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, false, undefined, mockProps, false, funccall);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when isMobile is set to true, isSearchText is set to false and clearSearchButtonText as undefined', () => {
        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, true, undefined, mockProps, false, funccall);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly when isMobile and isSearchText are set to true and clearSearchButtonText as undefined', () => {
        // @ts-expect-error partial mock
        const component = FormComponent(form, searchForm, formWrapper, true, undefined, mockProps, true, funccall);
        expect(component).toMatchSnapshot();
    });
});