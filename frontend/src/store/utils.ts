export const getUser = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  if (!user.login) throw new Error('Необходимо авторизоваться');
  return user;
};
