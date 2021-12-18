export type Rule = {
  id: string;
  value: string;
  tag: string;
};

export type GetRulesResponse = {
  data: Rule[];
  meta: {
    sent: string;
    result_count: number;
  };
};

export type PostRulesRequestPayload = {
  add: NewRule[];
};

export type NewRule = Omit<Rule, "id">;

export type User = { id: string; username: string; name: string };
