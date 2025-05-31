/**
 * Service for managing workflows via the API.
 */
import { api } from './api';
import {
  Workflow,
  WorkflowCreationRequest,
  WorkflowUpdateRequest,
  WorkflowsResponse,
  WorkflowStatus,
} from '../types/workflows';
import { PaginatedResponse, SuccessResponse } from '../types/api';

export interface GetWorkflowsParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  status?: WorkflowStatus;
  name?: string;
}

class WorkflowsService {
  /**
   * Fetches a list of workflows.
   * @param params - Optional query parameters for pagination, sorting, and filtering.
   * @returns A promise that resolves to a paginated list of workflows.
   */
  async getWorkflows(params?: GetWorkflowsParams): Promise<WorkflowsResponse> {
    try {
      const response = await api.get<WorkflowsResponse>('/workflows', { params });
      return response;
    } catch (error) {
      console.error('Failed to fetch workflows:', error);
      throw new Error('Failed to fetch workflows');
    }
  }

  /**
   * Fetches a specific workflow by its ID.
   * @param workflowId - The ID of the workflow to fetch.
   * @returns A promise that resolves to the workflow data.
   */
  async getWorkflowById(workflowId: string): Promise<Workflow> {
    try {
      const response = await api.get<Workflow>(`/workflows/${workflowId}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch workflow ${workflowId}:`, error);
      throw new Error(`Failed to fetch workflow ${workflowId}`);
    }
  }

  /**
   * Creates a new workflow.
   * @param workflowData - The data for the new workflow.
   * @returns A promise that resolves to the created workflow.
   */
  async createWorkflow(workflowData: WorkflowCreationRequest): Promise<Workflow> {
    try {
      const response = await api.post<Workflow>('/workflows', workflowData);
      return response;
    } catch (error) {
      console.error('Failed to create workflow:', error);
      throw new Error('Failed to create workflow');
    }
  }

  /**
   * Updates an existing workflow.
   * @param workflowId - The ID of the workflow to update.
   * @param workflowData - The data to update.
   * @returns A promise that resolves to the updated workflow.
   */
  async updateWorkflow(workflowId: string, workflowData: WorkflowUpdateRequest): Promise<Workflow> {
    try {
      const response = await api.put<Workflow>(`/workflows/${workflowId}`, workflowData);
      return response;
    } catch (error) {
      console.error(`Failed to update workflow ${workflowId}:`, error);
      throw new Error(`Failed to update workflow ${workflowId}`);
    }
  }

  /**
   * Deletes a workflow.
   * @param workflowId - The ID of the workflow to delete.
   * @returns A promise that resolves to a success response.
   */
  async deleteWorkflow(workflowId: string): Promise<SuccessResponse> {
    try {
      const response = await api.delete<SuccessResponse>(`/workflows/${workflowId}`);
      return response;
    } catch (error) {
      console.error(`Failed to delete workflow ${workflowId}:`, error);
      throw new Error(`Failed to delete workflow ${workflowId}`);
    }
  }

  /**
   * Runs a workflow.
   * @param workflowId - The ID of the workflow to run.
   * @param parameters - Optional parameters for the workflow run.
   * @returns A promise that resolves to the run instance details.
   */
  async runWorkflow(workflowId: string, parameters?: Record<string, any>): Promise<any> {
    try {
      const response = await api.post(`/workflows/${workflowId}/run`, { parameters });
      return response;
    } catch (error) {
      console.error(`Failed to run workflow ${workflowId}:`, error);
      throw new Error(`Failed to run workflow ${workflowId}`);
    }
  }

  /**
   * Gets the status of a workflow run.
   * @param workflowId - The ID of the workflow.
   * @param runId - The ID of the workflow run.
   * @returns A promise that resolves to the status of the workflow run.
   */
  async getWorkflowRunStatus(workflowId: string, runId: string): Promise<any> {
    try {
      const response = await api.get(`/workflows/${workflowId}/runs/${runId}/status`);
      return response;
    } catch (error) {
      console.error(`Failed to get status for workflow run ${runId}:`, error);
      throw new Error(`Failed to get status for workflow run ${runId}`);
    }
  }
}

export const workflowsService = new WorkflowsService();
export default workflowsService;