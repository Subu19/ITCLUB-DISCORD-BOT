import { Schema, model } from "mongoose";

export interface TicketInterface {
  userId: string;
  subject: string;
  isResolved: boolean;
  resolveAt: Date;
  channelId: string;
}

export const TicketSchema = new Schema<TicketInterface>({
  userId: String,
  subject: String,
  isResolved: Boolean,
  resolveAt: {
    type: Date,
    required: false,
  },
  channelId: String,
});

export const TicketModel = model<TicketInterface>("Ticket", TicketSchema);
