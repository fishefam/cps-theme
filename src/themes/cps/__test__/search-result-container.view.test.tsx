/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { buildMockModuleProps, ICoreContext } from '@msdyn365-commerce/core';
import { AsyncResult, FeatureState, ProductSearchResult, SimpleProduct } from '@msdyn365-commerce/retail-proxy';
import { wrapInResolvedAsyncResult } from '@msdyn365-commerce-modules/retail-actions';
import {
    ICategoryHierarchyViewProps,
    IRefineMenuViewProps,
    ISearchResultContainerViewProps,
    ISearchResultModalViewProps,
    ISearchResultTitle,
    ISortByViewProps,
    ITitleViewProps
} from '@msdyn365-commerce-modules/search-result-container';
import { mount, render } from 'enzyme';
import * as React from 'react';

import {
    ISearchResultContainerConfig,
    ISearchResultContainerProps,
    ISearchResultContainerResources
} from '../definition-extensions/search-result-container.ext.props.autogenerated';
import SearchResultContainerView, { configureStickyFilter } from '../views/search-result-container.view';

const mockContext: ICoreContext = {
    request: {
        urlTokens: {
            pageType: 'Category'
        },

        // @ts-expect-error partial mock
        apiSettings: {
            channelId: 68719478279,
            baseUrl: 'http://xyz.com'
        },
        query: {
            q: 'Sample title',
            inputRange: 'input',
            sorting: '{"name":1}'
        },
        gridSettings: {
            xs: { w: 100, h: 0 },

            sm: { w: 0, h: 0 },

            md: { w: 0, h: 0 },

            lg: { w: 0, h: 0 },

            xl: { w: 0, h: 0 }
        }
    },
    app: {
        config: {
            breadcrumbType: 'categoryAndBack',
            hideRating: true,
            enableStickyHeader: true
        }
    },

    actionContext: {
        requestContext: {
            // @ts-expect-error partial mock
            user: {
                isAuthenticated: true
            }
        }
    }
};

const mockProducts: ProductSearchResult[] = [
    {
        Price: 100,
        RecordId: 1234
    }
];
const mockProducts1: ProductSearchResult[] = [
    {
        Price: 100,
        RecordId: 1234,
        AttributeValues: []
    }
];

