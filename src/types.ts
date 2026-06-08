export interface ChatMessage {
  id: string;
  sender: "user" | "bot";
  text: string;
  timestamp: Date;
}

export type FormType = "patient" | "volunteer" | "concern";

export interface SupportSubmission {
  id: string;
  type: FormType;
  fullName: string;
  email: string;
  phone: string;
  details: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Active";
}
