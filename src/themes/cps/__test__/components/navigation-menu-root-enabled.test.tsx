/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { buildMockModuleProps, IImageData, ILinkData } from '@msdyn365-commerce/core';
import { INavigationMenuViewProps } from '@msdyn365-commerce-modules/navigation-menu';
import { mount, render } from 'enzyme';
import * as React from 'react';

import {
    ICategoryPromotionalContentData,
    INavigationMenuConfig,
    INavigationMenuProps,
    INavigationMenuResources
} from '../../definition-extensions/navigation-menu.ext.props.autogenerated';
import { NavigationMenuRootEnabled } from '../../views/components/navigation-menu-root-enabled';

/**
 * NavMenuConstants enum.
 */
enum NavMenuConstants {
    zero = 0,
    one = 1,
    two = 2,
    three = 3,
    four = 4,
    escapeKey = 27,
    rootMenu = 1
}
const mockConfig: INavigationMenuConfig = {
    navigationMenuSource: undefined,
    cmsNavItems: [
        {
            linkText: 'Participate',
            subMenus: [
                {
                    linkText: 'Contact',
                    linkUrl: {
                        destinationUrl: '/modern/',
                        type: 'internalLink'
                    },
                    ariaLabel: 'Contact us',
                    subMenus: [
                        {
                            linkText: 'Support',
                            linkUrl: {
                                destinationUrl: '/modern/',
                                type: 'internalLink'
                            },
                            ariaLabel: 'Support'
                        },
                        {
                            linkText: 'Customer Care',
                            linkUrl: {
                                destinationUrl: '/modern/',
                                type: 'internalLink'
                            },
                            ariaLabel: 'Customer Care'
                        }
                    ]
                },
                {
                    linkText: 'Loyalty program',
                    linkUrl: {
                        destinationUrl: '/modern/',
                        type: 'internalLink'
                    }
                }
            ]
        },
        {
            linkText: 'Initiative',
            image: {
                src: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/cms/api/jswzvrwzrf/imageFileData/LAkOO?ver=63ed',
                altText: 'yoga',
                width: 344,
                height: 450,
                title: 'yoga_bg-Adventureworks.png',
                imageSettings: {
                    quality: 80,
                    disableLazyLoad: false,
                    lazyload: true,
                    viewports: {
                        xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                        lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                        xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
                    }
                }
            },
            subMenus: [
                {
                    linkText: 'Promote',
                    linkUrl: {
                        destinationUrl: '/modern/',
                        type: 'internalLink'
                    },
                    image: {
                        src: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/cms/api/jswzvrwzrf/imageFileData/LAkPa?ver=fac0',
                        altText: 'Home',
                        width: 203,
                        height: 203,
                        title: '',
                        imageSettings: {
                            quality: 80,
                            disableLazyLoad: false,
                            lazyload: true,
                            viewports: {
                                xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                                lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                                xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
                            }
                        }
                    }
                }
            ]
        }
    ],
    enableMultilevelMenu: true,
    enabletopMenu: true,
    menuLevelSupport: 4,
    rootMenuNavigation: 'Shop',
    displayCategoryImage: true,
    displayPromotionalImage: true,
    categoryImageSettings: {
        quality: 80,
        disableLazyLoad: true,
        lazyload: true,
        viewports: {
            xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
            lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
            xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
        }
    }
};

const mockResources: INavigationMenuResources = {
    menuAriaLabel: 'string',
    backButtonAriaLabel: 'string',
    allCategoryMenuText: 'string',
    hamburgerAriaLabel: 'string'
};

interface IMenuItemData {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- used in test file only
    id?: number;
    linkText?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention -- linkURL used in test file only
    linkURL?: string;
    imageSource?: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention -- used in test file only
    imageDestinationURL?: string;
    subMenu?: IMenuItemData[];
    promotionalContent?: ICategoryPromotionalContentData[];
    menuSource?: string;
}
const mockFunction = jest.fn();