// @ts-expect-error partial moc
const mockData: ISearchResultContainerData = {
    listPageState: wrapInResolvedAsyncResult({
        activeFilters: [
            {
                RefinerRecordId: 68719478048,
                DataTypeValue: 5,
                LeftValueBoundString: 'Casual Shirts',
                RightValueBoundString: 'Casual Shirts',
                UnitText: '',
                RowNumber: 0,
                Count: 30,
                LeftValueBoundLocalizedString: '',
                RightValueBoundLocalizedString: '',
                ExtensionProperties: [],
                RefinerSourceValue: 2
            }
        ],
        activeProducts: [
            {
                ItemId: 92054,
                Name: 'Charcoal Trim Cardigan',
                Price: 90,
                PrimaryImageUrl: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/search?fileName=/Products.png',
                RecordId: 68719493003,
                TrackingId: 'null',
                TotalRatings: 0,
                Description: 'A charcoal trimmed grey cardigan made of wool.',
                BasePrice: 90,
                AttributeValues: [
                    {
                        RecordId: 1
                    }
                ],
                IsMasterProduct: true,
                MasterProductId: 68719493003,
                DefaultUnitOfMeasure: 'ea',
                ExtensionProperties: []
            },
            {
                ItemId: 92055,
                Name: 'Charcoal Trim Cardigan',
                Price: 90,
                PrimaryImageUrl: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/search?fileName=/Products.png',
                RecordId: 68719493004,
                TrackingId: 'null',
                TotalRatings: 0,
                Description: 'A charcoal trimmed grey cardigan made of wool.',
                BasePrice: 90,
                AttributeValues: [
                    {
                        RecordId: 1
                    }
                ],
                IsMasterProduct: true,
                MasterProductId: 68719493004,
                DefaultUnitOfMeasure: 'ea',
                ExtensionProperties: []
            }
        ],
        sortingCritera: {
            Columns: []
        },
        currentPageNumber: 0,
        totalProductCount: undefined,
        pageSize: 30,
        pageType: 'Category',
        featureProduct: 'null',
        productPrices: []
    }),
    categoryHierarchy: {
        result: [
            {
                RecordId: 68719478037,
                OfflineImage: 'null',
                Name: 'Men wear',
                ParentCategory: 68719478035,
                DisplayOrder: -1,
                Images: [
                    {
                        Uri: 'Categories/Men wear.png',
                        AltText: 'null',
                        IsDefault: false,
                        IsSelfHosted: false,
                        Priority: 0,
                        ExtensionProperties: []
                    }
                ],
                NameTranslations: [
                    {
                        Language: 'en-us',
                        Text: 'Men wear',
                        ExtensionProperties: []
                    },
                    {
                        Language: 'en-ca',
                        Text: 'Menswear - En-CA',
                        ExtensionProperties: []
                    },
                    {
                        Language: 'ar-ae',
                        Text: 'Menswear-AR-AE',
                        ExtensionProperties: []
                    }
                ],
                ExtensionProperties: [],
                NeutralizedName: 'Men wear',
                Slug: '/fabrikam-fashion-us/men-wear',
                Url: '/modern/fabrikam-fashion-us/men-wear/68719478037.c',
                Children: []
            }
        ],
        status: 'SUCCESS'
    },
    searchConfiguration: {
        result: [
            {
                key: 'Ranking-Desc',
                sortColumn: {
                    ColumnName: 'RANKING',
                    IsDescending: true
                }
            },
            {
                key: 'Price-Asc',
                sortColumn: {
                    ColumnName: 'PRICE',
                    IsDescending: false
                }
            },
            {
                key: 'Price-Desc',
                sortColumn: {
                    ColumnName: 'PRICE',
                    IsDescending: true
                }
            },
            {
                key: 'AverageRating-Asc',
                sortColumn: {
                    ColumnName: 'AVERAGERATING',
                    IsDescending: false
                }
            },
            {
                key: 'AverageRating-Desc',
                sortColumn: {
                    ColumnName: 'AVERAGERATING',
                    IsDescending: true
                }
            },
            {
                key: 'Name-Asc',
                sortColumn: {
                    ColumnName: 'NAME',
                    IsDescending: false
                }
            },
            {
                key: 'Name-Desc',
                sortColumn: {
                    ColumnName: 'NAME',
                    IsDescending: true
                }
            }
        ],
        status: 'SUCCESS'
    },
    refiners: {
        result: [
            {
                RecordId: 0,
                KeyName: 'Category',
                DataTypeValue: 5,
                RefinerTypeValue: 1,
                DisplayTemplateValue: 0,
                ExtensionProperties: [],
                SourceValue: 2,
                Values: [
                    {
                        RefinerRecordId: 68719478053,
                        DataTypeValue: 5,
                        LeftValueBoundString: 'MenShoes',
                        RightValueBoundString: 'MenShoes',
                        UnitText: '',
                        RowNumber: 0,
                        Count: 20,
                        LeftValueBoundLocalizedString: '',
                        RightValueBoundLocalizedString: '',
                        ExtensionProperties: [],
                        RefinerSourceValue: 2
                    }
                ],
                IsDimension: false
            }
        ],
        status: 'SUCCESS'
    },
    featureProduct: {
        status: 'SUCCESS',
        result: {
            RecordId: 68719478037,
            ProductTypeValue: 1,
            BasePrice: 1,
            Price: 1,
            AdjustedPrice: 1
        }
    } as AsyncResult<SimpleProduct>,
    products: ({
        status: 'SUCCESS',
        result: {
            channelInventoryConfigurationId: 1,
            count: 1,
            products: mockProducts
        }
    } as unknown) as AsyncResult<SimpleProduct>,
    featureState: AsyncResult.resolve([
        { Name: 'Dynamics.AX.Application.RetailSearchPriceRangeFeature', IsEnabled: false }
    ] as FeatureState[])
};

