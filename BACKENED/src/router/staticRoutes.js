import express from 'express';
import { loginHandler, registerHandle } from '../controller/user.controller.js';
import { urlHandle } from '../controller/url.controller.js';
import { verify_jwt } from '../middleware/auth.middleware.js';
import { url } from '../model/url.model.js';
const router = express.Router();

router.route('/login').post(loginHandler);
router.route('/Register').post(registerHandle);
router.route('/GenerateUrl').post(verify_jwt, urlHandle);

router.get('/', (req, res) => {
    res.status(200).send('<h1>Backend working</h1>'); 
});

// Redirection route
router.get('/:shortId', async (req, res) => {
    try {
        const shortId = req.params.shortId;
        const URL = await url.findOne({ shortId });
        if (URL) {
            res.redirect(URL.redirectUrl);
        } else {
            res.status(404).send('URL not found');
        }
    } catch (error) {
        res.status(500).send('Server error');
    }
});

export default router;
