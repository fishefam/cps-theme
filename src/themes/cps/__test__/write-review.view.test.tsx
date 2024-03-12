/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { Review } from '@msdyn365-commerce/commerce-entities';
import { buildMockCoreContext, buildMockModuleProps, ICommerceApiSettings } from '@msdyn365-commerce/core';
import { SimpleProduct } from '@msdyn365-commerce/retail-proxy';
import {
    IWriteReviewCallbacks,
    IWriteReviewData,
    IWriteReviewResources,
    IWriteReviewViewProps
} from '@msdyn365-commerce-modules/ratings-reviews';
import { wrapInResolvedAsyncResult } from '@msdyn365-commerce-modules/retail-actions';
import { render } from 'enzyme';
import * as React from 'react';

import { IWriteReviewProps } from '../definition-extensions/write-review.ext.props.autogenerated';
import WriteReviewView from '../views/write-review.view';

const apiSettings: ICommerceApiSettings = {
    baseUrl: 'http://www.xyz.com',
    eCommerceChannelId: '',
    channelId: 1,
    catalogId: 2,
    oun: 'xyz',
    baseImageUrl: 'http://www.xyz.com',
    ratingsReviewsEndpoint: '',
    retailServerProxyVersion: '',
    rnr: {
        proxyUrl: 'http://www.xyz.com',
        url: 'http://www.xyz.com',
        id: '1'
    }
};

const mockResources: IWriteReviewResources = {
    signInAriaLabel: 'To Rate and review, sign in',
    signInLabel: 'Sign In',
    reviewButtonLabel: 'review this product',
    privacyPolicyTextFormat: 'By clicking submit, you accept our {0}.',
    privacyPolicyTitle: 'Privacy Policy',
    reviewTextLabel: 'Review',
    reviewTitleLabel: 'Title',
    selectRatingAriaLabel: 'Set ratings as {0} out of {1} stars',
    selectRatingLabel: 'Choose a rating',
    writeReviewModalTitle: 'Write a review',
    editReviewModalTitle: 'Edit your review',
    discardReviewButtonText: 'Discard',
    errorMessageText: 'Something went wrong, please try again',
    submitReviewButtonText: 'Submit',
    editReviewButtonText: 'Edit',
    signInMessage: 'Please sign in to rate and review.',
    reviewTitleAriaLabel: 'Review Title',
    reviewAriaLabel: 'Review description'
};
const emptyMockData: IWriteReviewData = {
    product: wrapInResolvedAsyncResult<SimpleProduct>(undefined),
    userReview: wrapInResolvedAsyncResult<Review>(undefined)
};

const updateReviewMockData: IWriteReviewData = {
    product: wrapInResolvedAsyncResult<SimpleProduct>({ RecordId: 4444, Name: 'product', ItemId: '123' } as SimpleProduct),
    userReview: wrapInResolvedAsyncResult({
        reviewId: 'Review-1',
        productId: 'product1',
        userName: 'user1',
        rating: 3,
        market: 'US',
        locale: 'en',
        thoughtfulnessScore: 0,
        helpfulPositive: 50,
        helpfulNegative: 10,
        reviewText:
            'Lorem ipsum dolor sit amet, cu fugit copiosae quo, nam illud docendi iudicabit ex. ' +
            'Menandri expetendis dissentiunt ut per, mea cu error adipiscing. At solum causae bonorum vis, ' +
            'pri dictas praesent ut, inermis suavitate expetendis quo at. ' +
            'Per ea eruditi indoctum omittantur, sea ad exerci salutandi laboramus. Dico noluisse maiestatis in vel.',
        title: 'Some title to test reviews card layout',
        submittedDateTime: new Date('2019-03-04T19:52:10.044Z'),
        isTakenDown: true,
        violationsFound: false,
        isPublished: true,
        isRevised: false,
        updatedSinceResponse: false
    } as Review)
};

const cancelButtonText = 'cancelButton';
const submitButtonText = 'submitButton';
const ratingText = 'rating';
const ratingLabelText = 'ratingLabel';
const titleLabelText = 'titleLabel';
const textLabelText = 'textLabelText';
const privacyPolicyUrlText = 'privacyPolicyUrl';
const errorText = 'error';
const signInMessageText = 'signInMessage';
const signInButtonText = 'signInButtonText';
const modalToggleText = 'modalToggle';
const headingText = 'Heading';

const reviewModal = {
    modal: { className: 'modal' },
    modalHeader: <div className='modalHeader' />,
    modalFooter: { className: 'modalFooter' },
    modalBody: { className: 'modalBody' },
    cancelButton: <button>{cancelButtonText}</button>,
    submitButton: <button>{submitButtonText}</button>,
    rating: <div>{ratingText}</div>,
    ratingLabel: <div>{ratingLabelText}</div>,
    titleInput: <input className='titleInput' />,
    titleLabel: <div>{titleLabelText}</div>,
    textInput: <input className='textInput' />,
    textLabel: <div>{textLabelText}</div>,
    privacyPolicyUrl: <div>{privacyPolicyUrlText}</div>,
    form: { className: 'modalForm' },
    inputRow: { className: 'inputRow' },
    error: <div>{errorText}</div>
};

const callBacks: IWriteReviewCallbacks = {
    updateReviewTitle: jest.fn(),
    updateReviewText: jest.fn(),
    updateRating: jest.fn(),
    onReviewSubmitted: jest.fn(),
    submitReview: jest.fn(),
    toggleModal: jest.fn()
};

