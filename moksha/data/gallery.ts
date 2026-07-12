export type CommunityMoment = {
  id: string;
  title: string;
  event: string;
  image: string;
  taggedUsers: string[];
};

export const communityMoments: CommunityMoment[] = [
  {
    id: "moment-1",
    title: "Saturday court crew",
    event: "Beginner Basketball Meetup",
    image: "/gallery/playing_1.jpg",
    taggedUsers: ["@nora","@noa", "@orville","@mika"],
  },
  {
    id: "moment-2",
    title: "Morning miles",
    event: "Just having fun",
    image: "/gallery/playing_2.jpg",
    taggedUsers: ["@leo", "@ana", "@david", "@eline"],
  },
  {
    id: "moment-3",
    title: "Hang out ",
    event: "Just having fun after a game",
    image: "/gallery/playing_3.jpg",
    taggedUsers: ["@eber", "@sam","@joel", "@ej", "@joe", "@mickael","@kaiser"],
  },
  {
    id: "moment-4",
    title: "First running session",
    event: "Running with friends",
    image: "/gallery/running.jpg",
    taggedUsers: ["@tañ", "@plz"],
  }
];