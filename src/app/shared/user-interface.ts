export interface UserDataField {
  groupData: any;
  groupName: string;
}

export interface User {
  data: UserDataField[];
  name: string;
  photoURL: string;
  profession: string;
  id: string;
}

