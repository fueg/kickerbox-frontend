export class Result {
  id: number;
  homeTeamScore: number;
  visitorTeamScore: number;
  reservationId: number;
}

export class Reservation {
  id: number;
  dateOfReservation: Date;
  homeTeamId: number;
  visitorTeamId: number;
  kickerBoxId: number;
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

export const results: Result[] = [
  {
    id: 1,
    homeTeamScore: 7,
    visitorTeamScore: 5,
    reservationId: 1
  },
  {
    id: 2,
    homeTeamScore: 4,
    visitorTeamScore: 1,
    reservationId: 2
  },
];

export const teams: Team[] = [
  {
    id: 1,
    name: 'Team Leet',
    members: ['Michael', 'Jonas']
  },
  {
    id: 2,
    name: 'Starlord',
    members: ['Johnny', 'Fritz']
  }
];
export const kickerboxes: Kickerbox[] = [
  {
    id: 1,
    name: 'Super Awesome Chaste',
    location: 'Ground Floor',
    model: 'The Machine 5.x'
  }
];
export const reservations: Reservation[] = [
  {
    id: 1,
    dateOfReservation: new Date(),
    homeTeamId: 1,
    visitorTeamId: 2,
    kickerBoxId: 1
  },
  {
    id: 1,
    dateOfReservation: new Date(),
    homeTeamId: 2,
    visitorTeamId: 1,
    kickerBoxId: 1
  }
];
