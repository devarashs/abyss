interface UserInfo {
  _id: string;
  name: string;
  email: string;
  preferredCurrency: string;
  isAdmine: boolean;
  token: string;
}

interface UserState {
  userInfo: UserInfo | null;
}
