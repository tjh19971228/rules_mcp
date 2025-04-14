/**
 * 用户需求模型 - 定义用户输入的解析结构
 */
export interface UserRequest {
  rawInput: string;
  technologies: Technology[];
  frameworks: Framework[];
  libraries: Library[];
  analyzed?: boolean; // 标记是否已经分析过
}

/**
 * 技术栈基础类型
 */
export interface TechnologyBase {
  name: string;
  confidence?: number; // 0-1表示匹配确信度
  keywords?: string[]; // 可能的关键词匹配
  strength?: number; // 技术匹配强度（与confidence类似，但更侧重于在匹配过程中的权重）
}

export interface Technology extends TechnologyBase {
  type: 'frontend' | 'backend' | 'systems' | 'mobile' | 'language' | 'platform' | 'runtime';
}

export interface Framework extends TechnologyBase {
  type: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'auth' | 'other';
}

export interface Library extends TechnologyBase {
  type: 'ui' | 'state' | 'utility' | 'testing' | 'styling' | 'state-management' | 'data-fetching' | 
        'routing' | 'blockchain' | 'ml' | 'animation' | 'maps' | 'tooling' | 'database' | 'ai' | 'auth' | 'other';
}

/**
 * 规则文件模型 - 定义规则文件的结构和元数据
 */
export interface RuleFile {
  path: string;
  name: string;
  content: string;
  metadata: RuleMetadata;
}

export interface RuleMetadata {
  technologies: string[];
  frameworks: string[];
  libraries: string[];
  priority: number; // 规则优先级
  description?: string;
}

/**
 * 匹配结果模型 - 定义规则匹配结果的数据结构
 */
export interface MatchResult {
  matchedRules: RuleMatch[];
  confidence: number; // 整体匹配置信度
  suggestedRule: string; // 合并后的规则内容
}

export interface RuleMatch {
  rule: RuleFile;
  score: number; // 匹配分数
  details: string[]; // 匹配到的技术/框架/库详情
}

/**
 * 工作模式
 */
export enum WorkMode {
  Interactive = 'interactive', // 需要用户确认
  Automatic = 'automatic'      // 自动处理
}

/**
 * MCP服务配置
 */
export interface MCPConfig {
  rulesDirectory: string;
  targetDirectory: string;
  confidenceThreshold: number; // 自动模式下的置信度阈值
  workMode: WorkMode;
}
