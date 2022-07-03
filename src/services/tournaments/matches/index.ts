import { getAllMatches } from "./get-all";
import { updateMatch } from "./update";

export const MatchesService = Object.freeze({
  getAll: getAllMatches,
  update: updateMatch,
});
