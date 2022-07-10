'use strict';

/**
 * product-family service.
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::product-family.product-family');
