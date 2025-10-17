declare global {
  var usersStore: Array<{
    id: string;
    name: string;
    email: string;
    password: string;
    createdAt: Date;
  }> | undefined;
}

export const users = global.usersStore || (global.usersStore = []);