// @ts-expect-error partial moc
const mockData1: ISearchResultContainerData = {
    listPageState: wrapInResolvedAsyncResult({
        activeFilters: [
            {
                RefinerRecordId: 68719478048,
                DataTypeValue: 5,
                LeftValueBoundString: 'Casual Shirts',
                RightValueBoundString: 'Casual Shirts',
                UnitText: '',
                RowNumber: 0,
                Count: 30,
                LeftValueBoundLocalizedString: '',
                RightValueBoundLocalizedString: '',
                ExtensionProperties: [],
                RefinerSourceValue: 2
            }
        ],
        activeProducts: [
            {
                ItemId: 92054,
                Name: 'Charcoal Trim Cardigan',
                Price: 90,
                PrimaryImageUrl: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/search?fileName=/Products.png',
                RecordId: 68719493003,
                TrackingId: 'null',
                TotalRatings: 0,
                Description: 'A charcoal trimmed grey cardigan made of wool.',
                BasePrice: 90,
                AttributeValues: [
                    {
                        RecordId: 0
                    }
                ],
                IsMasterProduct: true,
                MasterProductId: 68719493003,
                DefaultUnitOfMeasure: 'ea',
                ExtensionProperties: []
            },
            {
                ItemId: 92055,
                Name: 'Charcoal Trim Cardigan',
                Price: 90,
                PrimaryImageUrl: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/search?fileName=/Products.png',
                RecordId: 68719493004,
                TrackingId: 'null',
                TotalRatings: 0,
                Description: 'A charcoal trimmed grey cardigan made of wool.',
                BasePrice: 90,
                AttributeValues: [
                    {
                        RecordId: 0
                    }
                ],
                IsMasterProduct: true,
                MasterProductId: 68719493004,
                DefaultUnitOfMeasure: 'ea',
                ExtensionProperties: []
            }
        ],
        sortingCritera: {
            Columns: []
        },
        currentPageNumber: 0,
        totalProductCount: undefined,
        pageSize: 30,
        pageType: 'Category',
        featureProduct: 'null',
        productPrices: []
    }),
    categoryHierarchy: {
        result: [
            {
                RecordId: 68719478037,
                OfflineImage: 'null',
                Name: 'Men wear',
                ParentCategory: 68719478035,
                DisplayOrder: -1,
                Images: [
                    {
                        Uri: 'Categories/Men wear.png',
                        AltText: 'null',
                        IsDefault: false,
                        IsSelfHosted: false,
                        Priority: 0,
                        ExtensionProperties: []
                    }
                ],
                NameTranslations: [
                    {
                        Language: 'en-us',
                        Text: 'Men wear',
                        ExtensionProperties: []
                    },
                    {
                        Language: 'en-ca',
                        Text: 'Menswear - En-CA',
                        ExtensionProperties: []
                    },
                    {
                        Language: 'ar-ae',
                        Text: 'Menswear-AR-AE',
                        ExtensionProperties: []
                    }
                ],
                ExtensionProperties: [],
                NeutralizedName: 'Men wear',
                Slug: '/fabrikam-fashion-us/men-wear',
                Url: '/modern/fabrikam-fashion-us/men-wear/68719478037.c',
                Children: []
            }
        ],
        status: 'SUCCESS'
    },
    searchConfiguration: {
        result: [
            {
                key: 'Ranking-Desc',
                sortColumn: {
                    ColumnName: 'RANKING',
                    IsDescending: true
                }
            },
            {
                key: 'Price-Asc',
                sortColumn: {
                    ColumnName: 'PRICE',
                    IsDescending: false
                }
            },
            {
                key: 'Price-Desc',
                sortColumn: {
                    ColumnName: 'PRICE',
                    IsDescending: true
                }
            },
            {
                key: 'AverageRating-Asc',
                sortColumn: {
                    ColumnName: 'AVERAGERATING',
                    IsDescending: false
                }
            },
            {
                key: 'AverageRating-Desc',
                sortColumn: {
                    ColumnName: 'AVERAGERATING',
                    IsDescending: true
                }
            },
            {
                key: 'Name-Asc',
                sortColumn: {
                    ColumnName: 'NAME',
                    IsDescending: false
                }
            },
            {
                key: 'Name-Desc',
                sortColumn: {
                    ColumnName: 'NAME',
                    IsDescending: true
                }
            }
        ],
        status: 'SUCCESS'
    },
    featureProduct: {
        status: 'SUCCESS',
        result: {
            RecordId: 68719478037,
            ProductTypeValue: 1,
            BasePrice: 1,
            Price: 1,
            AdjustedPrice: 1
        }
    } as AsyncResult<SimpleProduct>,
    products: ({
        status: 'SUCCESS'
    } as unknown) as AsyncResult<SimpleProduct>,
    featureState: {
        result: [{ Name: 'Dynamics.AX.Application.RetailSearchPriceRangeFeature' }]
    } as FeatureState
};