describe('Write Review unit tests - View', () => {
    it('renders correctly', () => {
        const moduleProps: IWriteReviewProps<IWriteReviewData> = buildMockModuleProps({}, {}) as IWriteReviewProps<IWriteReviewData>;
        const allModuleProps: IWriteReviewViewProps & IWriteReviewProps<IWriteReviewData> = buildMockModuleProps(
            {},
            {}
        ) as IWriteReviewViewProps & IWriteReviewProps<IWriteReviewData>;

        allModuleProps.className = 'className';
        allModuleProps.state = {
            rating: 4,
            reviewTitle: 'ffff',
            reviewText: 'wwwwwwwwwwwwwwwwwwwwwww',
            isReviewModalOpen: false,
            hasReviewError: false
        };
        allModuleProps.moduleProps = {
            moduleProps,
            className: 'className'
        };
        allModuleProps.data = updateReviewMockData;
        allModuleProps.callbacks = callBacks;
        allModuleProps.signInMessage = <div>{signInMessageText}</div>;
        allModuleProps.signInButton = <div>{signInButtonText}</div>;
        allModuleProps.modalToggle = <div>{modalToggleText}</div>;
        allModuleProps.reviewModal = reviewModal;
        allModuleProps.heading = <h1>{headingText}</h1>;
        const component = render(<WriteReviewView {...allModuleProps} />);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly for authenticated users', () => {
        const mockContext = buildMockCoreContext({});
        mockContext.request.user.isAuthenticated = true;
        mockContext.request.apiSettings = apiSettings;
        const moduleProps: IWriteReviewProps<IWriteReviewData> = buildMockModuleProps({}, {}) as IWriteReviewProps<IWriteReviewData>;

        const allModuleProps: IWriteReviewViewProps & IWriteReviewProps<IWriteReviewData> = buildMockModuleProps(
            {},
            {},
            mockContext
        ) as IWriteReviewViewProps & IWriteReviewProps<IWriteReviewData>;

        allModuleProps.context = mockContext;
        allModuleProps.className = 'className';
        allModuleProps.resources = mockResources;
        allModuleProps.state = {
            rating: 4,
            reviewTitle: 'ffff',
            reviewText: 'wwwwwwwwwwwwwwwwwwwwwww',
            isReviewModalOpen: false,
            hasReviewError: false
        };
        allModuleProps.moduleProps = {
            moduleProps,
            className: 'className'
        };
        allModuleProps.data = emptyMockData;
        allModuleProps.callbacks = callBacks;
        allModuleProps.signInMessage = <div>{signInMessageText}</div>;
        allModuleProps.signInButton = <div>{signInButtonText}</div>;
        allModuleProps.modalToggle = <div>{modalToggleText}</div>;
        allModuleProps.reviewModal = reviewModal;
        allModuleProps.heading = <h1>{headingText}</h1>;

        const component = render(<WriteReviewView {...allModuleProps} />);
        expect(component).toMatchSnapshot();
    });

    it('renders correctly for successfully submitted reviews', () => {
        const mockContext = buildMockCoreContext({});
        mockContext.request.user.isAuthenticated = true;
        mockContext.request.apiSettings = apiSettings;
        const moduleProps: IWriteReviewProps<IWriteReviewData> = buildMockModuleProps({}, {}) as IWriteReviewProps<IWriteReviewData>;
        const allModuleProps: IWriteReviewViewProps & IWriteReviewProps<IWriteReviewData> = buildMockModuleProps(
            {},
            {},
            {},
            mockContext
        ) as IWriteReviewViewProps & IWriteReviewProps<IWriteReviewData>;

        allModuleProps.context = mockContext;
        allModuleProps.config = {
            paragraph: 'rich text',
            imageSettings: {
                viewports: {
                    xs: { q: 'w=111&h=111&m=6', w: 111, h: 111 },
                    sm: { q: 'w=130&h=130&m=6', w: 130, h: 130 },
                    md: { q: 'w=130&h=130&m=6', w: 130, h: 130 },
                    lg: { q: 'w=130&h=130&m=6', w: 130, h: 130 },
                    xl: { q: 'w=130&h=130&m=6', w: 130, h: 130 }
                },
                lazyload: true,
                cropFocalRegion: true
            }
        };
        allModuleProps.className = 'className';
        allModuleProps.resources = mockResources;
        allModuleProps.state = {
            rating: 4,
            reviewTitle: 'ffff',
            reviewText: 'wwwwwwwwwwwwwwwwwwwwwww',
            isReviewModalOpen: false,
            hasReviewError: false
        };
        allModuleProps.moduleProps = {
            moduleProps,
            className: 'className'
        };
        allModuleProps.data = updateReviewMockData;
        allModuleProps.callbacks = callBacks;
        allModuleProps.signInMessage = <div>{signInMessageText}</div>;
        allModuleProps.signInButton = <div>{signInButtonText}</div>;
        allModuleProps.modalToggle = <div>{modalToggleText}</div>;
        allModuleProps.reviewModal = reviewModal;
        allModuleProps.heading = <h1>{headingText}</h1>;

        const component = render(<WriteReviewView {...allModuleProps} />);

        expect(component).toMatchSnapshot();
    });
});
