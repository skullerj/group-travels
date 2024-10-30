export interface Member {
  name: string;
  city: string;
}

export interface Group {
  id: string;
  name: string;
  members: Member[];
}

export interface Idea {
  id: string;
  destinationCity: string;
  startDate: Date;
  endDate: Date;
}