import { Body, Controller, Post } from '@nestjs/common';
import { AcademiesService } from '../services/app.service';
import { IAcademyModel } from '@zlatiz/idance-types';
import { GenericServerException } from './../error-handling/server-errors/generic.exception';


@Controller('/v1/academies')
export class AcademiesController {
  constructor(private readonly academiesService: AcademiesService) {}

  @Post()
  async createAcademy(@Body() body: IAcademyModel) {
    try {
      await this.academiesService.createAcademy(body);
    } catch (error) {
      throw new GenericServerException(error.message);
    }
  }
}
