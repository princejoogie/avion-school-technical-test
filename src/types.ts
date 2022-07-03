import { Match } from "./services/tournaments/matches/common";
import { Participant } from "./services/tournaments/participants/common";

export type ErrorData = {
  statusCode: number;
  message: string;
};

export type MatchWithParticipant = Match & {
  player1: Participant | null;
  player2: Participant | null;
};
