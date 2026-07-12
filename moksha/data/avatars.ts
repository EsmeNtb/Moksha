export type MokshaAvatar = {
  id: string;
  name: string;
  src: string;
};

export const avatars: MokshaAvatar[] = [
  {
    id: "sunset",
    name: "Sunset",
    src: "https://api.dicebear.com/10.x/lorelei/svg?seed=r6h04mid",
  },
  {
    id: "midnight",
    name: "Midnight",
    src: "https://api.dicebear.com/10.x/lorelei/svg?seed=y6ks37qp",
  },
  {
    id: "court",
    name: "Court",
    src: "https://api.dicebear.com/10.x/lorelei/svg?seed=2cte4a9b",
  },
  {
    id: "ember",
    name: "Ember",
    src: "https://api.dicebear.com/10.x/lorelei/svg?seed=jfagpwq0",
  },
  {
    id: "ocean",
    name: "Ocean",
    src: "https://api.dicebear.com/10.x/lorelei/svg?seed=q4sv9c7h",
  },
  {
    id: "cream",
    name: "Cream",
    src: "https://api.dicebear.com/10.x/lorelei/svg?seed=fjmcihmi",
  },
];

export function getAvatarSrc(avatarId: string): string {
  return (
    avatars.find((avatar) => avatar.id === avatarId)?.src ??
    avatars[0].src
  );
}