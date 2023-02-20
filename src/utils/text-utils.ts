export const getAvatarCharacter = (text: string): string => {
  const avatarCharMatch = /[a-zA-Z]/.exec(text);
  return (avatarCharMatch !== null ? avatarCharMatch[0] : "n").toUpperCase();
}