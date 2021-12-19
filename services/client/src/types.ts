export interface User {
  id: string;
  name: string;
  username: string;
}

export interface Tweet {
  id: string;
  author_id: string;
  text: string;
  created_at: Date;
  user: User;
}

export interface TweetWithUser extends Tweet {
  user: User;
}
