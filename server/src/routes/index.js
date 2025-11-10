import express from 'express';
import {
    contactSupportController,
    generateTokenController,
    shopifyAuthController,
    testController
} from '../controller/index.js';
import {verifyToken} from "../middleware/verify.js";
import getSettingController from '../controller/settings/getSettingController.js';
import createOrUpdateSettingController from '../controller/settings/createSettingController.js';
import createUserSubscription from '../controller/settings/createUserSubscription.js';

const router = express.Router();

router.get('/test', testController.testFn);

// Shopify API routes
router.get("/", shopifyAuthController.firtShopify); /* Shopify first time call api && also called user click on app from shopify admin panel */
router.get("/auth/callback", shopifyAuthController.shopifyCallbackFn); /* Shopify when merchant accept to install our app */
router.post('/generate-token', generateTokenController.createToken);
router.post('/contact-support', verifyToken, contactSupportController.addContactFormFn);
router.get('/subscription', verifyToken, createUserSubscription);
router.get('/settings', verifyToken, getSettingController);
router.post('/settings', verifyToken, createOrUpdateSettingController);

export default router;
