/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { AddToWishlistComponent, IWishlistActionErrorResult } from '@msdyn365-commerce/components';
import { format, ItemAvailability, SimpleProduct } from '@msdyn365-commerce/retail-proxy';
import { IStoreInfo } from '@msdyn365-commerce-modules/bopis-utilities';
import {
    getConfigureErrors,
    IBuyboxAddToCartViewProps,
    IBuyboxCallbacks,
    IBuyboxCommonResources,
    IBuyboxData,
    IBuyboxFindInStoreViewProps,
    IBuyboxKeyInPriceViewProps,
    IBuyboxProductConfigureDropdownViewProps,
    IBuyboxProductConfigureViewProps,
    IBuyboxProductQuantityViewProps,
    IBuyboxResources as IBuyboxExtentionResources,
    IBuyboxShopSimilarLookViewProps,
    IBuyboxState,
    IBuyboxViewProps
} from '@msdyn365-commerce-modules/buybox';
import {
    ArrayExtensions,
    getFullAvailableInventoryNearby,
    GetFullAvailableInventoryNearbyInput,
    IFullOrgUnitAvailability
} from '@msdyn365-commerce-modules/retail-actions';
import { IncrementalQuantity, INodeProps, ITelemetryContent, Module, Node } from '@msdyn365-commerce-modules/utilities';
import { reaction } from 'mobx';
import * as React from 'react';

import { IBuyboxProps as IBuyboxExtentionProps, IBuyboxProps } from '../definition-extensions/buybox.ext.props.autogenerated';
import { renderAddToOrderTemplateButton } from './components/buybox-add-to-order-template';

/**
 * BuyBoxConstants enum.
 */
export enum BuyBoxConstants {
    zero = 0
}

/**
 * On Change function.
 * @param callbacks -Callbacks.
 * @returns Update quantity.
 */
const onChangeHandler = (callbacks: IBuyboxCallbacks) => (newValue: number): boolean => {
    if (callbacks.updateQuantity) {
        return callbacks.updateQuantity(newValue);
    }
    return true;
};

/**
 * RenderQuantity.
 * @param quantityComponent - QuantityComponent.
 * @param callbacks - Callbacks.
 * @param props - Props.
 * @param state - State.
 * @param extentionResources - ExtentionResources.
 * @param quantityLimitsMessages - QuantityLimitsMessages.
 * @param max - Max.
 * @param telemetryContent - TelemetryContent.
 * @param unitOfMeasure - Unit Of Measure.
 * @returns -- Returns.
 */
const renderQuantity = (
    quantityComponent: IBuyboxProductQuantityViewProps,
    callbacks: IBuyboxCallbacks,
    props: IBuyboxProps<IBuyboxData>,
    state: IBuyboxState,
    extentionResources: IBuyboxExtentionResources,
    quantityLimitsMessages: React.ReactNode,

    // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
    min: number | undefined,
    max: number | undefined,
    applyDefaultOrderSettings?: boolean,
    telemetryContent?: ITelemetryContent,
    unitOfMeasure?: React.ReactNode
): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
    const { ContainerProps, LabelContainerProps, heading, errors } = quantityComponent;

    const { resources } = props;

    const { quantity } = state;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>
                {heading}
                {errors}
            </Node>

            <IncrementalQuantity
                id='ms-buybox__product-quantity-input'
                min={min}
                max={max}
                applyDefaultOrderSettings={applyDefaultOrderSettings}
                currentCount={quantity}
                onChange={onChangeHandler(callbacks)}
                inputQuantityAriaLabel={resources.inputQuantityAriaLabel}
                decrementButtonAriaLabel={resources.decrementButtonAriaLabel}
                incrementButtonAriaLabel={resources.incrementButtonAriaLabel}
                minQuantityText={extentionResources.minQuantityText}
                maxQuantityText={extentionResources.maxQuantityText}
                telemetryContent={telemetryContent}
            />
            {unitOfMeasure}
            {quantityLimitsMessages}
        </Node>
    );
};

/**
 * Render key in price function.
 * @param keyInPrice - KeyInPrice.
 * @returns -- Returns.
 */
const renderKeyInPrice = (keyInPrice: IBuyboxKeyInPriceViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, input } = keyInPrice;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>{heading}</Node>
            {input}
        </Node>
    );
};

/**
 * RenderAddToCart.
 * @param addToCart - AddToCart.
 * @returns -- Returns.
 */
const renderAddToCart = (addToCart: IBuyboxAddToCartViewProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
    const { ContainerProps, errorBlock, button } = addToCart;

    return (
        <Node {...ContainerProps}>
            {errorBlock}
            {button}
        </Node>
    );
};

/**
 * RenderFindInStore.
 * @param findInStore - FindInStore.
 * @returns -- Returns.
 */