// @ts-expect-error partial mock
const mockResource: ISearchResultContainerResources = {
    priceFree: 'priceFree',
    originalPriceText: 'originalPriceText',
    currentPriceText: 'string',
    ratingAriaLabel: 'string',
    filterText: 'filterText',
    doneText: 'done'
};

const mockConfig: ISearchResultContainerConfig = {
    itemsPerPage: 1,
    allowBackNavigation: true,
    imageSettings: undefined,
    disableHierarchy: true,
    includeAttributes: true,
    enableAffiliationBasedPricing: true,
    updateRefinerPanel: true,
    className: 'test',
    enableProdutDescription: true,
    useStickyFilter: true
};

const mockTitle: ITitleViewProps = {
    TitleContainer: { className: 'node-class-TitleContent' },
    title: {
        titlePrefix: <span />,
        titleText: <span />,
        titleCount: <span />
    }
};

const mockTitle1: ITitleViewProps = {
    TitleContainer: { className: 'node-class-TitleContent' },
    title: (undefined as unknown) as ISearchResultTitle
};

const mockTitle2: ITitleViewProps = {
    TitleContainer: { className: 'node-class-TitleContent' },
    title: (null as unknown) as ISearchResultTitle
};

const mockCategoryHierarchy: ICategoryHierarchyViewProps = {
    CategoryHierarchyContainer: { className: 'node-class' },
    categoryHierarchyList: [<span key={1} />, <span key={2} />],
    categoryHierarchySeparator: <div />
};

const mockCategoryHierarchy1: ICategoryHierarchyViewProps = {
    CategoryHierarchyContainer: { className: 'node-class' },
    categoryHierarchyList: [<span key={1} />],
    categoryHierarchySeparator: undefined
};

const mockCategoryHierarchy2: ICategoryHierarchyViewProps = {
    CategoryHierarchyContainer: { className: 'node-class' }
};

const mockRefineMenu: IRefineMenuViewProps = {
    RefineMenuContainer: { className: 'node-class' },
    RefinerSectionContainer: { className: 'node-class' },
    refiners: [<span key={1} />]
};

const mockRefineMenu1: IRefineMenuViewProps = {
    RefineMenuContainer: { className: 'node-class' },
    RefinerSectionContainer: { className: 'node-class' },
    refiners: undefined
};

const mockRefineMenu2: IRefineMenuViewProps = {
    RefineMenuContainer: { className: 'node-class' },
    RefinerSectionContainer: { className: 'node-class' }
};

const mockSortByOptions: ISortByViewProps = {
    SortingContainer: { className: 'node-class' },
    sortByDropDown: <div />
};

const mockSortByOptions1: ISortByViewProps = {
    SortingContainer: { className: 'node-class' },
    sortByDropDown: undefined
};

const mockSearchResultModal: ISearchResultModalViewProps = {
    modal: <div />,
    modalBody: <div />,
    modalFooter: <div />,
    modalHeader: <div />
};

const mockSlots = {
    quickview: [<div key={1} />],
    productComparisonButton: []
};

const mockSlots1 = {
    quickview: [],
    productComparisonButton: []
};

