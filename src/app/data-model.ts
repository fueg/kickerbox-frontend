export class Result {

  constructor(homeTeamScore: number, visitorTeamScore: number, reservationId: number) {
    this.id = getNextId();
    this.homeTeamScore = homeTeamScore;
    this.visitorTeamScore = visitorTeamScore;
    this.reservationId = reservationId;
  }

  id: number;
  homeTeamScore: number;
  visitorTeamScore: number;
  reservationId: number;
}

export class ResultView extends Result {
  homeTeamName: string;
  visitorTeamName: string;
  kickerboxName: string;
  kickerboxLocation: string;
}

export class Reservation {

  constructor(dateOfReservation: Date, homeTeamId: number, visitorTeamId: number, kickerboxId: number) {
    this.id = getNextId();
    this.dateOfReservation = dateOfReservation;
    this.homeTeamId = homeTeamId;
    this.visitorTeamId = visitorTeamId;
    this.kickerboxId = kickerboxId;
  }

  id: number;
  dateOfReservation: Date;
  homeTeamId: number;
  visitorTeamId: number;
  kickerboxId: number;
}

export class ReservationView extends Reservation {
  homeTeamName: string;
  visitorTeamName: string;
  kickerboxName: string;
  kickerboxLocation: string;
}

export class Team {
  id: number;
  name: string;
  members: string[];
}

export class Kickerbox {
  id: number;
  name: string;
  location: string;
  model: string;
}

function* nextId() {
  let index = 1;
  while (true) {
    yield index++;
  }
}

const gen = nextId();

function getNextId(): number {
  return Number(gen.next().value);
}

export const teams: Team[] = [
  {
    id: getNextId(),
    name: 'Team Leet',
    members: ['Michael', 'Jonas']
  },
  {
    id: getNextId(),
    name: 'Starlord',
    members: ['Johnny', 'Fritz']
  }
];
export const kickerboxes: Kickerbox[] = [
  {
    id: getNextId(),
    name: 'Super Awesome Chaste',
    location: 'Ground Floor',
    model: 'The Machine 5.x'
  }
];
export const reservations: Reservation[] = [
  {
    id: getNextId(),
    dateOfReservation: new Date('2015-03-25T12:00:00Z'),
    homeTeamId: teams[0].id,
    visitorTeamId: teams[1].id,
    kickerboxId: kickerboxes[0].id
  },
  {
    id: getNextId(),
    dateOfReservation: new Date('2015-03-25T18:00:00Z'),
    homeTeamId: teams[1].id,
    visitorTeamId: teams[0].id,
    kickerboxId: kickerboxes[0].id
  },
  {
    id: getNextId(),
    dateOfReservation: new Date('2015-03-26T12:00:00Z'),
    homeTeamId: teams[0].id,
    visitorTeamId: teams[1].id,
    kickerboxId: kickerboxes[0].id
  },
  {
    id: getNextId(),
    dateOfReservation: new Date('2015-03-26T18:00:00Z'),
    homeTeamId: teams[1].id,
    visitorTeamId: teams[0].id,
    kickerboxId: kickerboxes[0].id
  },
];

export const results: Result[] = [
  {
    id: getNextId(),
    homeTeamScore: 7,
    visitorTeamScore: 5,
    reservationId: reservations[0].id
  },
  {
    id: getNextId(),
    homeTeamScore: 4,
    visitorTeamScore: 1,
    reservationId: reservations[1].id
  },
];
