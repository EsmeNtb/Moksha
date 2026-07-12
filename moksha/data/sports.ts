import type {
  LearningLevel,
  SportProgram,
} from "@/lib/types/sports";

export const learningLevels: LearningLevel[] = [
  "Beginner",
  "Intermediate",
  "Advanced",
];

export const sportPrograms: Record<
  string,
  SportProgram
> = {
  Basketball: {
    sport: "Basketball",
    description:
      "Improve ball control, movement, shooting and decision-making.",
    image: "/sports/basketball_2.jpg",

    levels: {
      Beginner: {
        summary:
          "Learn the basic movements and become comfortable with the ball.",
        routine: [
          {
            id: "basketball-beginner-1",
            title: "Ball-handling warm-up",
            details:
              "Stationary dribbles with both hands.",
            duration: "10 min",
          },
          {
            id: "basketball-beginner-2",
            title: "Lay-up foundations",
            details:
              "Footwork and finishing from both sides.",
            duration: "15 min",
          },
          {
            id: "basketball-beginner-3",
            title: "Passing practice",
            details:
              "Chest, bounce and overhead passes.",
            duration: "12 min",
          },
          {
            id: "basketball-beginner-4",
            title: "Short shooting session",
            details:
              "Five positions close to the basket.",
            duration: "15 min",
          },
        ],
      },

      Intermediate: {
        summary:
          "Develop speed, control and stronger decisions during games.",
        routine: [
          {
            id: "basketball-intermediate-1",
            title: "Moving ball-handling",
            details:
              "Crossovers, direction changes and pace.",
            duration: "15 min",
          },
          {
            id: "basketball-intermediate-2",
            title: "Finishing through contact",
            details:
              "Controlled finishes around defenders.",
            duration: "18 min",
          },
          {
            id: "basketball-intermediate-3",
            title: "Mid-range shooting",
            details:
              "Catch-and-shoot and pull-up repetitions.",
            duration: "20 min",
          },
        ],
      },

      Advanced: {
        summary:
          "Train game-speed execution and competitive decision-making.",
        routine: [
          {
            id: "basketball-advanced-1",
            title: "Game-speed handling",
            details:
              "Pressure dribbling and rapid changes.",
            duration: "18 min",
          },
          {
            id: "basketball-advanced-2",
            title: "Situational shooting",
            details:
              "Shots after screens and defensive reads.",
            duration: "25 min",
          },
          {
            id: "basketball-advanced-3",
            title: "Small-sided game",
            details:
              "Competitive 2v2 or 3v3 scenarios.",
            duration: "30 min",
          },
        ],
      },
    },

    rules: [
      {
        title: "Traveling",
        description:
          "A player cannot move illegally without dribbling the ball.",
      },
      {
        title: "Double dribble",
        description:
          "After stopping a dribble, the player cannot begin another.",
      },
      {
        title: "Personal fouls",
        description:
          "Illegal physical contact may result in free throws or possession.",
      },
      {
        title: "Shot clock",
        description:
          "Teams have limited time to attempt a shot.",
      },
    ],

    team: {
      name: "Moksha City Hoops",
      description:
        "A social team focused on practice, community and monthly games.",
      members: [
        {
          name: "Nora",
          handle: "@nora",
          role: "Point guard",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=Nora",
        },
        {
          name: "Mika",
          handle: "@mika",
          role: "Forward",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=Mika",
        },
        {
          name: "Orville",
          handle: "@orville",
          role: "Center",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=Orville",
        },
      ],
    },

    courts: [
      {
        id: "roma-court",
        name: "Roma Community Court",
        address: "Roma Norte, CDMX",
        distance: "1.2 km",
        schedule: "Daily · 7:00 AM–10:00 PM",
        image: "/sports/basketball_2.jpg",
      },
      {
        id: "chapultepec-court",
        name: "Chapultepec Open Court",
        address: "Bosque de Chapultepec",
        distance: "3.7 km",
        schedule: "Daily · 8:00 AM–8:00 PM",
        image: "/sports/basketball_2.jpg",
      },
    ],

    coaches: [
      {
        id: "coach-elena",
        name: "Elena Ruiz",
        kind: "Coach",
        specialty: "Fundamentals and shooting",
        schedule: "Tuesday and Thursday · 6:00 PM",
        location: "Roma Community Court",
        contact: "@coach_elena",
        avatar:
          "https://api.dicebear.com/10.x/lorelei/svg?seed=Elena",
      },
      {
        id: "volunteer-leo",
        name: "Leo Martín",
        kind: "Volunteer",
        specialty: "Beginner sessions",
        schedule: "Saturday · 10:00 AM",
        location: "Chapultepec Open Court",
        contact: "@leo_moves",
        avatar:
          "https://api.dicebear.com/10.x/lorelei/svg?seed=Leo",
      },
    ],

    trainings: [
      {
        id: "basketball-training-1",
        title: "Basketball Fundamentals",
        instructor: "Elena Ruiz",
        schedule: "Thursday · 6:00 PM",
        location: "Roma Community Court",
        spots: 8,
      },
      {
        id: "basketball-training-2",
        title: "Saturday Beginner Practice",
        instructor: "Leo Martín",
        schedule: "Saturday · 10:00 AM",
        location: "Chapultepec Open Court",
        spots: 12,
      },
    ],

    openGames: [
      {
        id: "basketball-game-1",
        title: "Friendly 3x3 Evening",
        host: "@nora",
        level: "Beginner friendly",
        schedule: "Friday · 7:00 PM",
        location: "Roma Community Court",
        players: ["@nora", "@mika", "@sam"],
        spots: 3,
      },
      {
        id: "basketball-game-2",
        title: "Sunday Open Match",
        host: "@orville",
        level: "Intermediate",
        schedule: "Sunday · 5:00 PM",
        location: "Chapultepec Open Court",
        players: ["@orville", "@leo"],
        spots: 6,
      },
    ],

    challenge: {
      title: "100 controlled shots",
      description:
        "Complete 20 shots from five different positions.",
      reward: "Consistency badge",
    },
  },

  Running: {
    sport: "Running",
    description:
      "Build endurance, improve pace and create a sustainable running rhythm.",
    image: "/gallery/running.jpg",

    levels: {
      Beginner: {
        summary:
          "Alternate walking and running while developing cardiovascular capacity.",
        routine: [
          {
            id: "run-beginner-1",
            title: "Walking warm-up",
            details: "Comfortable pace and mobility.",
            duration: "8 min",
          },
          {
            id: "run-beginner-2",
            title: "Run-walk intervals",
            details:
              "One minute running, two minutes walking.",
            duration: "24 min",
          },
          {
            id: "run-beginner-3",
            title: "Walking recovery",
            details: "Lower your heart rate gradually.",
            duration: "6 min",
          },
        ],
      },

      Intermediate: {
        summary:
          "Improve endurance and introduce controlled pace changes.",
        routine: [
          {
            id: "run-intermediate-1",
            title: "Easy run",
            details: "Conversational pace.",
            duration: "20 min",
          },
          {
            id: "run-intermediate-2",
            title: "Tempo intervals",
            details:
              "Four controlled three-minute efforts.",
            duration: "20 min",
          },
          {
            id: "run-intermediate-3",
            title: "Cooldown",
            details: "Easy jogging and walking.",
            duration: "8 min",
          },
        ],
      },

      Advanced: {
        summary:
          "Train pace, threshold capacity and race-specific endurance.",
        routine: [
          {
            id: "run-advanced-1",
            title: "Easy warm-up",
            details: "Relaxed running and drills.",
            duration: "15 min",
          },
          {
            id: "run-advanced-2",
            title: "Threshold session",
            details:
              "Three controlled eight-minute efforts.",
            duration: "32 min",
          },
          {
            id: "run-advanced-3",
            title: "Cooldown",
            details: "Easy running and mobility.",
            duration: "12 min",
          },
        ],
      },
    },

    rules: [
      {
        title: "Respect the route",
        description:
          "Stay within marked paths and follow local circulation rules.",
      },
      {
        title: "Communicate",
        description:
          "Warn others before stopping or changing direction.",
      },
      {
        title: "Control the pace",
        description:
          "Group runs should respect the announced pace.",
      },
    ],

    team: {
      name: "Morning Miles",
      description:
        "A social running group with several pace levels.",
      members: [
        {
          name: "Ana",
          handle: "@ana",
          role: "Pace leader",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=Ana",
        },
        {
          name: "David",
          handle: "@david",
          role: "Route coordinator",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=David",
        },
      ],
    },

    courts: [
      {
        id: "chapultepec-route",
        name: "Chapultepec Running Route",
        address: "Bosque de Chapultepec",
        distance: "3.5 km",
        schedule: "Daily · 5:00 AM–8:00 PM",
        image: "/gallery/running.jpg",
      },
    ],

    coaches: [
      {
        id: "coach-sofia",
        name: "Sofía Luna",
        kind: "Coach",
        specialty: "Endurance and running technique",
        schedule: "Tuesday · 6:30 AM",
        location: "Chapultepec",
        contact: "@sofia_runs",
        avatar:
          "https://api.dicebear.com/10.x/lorelei/svg?seed=Sofia",
      },
    ],

    trainings: [
      {
        id: "running-training-1",
        title: "Running Technique Lab",
        instructor: "Sofía Luna",
        schedule: "Tuesday · 6:30 AM",
        location: "Chapultepec",
        spots: 10,
      },
    ],

    openGames: [
      {
        id: "running-group-1",
        title: "Social Sunday 5K",
        host: "@ana",
        level: "All levels",
        schedule: "Sunday · 7:30 AM",
        location: "Chapultepec",
        players: ["@ana", "@david", "@leo"],
        spots: 14,
      },
    ],

    challenge: {
      title: "Three consistent runs",
      description:
        "Complete three controlled sessions this week.",
      reward: "Rhythm badge",
    },
  },

  Tennis: {
    sport: "Tennis",
    description:
      "Develop stroke technique, footwork and tactical confidence.",
    image: "/gallery/tennis.jpg",

    levels: {
      Beginner: {
        summary:
          "Learn grip, contact, basic strokes and court movement.",
        routine: [
          {
            id: "tennis-beginner-1",
            title: "Footwork warm-up",
            details:
              "Split steps and lateral movement.",
            duration: "10 min",
          },
          {
            id: "tennis-beginner-2",
            title: "Forehand practice",
            details:
              "Controlled contact and follow-through.",
            duration: "18 min",
          },
          {
            id: "tennis-beginner-3",
            title: "Backhand practice",
            details:
              "Balance and consistent contact.",
            duration: "18 min",
          },
        ],
      },

      Intermediate: {
        summary:
          "Improve consistency, placement and point construction.",
        routine: [
          {
            id: "tennis-intermediate-1",
            title: "Baseline patterns",
            details:
              "Cross-court and down-the-line combinations.",
            duration: "20 min",
          },
          {
            id: "tennis-intermediate-2",
            title: "Serve and return",
            details:
              "Placement and first-ball decisions.",
            duration: "20 min",
          },
          {
            id: "tennis-intermediate-3",
            title: "Practice points",
            details:
              "Controlled competitive rallies.",
            duration: "25 min",
          },
        ],
      },

      Advanced: {
        summary:
          "Train competitive patterns, pressure situations and tactical variation.",
        routine: [
          {
            id: "tennis-advanced-1",
            title: "High-intensity movement",
            details:
              "Recovery steps and explosive positioning.",
            duration: "18 min",
          },
          {
            id: "tennis-advanced-2",
            title: "Serve patterns",
            details:
              "Serve placement and third-ball execution.",
            duration: "25 min",
          },
          {
            id: "tennis-advanced-3",
            title: "Competitive sets",
            details:
              "Match play with tactical objectives.",
            duration: "35 min",
          },
        ],
      },
    },

    rules: [
      {
        title: "Scoring",
        description:
          "Points progress through 15, 30, 40 and game.",
      },
      {
        title: "Service",
        description:
          "The serve must land diagonally inside the correct service box.",
      },
      {
        title: "Lines",
        description:
          "A ball touching any part of the line is considered in.",
      },
    ],

    team: {
      name: "Moksha Rally Club",
      description:
        "A rotating group for practice matches and doubles.",
      members: [
        {
          name: "Sam",
          handle: "@sam",
          role: "Singles",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=Sam",
        },
        {
          name: "Éber",
          handle: "@eber",
          role: "Doubles",
          avatar:
            "https://api.dicebear.com/10.x/lorelei/svg?seed=Eber",
        },
      ],
    },

    courts: [
      {
        id: "oceania-tennis",
        name: "Oceanía Tennis Courts",
        address: "Deportivo Oceanía, CDMX",
        distance: "8.1 km",
        schedule: "Wednesday–Sunday",
        image: "/gallery/tennis.jpg",
      },
    ],

    coaches: [
      {
        id: "coach-mateo",
        name: "Mateo Silva",
        kind: "Coach",
        specialty: "Beginner and intermediate tennis",
        schedule: "Wednesday · 6:00 PM",
        location: "Deportivo Oceanía",
        contact: "@mateo_tennis",
        avatar:
          "https://api.dicebear.com/10.x/lorelei/svg?seed=Mateo",
      },
    ],

    trainings: [
      {
        id: "tennis-training-1",
        title: "Tennis Fundamentals",
        instructor: "Mateo Silva",
        schedule: "Wednesday · 6:00 PM",
        location: "Deportivo Oceanía",
        spots: 6,
      },
    ],

    openGames: [
      {
        id: "tennis-game-1",
        title: "Friendly Doubles",
        host: "@sam",
        level: "Beginner to intermediate",
        schedule: "Saturday · 11:00 AM",
        location: "Deportivo Oceanía",
        players: ["@sam", "@eber"],
        spots: 2,
      },
    ],

    challenge: {
      title: "Longest rally",
      description:
        "Complete a rally of at least 20 controlled shots.",
      reward: "Control badge",
    },
  },
};