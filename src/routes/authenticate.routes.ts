import { Router } from 'express';
import { AuthenticateController } from '../modules/accounts/useCases/authenticateUser/AuthenticateController';

const authenticateRoutes = Router();

const authenticateUseCase = new AuthenticateController();
authenticateRoutes.post('/sessions', authenticateUseCase.handle);

export { authenticateRoutes };
