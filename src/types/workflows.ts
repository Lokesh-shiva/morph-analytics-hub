/**
 * Types related to Workflows API
 */

export enum WorkflowStatus {
  PENDING = "pending",
  RUNNING = "running",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export interface WorkflowStep {
  id: string;
  name: string;
  status: WorkflowStatus;
  startTime?: string;
  endTime?: string;
  details?: Record<string, any>;
  error?: string;
}

export interface Workflow {
  id: string;
  name: string;
  description?: string;
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  startedAt?: string;
  completedAt?: string;
  steps: WorkflowStep[];
  triggeredBy?: string;
  parameters?: Record<string, any>;
  result?: Record<string, any>;
}

export interface WorkflowCreationRequest {
  name: string;
  description?: string;
  steps: Omit<WorkflowStep, "id" | "status" | "startTime" | "endTime">[];
  parameters?: Record<string, any>;
}

export interface WorkflowUpdateRequest {
  name?: string;
  description?: string;
  status?: WorkflowStatus;
  steps?: Partial<WorkflowStep>[]; // Allow partial updates to steps
}

export interface WorkflowsResponse {
  workflows: Workflow[];
  totalCount: number;
}