const linkData: ILinkData = { destinationUrl: 'https://xyz.com' };
const imageData: IImageData = {
    src: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/cms/api/jswzvrwzrf/imageFileData/LAkPa?ver=fac0',
    altText: 'Home',
    width: 203,
    height: 203,
    title: '',
    imageSettings: {
        quality: 80,
        disableLazyLoad: false,
        lazyload: true,
        viewports: {
            xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
            lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
            xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
        }
    }
};
const promo: ICategoryPromotionalContentData = { categoryName: '123123', text: 'Category 1', linkUrl: linkData, image: imageData };
const moduleProps = buildMockModuleProps({}, {}, mockConfig) as INavigationMenuViewProps;

const menuData: IMenuItemData = {
    id: 4343106098,
    linkText: 'main-menu-mock',
    linkURL: 'https://xyz.com',
    imageSource: 'abc/xyz.png',
    subMenu: [
        {
            id: 4295341244,
            linkText: 'sub-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            promotionalContent: [promo],
            subMenu: [
                {
                    id: 4219573105,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                },
                {
                    id: 8696202733,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                }
            ]
        }
    ]
};

const mockProps: INavigationMenuViewProps & INavigationMenuProps<{}> = {
    ...moduleProps,
    className: 'Mock-class',
    id: 'mock-test',
    menuItemData: [menuData],
    isMobileView: true,
    showCategoryImage: true,
    showPromotionalContent: true,
    Navigation: {
        moduleProps,
        className: 'ms-nav',
        tag: 'nav',
        role: 'navigation',
        'aria-label': 'Menu'
    },
    MenuList: {
        className: 'ms-nav__list',
        tag: 'ul'
    },
    ListItem: {
        className: 'ms-nav__list__item',
        tag: 'li'
    },
    DivContainer: {
        tag: 'div',
        className: 'ms-nav__feature',
        role: 'menu'
    },
    ImageDivContainer: {
        tag: 'div',
        className: 'category-image',
        role: 'menu'
    },
    Link: {
        tag: 'a',
        className: 'ms-nav__list__item__link',
        onMouseEnter: mockFunction,
        onMouseLeave: mockFunction,
        onMouseOver: mockFunction
    },
    Button: {
        className: 'ms-nav__list__item__button',
        tag: 'button',
        onClick: mockFunction
    },
    ImageContainer: {
        className: 'ms-nav__list__item__image'
    },
    Span: {
        className: 'ms-nav__list__item__span',
        tag: 'span'
    },
    MobileDescriptionContainer: {
        className: 'ms-nav__list__mobile__container'
    },
    MobileBackButton: {
        className: 'ms-nav__list__mobile__container__button',
        tag: 'button',
        onClick: mockFunction
    },
    MobileDescriptionLabel: {
        className: 'ms-nav__list__mobile__container__span',
        tag: 'span'
    },
    resources: mockResources,
    config: {
        navigationMenuSource: undefined,
        cmsNavItems: [
            {
                linkText: 'Participate',
                subMenus: [
                    {
                        linkText: 'Contact',
                        linkUrl: {
                            destinationUrl: '/modern/',
                            type: 'internalLink'
                        },
                        ariaLabel: 'Contact us',
                        subMenus: [
                            {
                                linkText: 'Support',
                                linkUrl: {
                                    destinationUrl: '/modern/',
                                    type: 'internalLink'
                                },
                                ariaLabel: 'Support'
                            },
                            {
                                linkText: 'Customer Care',
                                linkUrl: {
                                    destinationUrl: '/modern/',
                                    type: 'internalLink'
                                },
                                ariaLabel: 'Customer Care'
                            }
                        ]
                    },
                    {
                        linkText: 'Loyalty program',
                        linkUrl: {
                            destinationUrl: '/modern/',
                            type: 'internalLink'
                        }
                    }
                ]
            },
            {
                linkText: 'Initiative',
                image: {
                    src: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/cms/api/jswzvrwzrf/imageFileData/LAkOO?ver=63ed',
                    altText: 'yoga',
                    width: 344,
                    height: 450,
                    title: 'yoga_bg-Adventureworks.png',
                    imageSettings: {
                        quality: 80,
                        disableLazyLoad: false,
                        lazyload: true,
                        viewports: {
                            xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                            lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                            xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
                        }
                    }
                },
                subMenus: [
                    {
                        linkText: 'Promote',
                        linkUrl: {
                            destinationUrl: '/modern/',
                            type: 'internalLink'
                        },
                        image: {
                            src: 'https://cms-ppe-imageresizer-mr.trafficmanager.net/cms/api/jswzvrwzrf/imageFileData/LAkPa?ver=fac0',
                            altText: 'Home',
                            width: 203,
                            height: 203,
                            title: '',
                            imageSettings: {
                                quality: 80,
                                disableLazyLoad: false,
                                lazyload: true,
                                viewports: {
                                    xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                                    lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                                    xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
                                }
                            }
                        }
                    }
                ]
            }
        ],
        enableMultilevelMenu: true,
        enabletopMenu: true,
        menuLevelSupport: 4,
        rootMenuNavigation: 'Shop',
        displayCategoryImage: true,
        displayPromotionalImage: true,
        categoryImageSettings: {
            quality: 80,
            disableLazyLoad: true,
            lazyload: true,
            viewports: {
                xs: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                lg: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' },
                xl: { w: 300, h: 350, q: 'w=300&h=350&q=80&m=6&f=jpg' }
            }
        }
    }
};

