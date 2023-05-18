import { AiFillGithub, AiFillLinkedin, AiOutlineTwitter } from 'react-icons/ai';

export const footerLinks = [
  {
    id: 1,
    icon: <AiOutlineTwitter />,
    url: 'https://twitter.com/Swastik2001',
  },
  {
    id: 2,
    icon: <AiFillLinkedin />,
    url: 'https://www.linkedin.com/in/swastik-patro-2a54bb19b/',
  },
  {
    id: 3,
    icon: <AiFillGithub />,
    url: 'https://www.linkedin.com/in/swastik-patro-2a54bb19b/',
  },
];

export const ToastType = {
  Warn: 'warn',
  Info: 'info',
  Success: 'success',
  Error: 'error',
};

export const testUser = {
  email: 'jethalal.gada@gmail.com',
  password: 'babitaji1234',
};

export const localStorageKeys = {
  User: 'user',
};
