import { Request, Response } from "express";
import { container } from "tsyringe";

import { UpdateUserAvatarUseCase } from "./UpdateUserAvatarUseCase";

class UpdateUserAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const updateAvatarUseCase = container.resolve(UpdateUserAvatarUseCase);

    const avatarFile = request.file.filename;
    updateAvatarUseCase.execute({ userId: id, avatarFile });

    return response.status(200).send();
  }
}

export { UpdateUserAvatarController };