describe('Navigation Menu Unit Test', () => {
    it('View mount correctly', () => {
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);
        const instance = wrapper.instance() as NavigationMenuRootEnabled;
        const button = wrapper.find('button');
        expect(button).toBeDefined();
        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 1 });

        // @ts-expect-error
        expect(instance._renderDisplay()).toBeDefined();
        wrapper.setProps({ isMobileView: false });
        expect(button).toBeDefined();
        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.unmount();
    });

    it('View renders correctly submenu', () => {
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);
        const instance = wrapper.instance() as NavigationMenuRootEnabled;
        wrapper.setState({ activeMenu: 11 });

        // @ts-expect-error
        expect(instance._renderDisplay()).toBeDefined();
    });

    it('View renders correctly with submenu data', () => {
        const menuDatawithlink: IMenuItemData = {
            id: 9877154993,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            subMenu: [
                {
                    id: 1001889529,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    subMenu: [
                        {
                            id: 3018979602,
                            linkText: 'sub-menu-mock',
                            linkURL: 'https://xyz.com',
                            subMenu: [
                                {
                                    id: 8734836249,
                                    linkText: 'sub-menu-mock',
                                    linkURL: 'https://xyz.com'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 3233923627,

            // LinkText: 'main-menu-mock',
            subMenu: [
                {
                    id: 2059971912,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    subMenu: [
                        {
                            id: 311419087,
                            linkText: 'sub-menu-mock',
                            linkURL: 'https://xyz.com',
                            subMenu: [
                                {
                                    id: 767996058,
                                    linkText: 'sub-menu-mock',
                                    linkURL: 'https://xyz.com'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 7565618795,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com'
        };

        const menuDataNoSubMenu: IMenuItemData = {
            id: 1,

            // LinkText: 'main-menu-mock',
            // linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: undefined,
            promotionalContent: [promo]
        };
        mockProps.isMobileView = false;
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);
        const instance = wrapper.instance() as NavigationMenuRootEnabled;

        wrapper.setState({ showImage: true, activeMenu: 2, isOnlyMobile: true });

        expect(wrapper.state('activeMenu')).toBe(2);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu, menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
        mockProps.isMobileView = true;

        // // @ts-expect-error
        // expect(instance._updateCategoryImage ('abc/xyz.png', menuDataNoSubMenu)).toBeDefined();

        // @ts-expect-error
        expect(instance._createMenuItemList(menuDatawithlink)).toBeDefined();

        // @ts-expect-error
        expect(instance._createMenuItemList(menuDataNoSubMenu)).toBeDefined();

        // @ts-expect-error
        expect(instance._createMenuItemList(menuDatawithoutlink)).toBeDefined();

        menuDatawithoutlink.linkURL = '';

        // @ts-expect-error
        expect(instance._createMenuItemList(menuDatawithoutlink)).toBeDefined();

        // @ts-expect-error
        expect(instance.getMenuItem(menuData, 2)).toBeDefined();
        wrapper.setProps(NavMenuConstants.two);

        // @ts-expect-error
        expect(instance.getMenuItem(menuDatawithlink, 2)).toBeDefined();
        wrapper.setProps(NavMenuConstants.rootMenu);

        // @ts-expect-error
        expect(instance.getMenuItem(menuDatawithoutlink, 2)).toBeDefined();
        wrapper.setProps(NavMenuConstants.rootMenu);

        // @ts-expect-error
        expect(instance._getFromSubMenu(menuDataNoSubMenu)).toBeDefined();

        // @ts-expect-error
        expect(instance._getFromSubMenu(undefined)).toBeDefined();

        wrapper.setState({ activeMenu: 4295341244 });

        // @ts-expect-error
        expect(instance._getFromSubMenu(menuData)).toBeDefined();

        // @ts-expect-error
        expect(instance._renderLinkMenuItem(menuDatawithlink, 1)).toBeDefined();

        // @ts-expect-error
        expect(instance._renderSpanMenuItem(menuData, 1)).toBeDefined();

        // @ts-expect-error
        expect(instance._renderDrawerLink(menuDatawithoutlink)).toBeDefined();

        // @ts-expect-error
        expect(instance._renderDrawerLink(menuData)).toBeDefined();

        menuDatawithoutlink.linkURL = ' ';

        // @ts-expect-error
        expect(instance._renderDrawerLink(menuDatawithoutlink)).toBeDefined();

        // @ts-expect-error
        expect(instance._renderDisplay()).toBeDefined();

        // // @ts-expect-error
        // expect(instance._handleGoBack()).toBeDefined();

        wrapper.setState({ isDrawerOpen: true, desktopCategoryId: 1 });

        // @ts-expect-error
        expect(instance._renderSubMenuDrawer(menuDatawithlink)).toBeDefined();
        const button = wrapper.find('button');
        button.at(0).simulate('click');
    });

    it('View renders correctly with menu data', () => {
        const menuDatawithlink: IMenuItemData = {
            id: 2172719151,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            subMenu: [
                {
                    id: 8297433613,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    subMenu: [
                        {
                            id: 6142947735,
                            linkText: 'sub-menu-mock',
                            linkURL: 'https://xyz.com',
                            subMenu: [
                                {
                                    id: 6789871823,
                                    linkText: 'sub-menu-mock',
                                    linkURL: 'https://xyz.com'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 77183633962,
            linkText: 'main-menu-mock',
            subMenu: [
                {
                    id: 3798111725,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    subMenu: [
                        {
                            id: 1277338875,
                            linkText: 'sub-menu-mock',
                            linkURL: 'https://xyz.com',
                            subMenu: [
                                {
                                    id: 5587196932,
                                    linkText: 'sub-menu-mock',
                                    linkURL: 'https://xyz.com'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 1297246499,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com'
        };
        mockProps.isMobileView = false;
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);
        const instance = wrapper.instance() as NavigationMenuRootEnabled;

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithlink] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        // @ts-expect-error
        expect(instance._renderDisplay()).toBeDefined();

        wrapper.setProps({ menuItemData: [] });

        expect(wrapper.state('activeMenu')).toBe(4343106098);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
        mockProps.isMobileView = true;
    });

    it('View renders correctly with menu data and category image', () => {
        const menuDatawithimage: IMenuItemData = {
            id: 6157952619,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 8852675569,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                }
            ]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 7236169934,
            linkText: 'main-menu-mock',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 3885746345,
                    linkText: 'sub-menu-mock',
                    imageSource: 'abc/xyz.png'
                }
            ]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 3347795449,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        mockProps.isMobileView = false;
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        button.at(0).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithimage] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        expect(wrapper.state('activeMenu')).toBe(4343106098);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
        mockProps.isMobileView = true;
    });

    it('View renders correctly with menu data and promotional content', () => {
        const menuDatawithlink: IMenuItemData = {
            id: 3,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            subMenu: [
                {
                    id: 31,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    subMenu: [
                        {
                            id: 311,
                            linkText: 'sub-menu-mock',
                            linkURL: 'https://xyz.com',
                            subMenu: [
                                {
                                    id: 3111,
                                    linkText: 'sub-menu-mock',
                                    linkURL: 'https://xyz.com'
                                }
                            ]
                        }
                    ]
                }
            ]
        };
        const menuDataNoSubMenu: IMenuItemData = {
            id: 1,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: undefined,
            promotionalContent: [promo]
        };

        const menuDatawithimage: IMenuItemData = {
            id: 5143179988,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 7882368286,
                    linkText: 'sub-menu-mock',
                    linkURL: 'https://xyz.com',
                    imageSource: 'abc/xyz.png'
                }
            ],
            promotionalContent: [promo]
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 8281186743,
            linkText: 'main-menu-mock',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 8557431441,
                    linkText: 'sub-menu-mock',
                    imageSource: 'abc/xyz.png'
                }
            ],
            promotionalContent: [promo]
        };
        const menuDatawithsubMenu: IMenuItemData = {
            id: 8439796119,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };

        mockProps.isMobileView = false;
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        const instance: NavigationMenuRootEnabled = wrapper.instance() as NavigationMenuRootEnabled;

        // @ts-expect-error private function
        instance._renderPromotionalLink('link1', 'https://xyz.com');

        // @ts-expect-error private function
        instance._customUpdateViewport();

        // @ts-expect-error private function
        instance._closeNavMenu();

        // @ts-expect-error private function
        instance._handleClickOutside({ target: null });
        button.at(0).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithimage] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        expect(wrapper.state('activeMenu')).toBe(4343106098);
        wrapper.setProps({ menuItemData: [menuDatawithsubMenu] });
        wrapper.setProps({ isMobileView: false });
        mockProps.isMobileView = true;

        wrapper.setState({ isOnlyMobile: true });

        // @ts-expect-error
        expect(instance._renderCollapseMenu()).toBeDefined();

        // @ts-expect-error
        expect(instance._renderSubMenu([menuDatawithlink], 1, true)).toBeDefined();

        // @ts-expect-error
        expect(instance._renderSubMenu([menuDataNoSubMenu], 1, true)).toBeDefined();
    });

    it('View renders correctly without submenu', () => {
        const menuDatawithimage: IMenuItemData = {
            id: 6956564383,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        const menuDatawithoutlink: IMenuItemData = {
            id: 1926278382,
            linkText: 'main-menu-mock',
            imageSource: 'abc/xyz.png'
        };
        const menuDatawithoutsubMenu: IMenuItemData = {
            id: 2157284323,
            linkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png'
        };
        mockProps.isMobileView = false;
        const wrapper = mount(<NavigationMenuRootEnabled navProps={mockProps} />);

        const button = wrapper.find('button');
        wrapper.setState({ showImage: true, activeMenu: 1 });
        button.at(0).simulate('click');
        wrapper.setProps({ isMobileView: true });

        button.at(0).simulate('click');
        button.at(1).simulate('click');
        wrapper.setState({ activeMenu: 10 });

        wrapper.setProps({ menuItemData: [menuDatawithimage] });
        wrapper.setProps({ menuItemData: [menuDatawithoutlink] });
        button.at(0).simulate('click');
        button.at(1).simulate('click');

        wrapper.setProps({ menuItemData: [] });

        wrapper.setProps({ menuItemData: [menuDatawithoutsubMenu] });
        wrapper.setProps({ isMobileView: false });
        expect(wrapper).toMatchSnapshot();
        mockProps.isMobileView = true;
    });

    it('View renders correctly', () => {
        const menuDataWitoutLinkText: IMenuItemData = {
            id: 1,

            // LinkText: 'main-menu-mock',
            linkURL: 'https://xyz.com',
            imageSource: 'abc/xyz.png',
            subMenu: [
                {
                    id: 11,
                    promotionalContent: [],
                    subMenu: []
                }
            ]
        };

        mockProps.menuItemData = [menuDataWitoutLinkText];
        mockProps.config.enableMultilevelMenu = undefined;
        mockProps.config.menuLevelSupport = undefined;
        const component = render(<NavigationMenuRootEnabled navProps={mockProps} />);
        expect(component).toMatchSnapshot();
    });
});