describe('Search result container tests - View', () => {
    it('renders correctly mobile -- with title', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu;
        allModuleProps.sortByOptions = mockSortByOptions;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.isMobile = true;
        allModuleProps.config.enableProdutDescription = true;
        allModuleProps.config.useStickyFilter = true;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = {
            productId: '68719493003',
            recommendation: 'test'
        };
        allModuleProps.slots = mockSlots;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        expect(component).toMatchSnapshot();
        const wrapper = mount(<SearchResultContainerView {...allModuleProps} />);
        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);

        const headerNode1 = document.createElement('DIV');
        headerNode1.className = 'header .lock-opaque';
        document.body.appendChild(headerNode1);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        wrapper.unmount();
    });
    it('renders correctly mobile -- without activePoducts', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;
        mockData.listPageState.result.activeProducts = [];
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu;
        allModuleProps.sortByOptions = mockSortByOptions;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.isMobile = true;
        allModuleProps.config.enableProdutDescription = true;
        allModuleProps.config.useStickyFilter = false;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = {
            productId: '68719493003',
            recommendation: 'test'
        };
        allModuleProps.slots = mockSlots;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);

        const headerNode = document.createElement('DIV');
        headerNode.className = 'header .default-container .lock-opaque';
        document.body.appendChild(headerNode);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        document.documentElement.scrollTop = 120;
        expect(component).toMatchSnapshot();
        const wrapper = mount(<SearchResultContainerView {...allModuleProps} />);

        wrapper.unmount();
    });

    it('renders correctly mobile -- without Slot', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData1,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy1;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu2;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.isMobile = true;
        allModuleProps.config.enableProdutDescription = true;
        allModuleProps.config.useStickyFilter = false;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = {
            productId: '68719493003',
            recommendation: 'test'
        };
        allModuleProps.slots = mockSlots1;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        document.documentElement.scrollTop = 20;
        expect(component).toMatchSnapshot();
        const wrapper = mount(<SearchResultContainerView {...allModuleProps} />);
        wrapper.unmount();
    });

    it('renders correctly mobile -- without category hirerachy', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData1,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle2;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy2;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu2;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.isMobile = true;
        allModuleProps.config.enableProdutDescription = true;
        allModuleProps.config.useStickyFilter = false;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = {
            productId: '68719493003',
            recommendation: 'test'
        };
        allModuleProps.slots = mockSlots1;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);

        const headerNode = document.createElement('DIV');
        headerNode.className = 'header .default-container .lock-opaque';
        document.body.appendChild(headerNode);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        document.documentElement.scrollTop = 120;
        expect(component).toMatchSnapshot();
        const wrapper = mount(<SearchResultContainerView {...allModuleProps} />);
        wrapper.unmount();
    });

    it('renders correctly --  mobile -- without title', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle1;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu1;
        allModuleProps.sortByOptions = mockSortByOptions1;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.isMobile = true;
        allModuleProps.config.enableProdutDescription = false;
        allModuleProps.config.useStickyFilter = false;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.similarLookProduct = <div />;
        allModuleProps.context.actionContext.requestContext.query = {
            productId: '68719493003',
            recommendation: 'test'
        };
        allModuleProps.slots = mockSlots;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        const headerNode1 = document.createElement('DIV');
        headerNode1.className = 'ms-header';
        document.body.appendChild(headerNode1);

        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);

        const headerNode = document.createElement('DIV');
        headerNode.className = 'header .default-container .lock-opaque';
        document.body.appendChild(headerNode);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        document.documentElement.scrollTop = 120;
        expect(component).toMatchSnapshot();

        configureStickyFilter(false, true);
    });

    it('renders correctly -- Desktop -- with query', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu;
        allModuleProps.sortByOptions = mockSortByOptions;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.config.enableProdutDescription = true;
        allModuleProps.config.useStickyFilter = true;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = {
            productId: '68719493003',
            recommendation: 'test'
        };
        allModuleProps.slots = mockSlots;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);

        const headerNode = document.createElement('DIV');
        headerNode.className = 'header .default-container .lock-opaque';
        document.body.appendChild(headerNode);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        document.documentElement.scrollTop = 120;
        expect(component).toMatchSnapshot();
        const wrapper = mount(<SearchResultContainerView {...allModuleProps} />);
        const buttonWrapper = wrapper.find('button');
        buttonWrapper.at(0).simulate('click');
        configureStickyFilter(true, true);
        wrapper.unmount();
    });

    it('renders correctly -- Desktop -- without query', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;

        mockData.products = ({
            status: 'SUCCESS',
            result: {
                count: 1,
                products: mockProducts
            }
        } as unknown) as AsyncResult<SimpleProduct>;

        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle1;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.refineMenu = mockRefineMenu1;
        allModuleProps.sortByOptions = mockSortByOptions;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.config.enableProdutDescription = false;
        allModuleProps.config.useStickyFilter = true;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = undefined;
        allModuleProps.similarLookProduct = <div />;
        allModuleProps.slots = mockSlots;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);
        const headerNode1 = document.createElement('DIV');
        headerNode1.className = 'header .default-container';
        document.body.appendChild(headerNode1);

        const headerNode = document.createElement('DIV');
        headerNode.className = 'header .lock-opaque';
        document.body.appendChild(headerNode);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        document.documentElement.scrollTop = 20;
        expect(component).toMatchSnapshot();
    });
    it('renders correctly -- Desktop -- div lock', () => {
        const moduleProps: ISearchResultContainerProps<{}> = buildMockModuleProps({}, {}) as ISearchResultContainerProps<{}>;

        mockData.products = ({
            status: 'SUCCESS',
            result: {
                channelInventoryConfigurationId: 1,
                count: 1,
                products: mockProducts1
            }
        } as unknown) as AsyncResult<SimpleProduct>;
        mockData.listPageState.result = {};
        const allModuleProps: ISearchResultContainerViewProps & ISearchResultContainerProps<{}> = buildMockModuleProps(
            mockData,
            {},
            mockConfig,
            mockContext
        ) as ISearchResultContainerViewProps & ISearchResultContainerProps<{}>;

        allModuleProps.products = <div />;
        allModuleProps.className = 'test Class';
        allModuleProps.SearchResultContainer = { moduleProps, className: 'module-class' };
        allModuleProps.resources = mockResource;
        allModuleProps.TitleViewProps = mockTitle1;
        allModuleProps.categoryHierarchy = mockCategoryHierarchy;
        allModuleProps.ProductsContainer = {
            className: 'test'
        };
        allModuleProps.ProductSectionContainer = {
            className: 'test'
        };
        allModuleProps.sortByOptions = mockSortByOptions;
        allModuleProps.choiceSummary = <div />;
        allModuleProps.modalToggle = <div />;
        allModuleProps.searchResultModal = mockSearchResultModal;
        allModuleProps.config.enableProdutDescription = false;
        allModuleProps.config.useStickyFilter = true;
        allModuleProps.CategoryNavContainer = { className: 'test' };
        allModuleProps.RefineAndProductSectionContainer = { className: 'test' };
        allModuleProps.errorMessage = <div />;
        allModuleProps.FeatureSearchContainer = { className: 'test' };
        allModuleProps.context.actionContext.requestContext.query = undefined;
        allModuleProps.similarLookProduct = <div />;
        allModuleProps.slots = mockSlots;
        allModuleProps.isMobile = false;
        const component = render(<SearchResultContainerView {...allModuleProps} />);
        const promoBannerNode = document.createElement('DIV');
        promoBannerNode.className = 'ms-promo-banner';
        document.body.appendChild(promoBannerNode);

        const headerNode = document.createElement('DIV');
        headerNode.className = 'header .lock-opaque';
        document.body.appendChild(headerNode);

        const headerLogoNode = document.createElement('DIV');
        headerLogoNode.className = 'ms-header__logo';
        document.body.appendChild(headerLogoNode);
        document.documentElement.scrollTop = 20;
        expect(component).toMatchSnapshot();
    });
});