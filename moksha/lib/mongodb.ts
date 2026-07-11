type SportEvent = {
  title: string;
  sport: string;
  venue: {
    name: string;
    address: string;
    city: string;
  };
  date: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  equipment: string[];
  maxPlayers: number;
  participants: string[];
  organizer: string;
  description: string;
};