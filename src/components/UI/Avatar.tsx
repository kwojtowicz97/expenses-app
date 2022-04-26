const Avatar: React.FC<{ user: any; size: number }> = (props) => {
  const { user, size } = props;
  const userAvatarURL = user.avatar;
  console.log("avatar rerendered")
  const src = userAvatarURL ? userAvatarURL
  : `https://ui-avatars.com/api/?rounded=true&size=${size}&name=${user.firstName}+${user.lastName}`;
  return (
    <img src={src} />
  );
};

export default Avatar;
