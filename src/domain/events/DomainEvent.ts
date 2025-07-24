// Base Domain Event interface
export interface DomainEvent {
  readonly eventId: string;
  readonly occurredAt: Date;
  readonly eventType: string;
  readonly aggregateId: string;
}

// Domain Event Publisher interface
export interface DomainEventPublisher {
  publish(event: DomainEvent): Promise<void>;
  publishMany(events: DomainEvent[]): Promise<void>;
}

// Domain Event Handler interface
export interface DomainEventHandler<T extends DomainEvent> {
  handle(event: T): Promise<void>;
}
