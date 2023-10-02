import { Combination } from "./Combination";
import { Profile } from "./Profile";
import { Database } from "./schema";

export type Claim = Database["public"]["Tables"]["claims"]["Row"];

export type ClaimInsert = Database["public"]["Tables"]["claims"]["Insert"];
