import { Router, Request, Response } from 'express';
import { UserModel } from '../models/users';

const router = Router();

router.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username })

  if (user) {
    return res.status(400).json({type: })
  }
});

export { router as userRouter };