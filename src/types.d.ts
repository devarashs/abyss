interface UserInfo {
  _id: string;
  name: string;
  email: string;
  preferredCurrency: string;
  isAdmine: boolean;
  isCreator: boolean;
  abyssBalance: number;
  token: string;
}

interface UserState {
  userInfo: UserInfo | null;
}

type CustomError = {
  message: string;
  response?: {
    data:
      | {
          message: string;
        }
      | undefined;
  };
};
