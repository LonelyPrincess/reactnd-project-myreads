/**
 * This module contains a couple of methods that can be reused in the
 * different test files.
 *
 * @module test/utils/TestUtils
 * @author LonelyPrincess <sara.her.su@gmail.com>
 */

import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter } from 'react-router-dom';

import App from '../../main/App';

/**
 * Simulates the app component being added to the DOM. If we need to test
 * something assuming the user is in a certain route, we can initialize
 * the router location by passing an optional parameter.
 * @param {string} initialPage - Route for the page where the app will start.
 * @returns {ReactWrapper}
 */
export const getAppWrapper = (initialPage) => {
  return mount(
    <MemoryRouter initialEntries={ initialPage ? [ initialPage ] : undefined }>
      <App />
    </MemoryRouter>
  );
};
