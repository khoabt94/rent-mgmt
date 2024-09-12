import { ClassConstructor, plainToInstance as pII } from 'class-transformer'

export default function plainToInstance(dto: ClassConstructor<any>, data: any) {
  return pII(dto, data, {
    excludeExtraneousValues: true
  })
}
