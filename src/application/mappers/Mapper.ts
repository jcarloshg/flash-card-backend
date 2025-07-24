// Base Mapper interface
export interface Mapper<TDomain, TDTO> {
  toDTO(domain: TDomain): TDTO;
  toDomain(dto: TDTO): TDomain;
}

// Collection mapper
export abstract class CollectionMapper<TDomain, TDTO> implements Mapper<TDomain, TDTO> {
  abstract toDTO(domain: TDomain): TDTO;
  abstract toDomain(dto: TDTO): TDomain;

  toDTOList(domains: TDomain[]): TDTO[] {
    return domains.map(domain => this.toDTO(domain));
  }

  toDomainList(dtos: TDTO[]): TDomain[] {
    return dtos.map(dto => this.toDomain(dto));
  }
}
