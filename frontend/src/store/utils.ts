export const getUser = () => {
    const user = localStorage.getItem('user');
    if (!user) throw new Error('Необходимо авторизоваться');
    return user;
}
