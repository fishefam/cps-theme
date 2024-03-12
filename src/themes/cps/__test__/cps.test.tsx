/*!
 * Copyright (c) Microsoft Corporation.
 * All rights reserved. See LICENSE in the project root for license information.
 */

/* eslint-disable no-duplicate-imports */
import { render } from 'enzyme';
import * as React from 'react';

import * as adventureworks from '../cps';

describe('Buybox unit tests - View', () => {
    it('renders correctly -- adventureworks', () => {
        const component = render(<adventureworks.default />);
        expect(component).toMatchSnapshot();
    });
});
