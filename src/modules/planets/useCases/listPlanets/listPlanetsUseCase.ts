import { inject, injectable } from 'tsyringe';

import { IPlanetRepository } from '../../infra/prisma/repositories/IPlanetRepository';
import { Planet } from '../../infra/prisma/entities/Planet';

@injectable()
class ListPlanetsUseCase {

  constructor(
    @inject('PlanetRepository')
    private planetRepository: IPlanetRepository
  ) {}
  
  async execute(): Promise<Planet[]> {
    const planets = await this.planetRepository.listPlanets();

    if(!planets) {
      throw new Error('No planets to list!');
    }

    return planets;
  }
}


export { ListPlanetsUseCase };