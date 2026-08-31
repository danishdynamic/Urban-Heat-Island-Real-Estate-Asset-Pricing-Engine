import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { EnvironmentalReading } from './entities/environmental-reading.entity.js';
import { EnvironmentQueryDto } from './dto/environment-query.dto.js';

@Injectable()
export class EnvironmentService {
  constructor(
    @InjectRepository(EnvironmentalReading)
    private readonly repository:
      Repository<EnvironmentalReading>,
  ) {}

  async findReadings(
    query: EnvironmentQueryDto,
  ) {
    const qb = this.repository
      .createQueryBuilder('reading')
      .orderBy('reading.recordedAt', 'ASC');

    if (query.buildingId) {
      qb.andWhere(
        'reading.buildingId = :buildingId',
        {
          buildingId: query.buildingId,
        },
      );
    }

    if (query.from) {
      qb.andWhere(
        'reading.recordedAt >= :from',
        {
          from: query.from,
        },
      );
    }

    if (query.to) {
      qb.andWhere(
        'reading.recordedAt <= :to',
        {
          to: query.to,
        },
      );
    }

    return qb.getMany();
  }
}