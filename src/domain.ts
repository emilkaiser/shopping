export const PURCHASE_STATUSES = [
  "inbox",
  "researching",
  "shortlist",
  "waiting",
  "ready_to_buy",
  "purchased",
  "abandoned",
  "deferred",
] as const;

export type PurchaseStatus = (typeof PURCHASE_STATUSES)[number];

export type Candidate = {
  id: string;
  name: string;
  variant?: string | null;
  status: "consider" | "shortlist" | "rejected" | "selected";
  condition?: "new" | "used" | "refurbished" | "unknown";
  effective_price?: number | null;
  sources: Array<{
    url: string;
    seller?: string | null;
    observed_price?: number | null;
    observed_at?: string | null;
  }>;
  notes?: string | null;
};

export type Purchase = {
  schema_version: 1;
  id: string;
  title: string;
  status: PurchaseStatus;
  created_at: string;
  updated_at: string;
  currency: string;
  goal: string;
  research_brief: {
    original_input: string | null;
    objectives: string[];
    challenge_assumptions: string[];
    research_depth: "quick" | "standard" | "deep";
  };
  constraints: {
    must: string[];
    prefer: string[];
    avoid: string[];
    budget: { max: number | null };
    deadline: string | null;
    region: string;
  };
  criteria: Array<{ name: string; weight: number }>;
  open_questions: string[];
  candidates: Candidate[];
  related_items: Array<{
    id: string;
    name: string;
    kind: "accessory" | "service" | "consumable" | "other";
    status: "consider" | "shortlist" | "selected" | "rejected";
    effective_price?: number | null;
    sources: Array<{
      url: string;
      seller?: string | null;
      observed_price?: number | null;
      observed_at?: string | null;
    }>;
    notes?: string | null;
  }>;
  monitoring: {
    enabled: boolean;
    type: "listing" | "market" | "opportunity" | null;
    trigger: string | null;
    notes: string | null;
  };
  current_recommendation: {
    candidate_id: string | null;
    action: "research" | "wait" | "buy" | "drop";
    rationale: string | null;
  };
};
