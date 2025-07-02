import { Router } from 'express';
import {
  getPolicies,
  createPolicy,
  updatePolicy,
  deletePolicy
} from '../controllers/policy.controller.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get('/policies', getPolicies);
router.post('/policies', authRequired, createPolicy);
router.put('/policies/:id', authRequired, updatePolicy);
router.delete('/policies/:id', authRequired, deletePolicy);

export default router;