const renderFindInStore = (findInStore: IBuyboxFindInStoreViewProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
    const { ContainerProps, storeSelector, heading, description, errors, button, modal, productPickupOptionList } = findInStore;

    return (
        <Node {...ContainerProps}>
            {storeSelector}
            {heading}
            {productPickupOptionList}
            {description}
            {errors}
            {button}
            {modal}
        </Node>
    );
};

/**
 * RenderAddToOrderTemplate.
 * @param props - Buybox view props.
 * @param state - Buybox state.
 * @param callbacks - Buybox callbacks.
 * @returns -- Returns.
 */
const renderAddToOrderTemplate = (
    props: IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxData>,
    state: IBuyboxState,
    callbacks: IBuyboxCallbacks
): JSX.Element | null => {
    const product = props.data.product.result;
    if (!props.addToOrderTemplate || !product) {
        return null;
    }

    const orderTemplateButton = renderAddToOrderTemplateButton(props, state, callbacks, product);

    return (
        <Node {...props.addToOrderTemplate.ContainerProps}>
            {props.addToOrderTemplate.errorBlock}
            {orderTemplateButton}
        </Node>
    );
};

/**
 * Add to wishlist failed function.
 * @param callbacks -Buybox callbacks.
 * @param resources -Buybox resources.
 * @param product -Simple product.
 * @returns Update error state.
 */
const onAddToWishlistFailed = (callbacks: IBuyboxCallbacks, resources: IBuyboxCommonResources, product: SimpleProduct | undefined) => (
    result: IWishlistActionErrorResult
) => {
    callbacks.updateErrorState({
        errorHost: 'WISHLIST',
        configureErrors:
            result.status === 'MISSINGDIMENSION' ? getConfigureErrors(result.missingDimensions, resources, product?.IsGiftCard) : {}
    });
};

/**
 * RenderAddToWishlist.
 * @param props - Buybox view props.
 * @param state - Buybox state.
 * @param callbacks - Buybox callbacks.
 * @param product - Product data.
 * @returns -- Returns.
 */
const renderAddtoWishlistButton = (
    props: IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxData>,
    state: IBuyboxState,
    callbacks: IBuyboxCallbacks,
    product: SimpleProduct
): React.ReactNode => {
    const { context, resources } = props;
    const wishlists = props.data.wishlists.result;
    const isShowWishlitButtonText = true;
    return (
        <AddToWishlistComponent
            className='msc-add-to-cart-extra-actions'
            addToWishlistButtonText={resources.addToWishlistButtonText}
            removeFromWishlistButtonText={resources.removeFromWishlistButtonText}
            addToWishlistMessage={resources.addToWishlistMessage}
            removedFromWishlistMessage={resources.removedFromWishlistMessage}
            addItemToWishlistError={resources.addItemToWishlistError}
            removeItemFromWishlistError={resources.removeItemFromWishlistError}
            nameOfWishlist={resources.nameOfWishlist}
            data={{ product, wishlists }}
            context={context}
            ariaRole='button'
            id={props.id}
            typeName={props.typeName}
            onError={onAddToWishlistFailed(callbacks, resources, product)}
            getSelectedProduct={state.selectedProduct}
            showButtonText={isShowWishlitButtonText}
            showButtonTooltip={false}
        />
    );
};

/**
 * RenderAddToWishlist.
 * @param props - Buybox viewprops.
 * @param state - Buybox state.
 * @param callbacks - Buybox callbacks.
 * @returns -- Returns.
 */
const renderAddToWishlist = (
    props: IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxData>,
    state: IBuyboxState,
    callbacks: IBuyboxCallbacks
): JSX.Element | null => {
    const product = props.data.product.result;
    if (!props.addToWishlist || !product) {
        return null;
    }

    if (!props.config.enableWishlist) {
        return null;
    }

    const wishlistButton = renderAddtoWishlistButton(props, state, callbacks, product);
    return (
        <Node {...props.addToWishlist.ContainerProps}>
            {props.addToWishlist.errorBlock}
            {wishlistButton}
        </Node>
    );
};

/**
 * RRenderShopSimilarItem.
 * @param shopSimilarItem - ShopSimilarItem.
 * @returns -- Returns.
 */
const renderShopSimilarItem = (shopSimilarItem: IBuyboxShopSimilarLookViewProps): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
    const { ContainerProps, errors, input } = shopSimilarItem;

    return (
        <Node {...ContainerProps}>
            {errors}
            {input}
        </Node>
    );
};

/**
 * RenderSocialShare.
 * @param socialShare - Social share react node array.
 * @returns -- Returns.
 */
const _renderSocialShare = (socialShare: React.ReactNode[]): JSX.Element | undefined => {
    if (!socialShare || socialShare.length === 0) {
        return undefined;
    }

    return <>{socialShare[0]}</>;
};

