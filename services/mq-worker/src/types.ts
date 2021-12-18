export interface Mention {
  start: number;
  end: number;
  username: string;
  id: string;
}

export interface Entities {
  mentions: Mention[];
}

export interface Tweet {
  author_id: string;
  created_at: Date;
  entities: Entities;
  id: string;
  text: string;
}

export interface User {
  id: string;
  name: string;
  username: string;
}

export interface Includes {
  users: User[];
}

export interface MatchingRule {
  id: string;
  tag: string;
}

export interface StreamObject {
  data: Tweet;
  includes: Includes;
  matching_rules: MatchingRule[];
}
