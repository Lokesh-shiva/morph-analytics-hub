/**
 * Agents service for Morph Analytics Hub
 * Handles agent management and monitoring
 */

import { api } from './api';

export interface Agent {
  agentId: string;
  agentType: string;
  status: string;
  capabilities: string[];
  lastActivity: string;
  healthScore: number;
  config?: Record<string, any>;
}

export interface AgentHealth {
  agentId: string;
  healthStatus: {
    status: string;
    uptime: string;
    memoryUsage: string;
    cpuUsage: string;
  };
  lastChecked: string;
}

export interface AgentsListResponse {
  status: string;
  agents: Agent[];
  totalCount: number;
  activeCount: number;
}

export interface TaskRequest {
  taskType: string;
  parameters?: Record<string, any>;
  priority?: number;
  timeout?: number;
}

export interface TaskResponse {
  status: string;
  agentId: string;
  taskId: string;
  message: string;
  sentAt: string;
}

class AgentsService {
  /**
   * Get all registered agents
   */
  async getAgents(): Promise<AgentsListResponse> {
    try {
      const response = await api.get<AgentsListResponse>('/agents');
      return response;
    } catch (error) {
      throw new Error('Failed to fetch agents');
    }
  }

  /**
   * Get specific agent information
   */
  async getAgent(agentId: string): Promise<Agent> {
    try {
      const response = await api.get<Agent>(`/agents/${agentId}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch agent ${agentId}`);
    }
  }

  /**
   * Register a new agent
   */
  async registerAgent(agentData: Partial<Agent>): Promise<any> {
    try {
      const response = await api.post('/agents/register', agentData);
      return response;
    } catch (error) {
      throw new Error('Failed to register agent');
    }
  }

  /**
   * Unregister an agent
   */
  async unregisterAgent(agentId: string): Promise<any> {
    try {
      const response = await api.delete(`/agents/${agentId}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to unregister agent ${agentId}`);
    }
  }

  /**
   * Get agent health status
   */
  async getAgentHealth(agentId: string): Promise<AgentHealth> {
    try {
      const response = await api.get<AgentHealth>(`/agents/${agentId}/health`);
      return response;
    } catch (error) {
      throw new Error(`Failed to get health for agent ${agentId}`);
    }
  }

  /**
   * Send task to specific agent
   */
  async sendTaskToAgent(agentId: string, task: TaskRequest): Promise<TaskResponse> {
    try {
      const response = await api.post<TaskResponse>(`/agents/${agentId}/tasks`, task);
      return response;
    } catch (error) {
      throw new Error(`Failed to send task to agent ${agentId}`);
    }
  }

  /**
   * Get agent statistics
   */
  async getAgentStatistics(): Promise<any> {
    try {
      const response = await api.get('/agents/statistics');
      return response;
    } catch (error) {
      throw new Error('Failed to get agent statistics');
    }
  }

  /**
   * Get available agent types
   */
  async getAgentTypes(): Promise<any> {
    try {
      const response = await api.get('/agents/types/available');
      return response;
    } catch (error) {
      throw new Error('Failed to get agent types');
    }
  }
}

export const agentsService = new AgentsService();
export default agentsService;