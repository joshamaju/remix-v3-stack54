import { createRouter } from "@remix-run/fetch-router";
import { formData } from "@remix-run/fetch-router/form-data-middleware";
import { logger } from "@remix-run/fetch-router/logger-middleware";
import { methodOverride } from "@remix-run/fetch-router/method-override-middleware";

import { routes } from "../routes";
import { uploadHandler } from "./utils/uploads";

import adminHandlers from "./admin.js";
import accountHandlers from "./account.js";
import authHandlers from "./auth.js";
import booksHandlers from "./books";
import cartHandlers from "./cart.js";
import checkoutHandlers from "./checkout.js";
import fragmentsHandlers from "./fragments";
import * as publicHandlers from "../public";
import * as marketingHandlers from "./marketing.js";
import { uploadsHandler } from "./uploads";
import { asyncContext } from "../libs/async-context";

let middleware = [];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger());
}

middleware.push(formData({ uploadHandler }));
middleware.push(methodOverride());
middleware.push(asyncContext());

export let router = createRouter({ middleware });

router.get(routes.assets, publicHandlers.assets);
router.get(routes.images, publicHandlers.static_);
router.get(routes.uploads, uploadsHandler);

router.map(routes.home, marketingHandlers.home);
router.map(routes.about, marketingHandlers.about);
router.map(routes.contact, marketingHandlers.contact);
router.map(routes.search, marketingHandlers.search);

router.map(routes.fragments, fragmentsHandlers);

router.map(routes.books, booksHandlers);
router.map(routes.auth, authHandlers);
router.map(routes.cart, cartHandlers);
router.map(routes.account, accountHandlers);
router.map(routes.checkout, checkoutHandlers);
router.map(routes.admin, adminHandlers);
