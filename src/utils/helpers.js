export const checkEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export const checkPassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password)
}

export const checkUserName = (userName) => {
    const userNameRegex = /^[a-zA-Z ]{2,}$/;
    return userNameRegex.test(userName)
}

export const getRandomDarkColor = () => {
    const red = Math.floor(Math.random() * 128);
    const green = Math.floor(Math.random() * 128);
    const blue = Math.floor(Math.random() * 128);
  
    const toHex = (component) => component.toString(16).padStart(2, '0');
    const darkColorHex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  
    return darkColorHex;
  }