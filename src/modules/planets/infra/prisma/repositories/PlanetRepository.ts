import { prisma } from '../../../../../infra/Prisma/client';
import { IPlanetCreateDTO } from '../../../../../dtos/IPlanetCreateDTO';
import { Planet } from '../entities/Planet';
import { IPlanetRepository } from '../../../repository/IPlanetRepository';


class PlanetRepository implements IPlanetRepository {
 
  async findById(id: string): Promise<Planet | null> {
    const planet = await prisma.planet.findUnique({
      where: {
        id
      }
    });

    return planet;
  }

  async findByName(name: string): Promise<Planet | null> {
    const planet = await prisma.planet.findFirst({
      where: {
        name
      }
    });

    return planet;
  }

  async listPlanets(): Promise<Planet[]> {
    const planets = await prisma.planet.findMany();

    return planets;
  }

  async createPlanet({ name, weather, terrain }: IPlanetCreateDTO): Promise<void> {
    await prisma.planet.create({
      data: {
        name,
        weather,
        terrain,
      }
    });
  }

  async removePlanet(id: string): Promise<void> {

    await prisma.planet.delete({
      where: {
        id: id
      }
    });
  }
}

export { PlanetRepository };