/**
 * RenderConfigureDropdown.
 * @param dropdown - Buybox product configure dropdown view props.
 * @returns -- Returns JSX.Element.
 */
const renderConfigureDropdown = (dropdown: IBuyboxProductConfigureDropdownViewProps): JSX.Element => {
    const { ContainerProps, LabelContainerProps, heading, errors, select } = dropdown;

    return (
        <Node {...ContainerProps}>
            <Node {...LabelContainerProps}>{heading}</Node>
            {select}
            {errors}
        </Node>
    );
};

/**
 * RenderConfigure.
 * @param configure - Buybox product configure view props.
 * @returns -- Returns JSX.Element.
 */
const renderConfigure = (configure: IBuyboxProductConfigureViewProps): JSX.Element => {
    const { ContainerProps, dropdowns } = configure;

    return <Node {...ContainerProps}>{dropdowns.map(renderConfigureDropdown)}</Node>;
};

/**
 * BuyboxView.
 * @param props - Props.
 * @returns -- Returns.
 */
const BuyboxView: React.FC<IBuyboxViewProps & IBuyboxExtentionProps<IBuyboxData>> = props => {
    // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
    const {
        ModuleProps,
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
        MediaGalleryContainerProps,
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
        ProductInfoContainerProps,
        addToCart,
        addToOrderTemplate,
        addToWishlist,
        productComparisonButton,
        configure,
        description,
        findInStore,
        quantity,
        price,
        title,
        rating,
        inventoryLabel,
        shopSimilarLook,
        keyInPrice,
        shopSimilarDescription,
        min,
        // eslint-disable-next-line @typescript-eslint/naming-convention -- Dependency from Buybox.tsx file
        max,
        applyDefaultOrderSettings,
        unitOfMeasure,
        callbacks,
        state,
        resources,
        quantityLimitsMessages,
        telemetryContent,
        app: { config: appConfig },
        catalogs
    } = props;
    let skuText: string = props.resources.skuText;
    skuText += props.data.product.result?.ItemId;
    const preferredStoreInfo: IStoreInfo | undefined = props.data.storeSelectorStateManager.result?.preferredStore;
    const preferredStoreId = preferredStoreInfo?.StoreId ? preferredStoreInfo.StoreId : '';
    const preferredStoreName = preferredStoreInfo?.StoreName ? preferredStoreInfo.StoreName : '';

    const [availability, setAvailability] = React.useState<string>('');
    const [isStoreChange, setIsStoreChange] = React.useState<boolean>(false);

    /**
     * GetStockInventoryLabel.
     * @param availabilityWithHours - Stock availability with hours.
     * @returns -- Returns.
     */
    const getStockInventoryLabel = (availabilityWithHours: IFullOrgUnitAvailability | undefined): string | undefined => {
        if (availabilityWithHours && ArrayExtensions.hasElements(availabilityWithHours.ProductInventoryInformation)) {
            for (const productInventoryInformation of availabilityWithHours.ProductInventoryInformation) {
                if (
                    availabilityWithHours.OrgUnitAvailability?.OrgUnitLocation?.InventoryLocationId ===
                    productInventoryInformation.InventLocationId
                ) {
                    return productInventoryInformation.StockLevelLabel;
                }
            }
        }

        return undefined;
    };

    const getInventory = React.useCallback(async () => {
        const input = new GetFullAvailableInventoryNearbyInput(
            props.data.product.result?.RecordId,
            BuyBoxConstants.zero,
            BuyBoxConstants.zero,
            BuyBoxConstants.zero,
            BuyBoxConstants.zero,
            true
        );

        /**
         * IsProductInStock.
         * @param itemAvailabilities - Item availability array.
         * @returns -- Returns.
         */
        const isProductInStock = (itemAvailabilities: ItemAvailability[] | undefined): boolean => {
            if (!appConfig.enableStockCheck) {
                return true;
            }

            if (ArrayExtensions.hasElements(itemAvailabilities)) {
                return itemAvailabilities[BuyBoxConstants.zero].AvailableQuantity! > BuyBoxConstants.zero;
            }

            return false;
        };

        await getFullAvailableInventoryNearby(input, props.context.actionContext)
            .catch((error: Error) => {
                props.telemetry.error(error.message);
            })
            .then(response => {
                if (response && ArrayExtensions.hasElements(response)) {
                    const isPreferredStore = (value: IFullOrgUnitAvailability) =>
                        value.OrgUnitAvailability?.OrgUnitLocation?.OrgUnitNumber === preferredStoreId;
                    const filteredFullOrgUnitAvailability = response.filter(isPreferredStore);
                    const preferredStoreAvailability = ArrayExtensions.hasElements(filteredFullOrgUnitAvailability)
                        ? filteredFullOrgUnitAvailability[BuyBoxConstants.zero]
                        : undefined;
                    const stockStatusLabel: string | undefined = getStockInventoryLabel(preferredStoreAvailability);
                    const isInStock = isProductInStock(preferredStoreAvailability?.OrgUnitAvailability?.ItemAvailabilities);
                    const resourceLabel = isInStock ? props.resources.inStockText : props.resources.outOfStockText;
                    const stockText: string | undefined = stockStatusLabel ? stockStatusLabel : resourceLabel;
                    const preferredStoreAvailabilityText = `${format(
                        props.resources.availabilityAtPreferredStoreText,
                        preferredStoreName
                    )} ${stockText}`;
                    setAvailability(preferredStoreAvailabilityText);
                }
            });

        setIsStoreChange(false);
    }, [
        props.data.product.result?.RecordId,
        appConfig.enableStockCheck,
        preferredStoreId,
        preferredStoreName,
        props.context.actionContext,
        props.resources.availabilityAtPreferredStoreText,
        props.resources.inStockText,
        props.resources.outOfStockText,
        props.telemetry
    ]);

    React.useEffect(() => {
        if (props.config.displayStockAvailability) {
            getInventory().catch((error: Error) => {
                props.telemetry.error(error.message);
            });
        }
    }, [getInventory, isStoreChange, props.telemetry, props.config.displayStockAvailability]);

    reaction(
        () => props.data.storeSelectorStateManager.result?.selectedStoreLocationId,
        () => {
            setIsStoreChange(true);
        }
    );

    /**
     * RenderAvailabiltyAtPreferredStore.
     * @returns -- Returns.
     */
    const renderAvailabilityAtPreferredStore = (): JSX.Element | undefined => {
        const hasProductDimensions = ArrayExtensions.hasElements(props.data.product.result?.Dimensions);
        if (hasProductDimensions && props.data.product.result?.MasterProductId === undefined) {
            return undefined;
        }
        const containerProps: INodeProps = {
            className: 'ms-buybox__preferred-store-availability',
            tag: 'span'
        };

        return <Node {...containerProps}>{availability}</Node>;
    };
    return (
        <Module {...ModuleProps}>
            <Node {...MediaGalleryContainerProps}>{props.mediaGallery}</Node>
            <Node {...ProductInfoContainerProps}>
                {catalogs && catalogs[0].Name}
                {title}
                <Node className='msc-buybox__ratings-section'>
                    <div className='msc-buybox__ratings-section-sku-text'>{skuText}</div>
                    {rating}
                </Node>
                <Node className='msc-buybox__price-section'>
                    <div className='msc-buybox__price-section-text'>{props.resources.priceText}</div>
                    {price}
                </Node>
                {configure && renderConfigure(configure)}
                {keyInPrice && renderKeyInPrice(keyInPrice)}
                <Node className='msc-buybox__bulk-purchase-section'>
                    <div className='msc-buybox__bulk-purchase-button-text'>
                        {quantity &&
                            renderQuantity(
                                quantity,
                                callbacks,
                                props,
                                state,
                                resources,
                                quantityLimitsMessages,
                                min,
                                max,
                                applyDefaultOrderSettings,
                                telemetryContent,
                                unitOfMeasure
                            )}
                        {props.bulkPurchaseLink}
                    </div>
                </Node>
                {props.config.displayStockAvailability && preferredStoreId && renderAvailabilityAtPreferredStore()}
                {inventoryLabel}
                {renderAddToCart(addToCart)}
                {findInStore && renderFindInStore(findInStore)}
                {addToWishlist && renderAddToWishlist(props, state, callbacks)}
                {productComparisonButton}
                {addToOrderTemplate && renderAddToOrderTemplate(props, state, callbacks)}
                {findInStore?.productPickupOptionList ? (
                    <div className='msc-buybox__pickup-options'>{findInStore.productPickupOptionList}</div>
                ) : null}
                {_renderSocialShare(props.slots && props.slots.socialShare)}
                <div className='msc-buybox__description-text'>{props.resources.shopText}</div>
                <Node className='msc-buybox__shop-description'>
                    {shopSimilarLook && renderShopSimilarItem(shopSimilarLook)}
                    {shopSimilarDescription && renderShopSimilarItem(shopSimilarDescription)}
                </Node>
                <Node className='msc-buybox__description-section'>
                    <div className='msc-buybox__description-section-text'>{props.resources.descriptionText}</div>
                    {description}
                </Node>
                {ArrayExtensions.hasElements(props.slots.productSpecification) ? (
                    <Node className='msc-buybox__product-specification'>{props.slots.productSpecification[0]}</Node>
                ) : null}
            </Node>
        </Module>
    );
};

export default BuyboxView;
