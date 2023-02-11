export const getAvatarCharacter = (text: string) => {
  const avatarCharMatch = /[a-zA-Z]/.exec(text);
  return (avatarCharMatch ? avatarCharMatch[0] : "n").toUpperCase();
}