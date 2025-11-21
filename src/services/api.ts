import axios from 'axios';

// API Configuration
const API_CONFIG = {
  CONTROL_TOWER: 'http://localhost:3000',
  WHITE_LABEL: 'http://localhost:5001',
  SMARTFLOW_SITE: 'http://localhost:5000',
};

// Create axios instances for each service
export const controlTowerAPI = axios.create({
  baseURL: API_CONFIG.CONTROL_TOWER,
  timeout: 10000,
});

export const whiteLabelAPI = axios.create({
  baseURL: API_CONFIG.WHITE_LABEL,
  timeout: 10000,
});

export const smartFlowAPI = axios.create({
  baseURL: API_CONFIG.SMARTFLOW_SITE,
  timeout: 10000,
});

// Add auth token to requests
const addAuthInterceptor = (instance: typeof axios) => {
  instance.interceptors.request.use(
    async (config) => {
      // Get token from secure store (implement later)
      const token = null; // await getAuthToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );
};

// Add interceptors
[controlTowerAPI, whiteLabelAPI, smartFlowAPI].forEach(addAuthInterceptor);

// ============= CONTROL TOWER API =============

export const getRepoHealth = async () => {
  const response = await controlTowerAPI.get('/api/repos/health');
  return response.data;
};

export const getSystemStats = async () => {
  const response = await controlTowerAPI.get('/api/stats');
  return response.data;
};

export const getBillingOverview = async () => {
  const response = await controlTowerAPI.get('/api/billing/overview');
  return response.data;
};

export const getAnalyticsOverview = async () => {
  const response = await controlTowerAPI.get('/api/analytics/overview');
  return response.data;
};

// Agent Actions
export const healthCheckAll = async () => {
  const response = await controlTowerAPI.post('/api/agents/health-check');
  return response.data;
};

export const syncAllRepos = async () => {
  const response = await controlTowerAPI.post('/api/agents/sync-all');
  return response.data;
};

export const deployAll = async () => {
  const response = await controlTowerAPI.post('/api/agents/deploy-all');
  return response.data;
};

export const getAgentLogs = async (limit = 10) => {
  const response = await controlTowerAPI.get(`/api/agents/logs?limit=${limit}`);
  return response.data;
};

// ============= WHITE LABEL API =============

export const getClients = async () => {
  const response = await whiteLabelAPI.get('/api/clients');
  return response.data;
};

export const createClient = async (clientData: any) => {
  const response = await whiteLabelAPI.post('/api/clients', clientData);
  return response.data;
};

export const updateClient = async (clientId: string, clientData: any) => {
  const response = await whiteLabelAPI.put(`/api/clients/${clientId}`, clientData);
  return response.data;
};

export const deleteClient = async (clientId: string) => {
  const response = await whiteLabelAPI.delete(`/api/clients/${clientId}`);
  return response.data;
};

// ============= SMARTFLOW SITE API =============

export const getLeads = async () => {
  const response = await smartFlowAPI.get('/api/leads');
  return response.data;
};

export const createLead = async (leadData: any) => {
  const response = await smartFlowAPI.post('/api/leads', leadData);
  return response.data;
};

// ============= TYPES =============

export interface RepoHealth {
  name: string;
  status: 'healthy' | 'no-git' | 'missing';
  path: string;
  hasGit: boolean;
  github: {
    description: string;
    stars: number;
    lastCommit: {
      message: string;
      date: string;
      author: string;
    };
    openIssues: number;
    openPRs: number;
    workflowStatus: string;
    language: string;
  } | null;
}

export interface SystemStats {
  total: number;
  healthy: number;
  missing: number;
  noGit: number;
  prodReady: number;
  inDev: number;
  agentsActive: number;
  githubConnected: boolean;
}

export interface BillingOverview {
  totalRevenue: number;
  monthlyRecurringRevenue: number;
  activeSubscriptions: number;
  recentTransactions: Array<{
    id: string;
    amount: number;
    currency: string;
    customer: string;
    status: string;
    created: number;
    description: string;
  }>;
  revenueByProject: Record<string, number>;
}

export interface AnalyticsOverview {
  totalCustomers: number;
  totalRevenue: number;
  activeDeployments: number;
  projectBreakdown: Array<{
    name: string;
    customers: number;
    revenue: number;
    activeDeployments: number;
    healthScore: number;
  }>;
}

export interface Client {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  status: 'active' | 'inactive' | 'churned';
  createdAt: string;
  updatedAt: string;
}
