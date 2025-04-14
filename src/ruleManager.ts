import fs from "fs";
import path from "path";
import {
  RuleFile,
  RuleMetadata,
  UserRequest,
  MatchResult,
  RuleMatch,
  Technology,
  Framework,
  Library,
} from "./types";

/**
 * 规则管理器类 - 负责规则的加载、匹配和创建
 */
export class RuleManager {
  private rulesDirectory: string;
  private rules: RuleFile[] = [];

  constructor(rulesDirectory: string) {
    this.rulesDirectory = rulesDirectory;
    // console.log(`[DEBUG] Rules directory set to: ${this.rulesDirectory}`);
    this.loadRules();
  }

  /**
   * 从规则目录加载所有规则文件
   */
  private loadRules(): void {
    try {
      const files = fs.readdirSync(this.rulesDirectory);

      for (const file of files) {
        if (file.endsWith(".md")) {
          const filePath = path.join(this.rulesDirectory, file);
          const content = fs.readFileSync(filePath, "utf-8");

          // 解析规则文件元数据
          const metadata = this.parseRuleMetadata(content, file);

          this.rules.push({
            path: filePath,
            name: path.basename(file, ".md"),
            content,
            metadata,
          });
        }
      }

      //   console.log(`Loaded ${this.rules.length} rule files`);
    } catch (error) {
    //   console.error("Failed to load rule files:", error);
    //   console.log(
    //     `[DEBUG] Error loading rules from directory: ${this.rulesDirectory}`,
    //     error
    //   );
    }
  }

  /**
   * 从规则文件内容中提取元数据
   */
  private parseRuleMetadata(content: string, fileName: string): RuleMetadata {
    const technologies: string[] = [];
    const frameworks: string[] = [];
    const libraries: string[] = [];

    // 通用技术关键词映射
    const techKeywords = {
      languages: [
        { name: "typescript", aliases: ["typescript", "ts", "type"] },
        { name: "javascript", aliases: ["javascript", "js"] },
        { name: "python", aliases: ["python", "py"] },
        { name: "php", aliases: ["php"] },
        { name: "dart", aliases: ["dart", "flutter"] },
        { name: "swift", aliases: ["swift"] },
        { name: "kotlin", aliases: ["kotlin"] },
        { name: "go", aliases: ["golang", "go"] },
        { name: "rust", aliases: ["rust"] },
        { name: "c#", aliases: ["c#", "csharp", "dotnet", ".net"] },
      ],
      frameworks: [
        {
          name: "react",
          aliases: ["react", "reactjs", "react.js", "react 18"],
        },
        { name: "vue", aliases: ["vue", "vuejs", "vue.js"] },
        { name: "angular", aliases: ["angular", "angularjs"] },
        { name: "svelte", aliases: ["svelte", "sveltekit"] },
        {
          name: "next.js",
          aliases: [
            "next",
            "nextjs",
            "next.js",
            "next 13",
            "next 14",
            "nextjs项目",
            "next.js项目",
          ],
        },
        { name: "nuxt", aliases: ["nuxt", "nuxtjs", "nuxt.js"] },
        { name: "laravel", aliases: ["laravel"] },
        { name: "django", aliases: ["django"] },
        { name: "flask", aliases: ["flask"] },
        { name: "fastapi", aliases: ["fastapi"] },
        { name: "express", aliases: ["express", "expressjs"] },
        { name: "nestjs", aliases: ["nest", "nestjs"] },
        { name: "flutter", aliases: ["flutter"] },
        { name: "swiftui", aliases: ["swiftui"] },
        {
          name: "nextauth",
          aliases: ["nextauth", "next-auth", "next auth", "auth.js"],
        },
      ],
      libraries: [
        {
          name: "tailwindcss",
          aliases: ["tailwind", "tailwindcss", "tailwind css"],
        },
        {
          name: "shadcn",
          aliases: ["shadcn", "shadcn/ui", "shadcnui", "shadcn-ui"],
        },
        { name: "vite", aliases: ["vite"] },
        { name: "redux", aliases: ["redux", "reduxjs"] },
        { name: "mobx", aliases: ["mobx"] },
        { name: "jotai", aliases: ["jotai"] },
        { name: "zustand", aliases: ["zustand"] },
        {
          name: "tanstack",
          aliases: ["tanstack", "react-query", "query", "tanstack query"],
        },
        { name: "emotion", aliases: ["emotion"] },
        { name: "styled-components", aliases: ["styled-components", "styled"] },
        { name: "bootstrap", aliases: ["bootstrap"] },
        { name: "material-ui", aliases: ["mui", "material-ui"] },
        { name: "chakra-ui", aliases: ["chakra", "chakra-ui"] },
        { name: "ant-design", aliases: ["antd", "ant-design"] },
        { name: "livewire", aliases: ["livewire"] },
        { name: "inertia", aliases: ["inertia", "inertiajs"] },
        { name: "web3", aliases: ["web3", "blockchain", "eth"] },
        { name: "tensorflow", aliases: ["tensorflow", "tf"] },
        { name: "pytorch", aliases: ["pytorch", "torch"] },
        { name: "jax", aliases: ["jax"] },
        {
          name: "framer-motion",
          aliases: ["framer", "framer motion", "framer-motion"],
        },
        { name: "react-icons", aliases: ["react-icons", "react icons"] },
        { name: "axios", aliases: ["axios"] },
        { name: "swr", aliases: ["swr"] },
        { name: "mapbox", aliases: ["mapbox", "mapbox gl", "mapbox-gl"] },
        { name: "leaflet", aliases: ["leaflet"] },
        { name: "eslint", aliases: ["eslint"] },
        { name: "prettier", aliases: ["prettier"] },
        { name: "mysql", aliases: ["mysql", "sql"] },
        { name: "redis", aliases: ["redis"] },
        { name: "openai", aliases: ["openai", "openai api", "gpt"] },
        { name: "langchain", aliases: ["langchain", "lang chain"] },
        {
          name: "vector-db",
          aliases: [
            "vector",
            "vector database",
            "vectordb",
            "pinecone",
            "chroma",
          ],
        },
        { name: "jwt", aliases: ["jwt", "json web token"] },
      ],
    };

    // 从文件名中提取关键技术信息
    const name = path.basename(fileName, ".md");
    const nameParts = name.split(/[-_\.]/); // 分割文件名，支持不同分隔符

    // 检查文件名中的技术关键词
    this.extractKeywordsFromText(
      nameParts.join(" "),
      techKeywords,
      technologies,
      frameworks,
      libraries
    );

    // 分析内容提取信息
    const lines = content.split("\n");

    // 处理标题（权重最高）
    const titleMatch = lines[0].match(/# (.*)/);
    if (titleMatch) {
      this.extractKeywordsFromText(
        titleMatch[1],
        techKeywords,
        technologies,
        frameworks,
        libraries
      );
    }

    // 处理其他内容行（权重较低）
    const allContent = lines.join(" ").toLowerCase();
    this.extractKeywordsFromText(
      allContent,
      techKeywords,
      technologies,
      frameworks,
      libraries
    );

    // 应用技术关联推断
    const inferences = this.inferRelatedTechnologies(
      technologies,
      frameworks,
      libraries
    );

    // 将推断结果应用到相应数组
    for (const inference of inferences) {
      if (
        inference.category === "language" &&
        !technologies.includes(inference.name)
      ) {
        technologies.push(inference.name);
      } else if (
        inference.category === "framework" &&
        !frameworks.includes(inference.name)
      ) {
        frameworks.push(inference.name);
      } else if (
        inference.category === "library" &&
        !libraries.includes(inference.name)
      ) {
        libraries.push(inference.name);
      }
    }

    return {
      technologies: [...new Set(technologies)], // 去重
      frameworks: [...new Set(frameworks)],
      libraries: [...new Set(libraries)],
      priority: 1,
      description: lines[0].replace("# ", ""), // 使用第一行作为描述
    };
  }

  /**
   * 从文本中提取技术关键词
   */
  private extractKeywordsFromText(
    text: string,
    keywordMap: any,
    technologies: string[],
    frameworks: string[],
    libraries: string[]
  ): void {
    const normalizedText = text.toLowerCase();

    // 检查语言
    for (const lang of keywordMap.languages) {
      for (const alias of lang.aliases) {
        if (this.containsKeyword(normalizedText, alias)) {
          technologies.push(lang.name);
          break;
        }
      }
    }

    // 检查框架
    for (const framework of keywordMap.frameworks) {
      for (const alias of framework.aliases) {
        if (this.containsKeyword(normalizedText, alias)) {
          frameworks.push(framework.name);
          break;
        }
      }
    }

    // 检查库
    for (const library of keywordMap.libraries) {
      for (const alias of library.aliases) {
        if (this.containsKeyword(normalizedText, alias)) {
          libraries.push(library.name);
          break;
        }
      }
    }
  }

  /**
   * 更智能地检查关键词是否在文本中出现
   */
  private containsKeyword(text: string, keyword: string): boolean {
    // 避免部分匹配问题，确保是完整词
    let result = false;

    if (
      keyword.includes(" ") ||
      keyword.includes(".") ||
      keyword.includes("/")
    ) {
      // 多词关键词，直接匹配
      result = text.includes(keyword);
    } else {
      // 单词关键词，使用边界匹配或分隔符匹配
      const pattern = new RegExp(`(^|[^a-z0-9])${keyword}([^a-z0-9]|$)`, "i");
      result = pattern.test(text);
    }

    // Only log for successful matches to avoid flooding
    if (result) {
    //   console.log(`[DEBUG] Keyword match: "${keyword}" found in text`);
    }

    return result;
  }

  /**
   * 推断相关技术
   * @returns 推断出的技术列表
   */
  private inferRelatedTechnologies(
    technologies: string[],
    frameworks: string[],
    libraries: string[]
  ): Array<{ name: string; category: "language" | "framework" | "library" }> {
    const inferences: Array<{
      name: string;
      category: "language" | "framework" | "library";
    }> = [];

    // 根据已识别的技术推断相关技术

    // 如果有Next.js但没有React，添加React
    if (frameworks.includes("next.js") && !frameworks.includes("react")) {
      inferences.push({ name: "react", category: "framework" });
    }

    // 如果有NuxtJS但没有Vue，添加Vue
    if (frameworks.includes("nuxt") && !frameworks.includes("vue")) {
      inferences.push({ name: "vue", category: "framework" });
    }

    // 如果有SvelteKit但没有Svelte，添加Svelte
    if (frameworks.includes("sveltekit") && !frameworks.includes("svelte")) {
      inferences.push({ name: "svelte", category: "framework" });
    }

    // 如果有Flutter但没有Dart，添加Dart
    if (frameworks.includes("flutter") && !technologies.includes("dart")) {
      inferences.push({ name: "dart", category: "language" });
    }

    // 如果有SwiftUI但没有Swift，添加Swift
    if (frameworks.includes("swiftui") && !technologies.includes("swift")) {
      inferences.push({ name: "swift", category: "language" });
    }

    // 如果有React库但没有React，添加React
    if (
      (libraries.includes("redux") ||
        libraries.includes("mobx") ||
        libraries.includes("jotai") ||
        libraries.includes("zustand") ||
        libraries.includes("tanstack")) &&
      !frameworks.includes("react")
    ) {
      inferences.push({ name: "react", category: "framework" });
    }

    return inferences;
  }

  /**
   * 分析用户需求并提取技术栈
   */
  public analyzeRequest(input: string): UserRequest {
    // Remove debugging console.log
    // console.log(`[DEBUG] Analyzing user request: "${input}"`);

    const request: UserRequest = {
      rawInput: input,
      technologies: [],
      frameworks: [],
      libraries: [],
      analyzed: true,
    };

    // 预处理输入 - 提取文本中的技术关键词
    const inputLower = input.toLowerCase();
    // Remove debugging console.log
    // console.log(`[DEBUG] Analyzing input: "${inputLower}"`);

    // 添加通用技术匹配
    const techKeywords = {
      languages: [
        {
          name: "typescript",
          aliases: ["typescript", "ts", "type", "打字稿"],
          type: "frontend",
        },
        {
          name: "javascript",
          aliases: ["javascript", "js", "脚本"],
          type: "frontend",
        },
        {
          name: "python",
          aliases: ["python", "py", "蟒蛇", "派森"],
          type: "backend",
        },
        { name: "php", aliases: ["php"], type: "backend" },
        { name: "dart", aliases: ["dart"], type: "mobile" },
        { name: "swift", aliases: ["swift"], type: "mobile" },
        { name: "kotlin", aliases: ["kotlin"], type: "mobile" },
        { name: "go", aliases: ["golang", "go"], type: "backend" },
        { name: "rust", aliases: ["rust"], type: "systems" },
        {
          name: "c#",
          aliases: ["c#", "csharp", "dotnet", ".net"],
          type: "backend",
        },
      ],
      frameworks: [
        {
          name: "react",
          aliases: ["react", "reactjs", "react.js", "react 18"],
          type: "frontend",
        },
        {
          name: "vue",
          aliases: ["vue", "vuejs", "vue.js", "vue3", "vue 3"],
          type: "frontend",
        },
        {
          name: "angular",
          aliases: ["angular", "angularjs"],
          type: "frontend",
        },
        { name: "svelte", aliases: ["svelte", "sveltekit"], type: "frontend" },
        {
          name: "next.js",
          aliases: [
            "next",
            "nextjs",
            "next.js",
            "next 13",
            "next 14",
            "nextjs项目",
            "next.js项目",
            "nextjs project",
          ],
          type: "frontend",
        },
        {
          name: "nuxt",
          aliases: ["nuxt", "nuxtjs", "nuxt.js"],
          type: "frontend",
        },
        { name: "laravel", aliases: ["laravel"], type: "backend" },
        { name: "django", aliases: ["django"], type: "backend" },
        { name: "flask", aliases: ["flask"], type: "backend" },
        { name: "fastapi", aliases: ["fastapi"], type: "backend" },
        { name: "express", aliases: ["express", "expressjs"], type: "backend" },
        { name: "nestjs", aliases: ["nest", "nestjs"], type: "backend" },
        { name: "flutter", aliases: ["flutter"], type: "mobile" },
        { name: "swiftui", aliases: ["swiftui"], type: "mobile" },
        {
          name: "nextauth",
          aliases: ["nextauth", "next-auth", "next auth", "auth.js"],
          type: "auth",
        },
      ],
      libraries: [
        {
          name: "tailwindcss",
          aliases: ["tailwind", "tailwindcss", "tailwind css"],
          type: "styling",
        },
        {
          name: "shadcn",
          aliases: ["shadcn", "shadcn/ui", "shadcnui", "shadcn-ui"],
          type: "ui",
        },
        { name: "vite", aliases: ["vite"], type: "tooling" },
        {
          name: "redux",
          aliases: ["redux", "reduxjs"],
          type: "state-management",
        },
        { name: "mobx", aliases: ["mobx"], type: "state-management" },
        { name: "jotai", aliases: ["jotai"], type: "state-management" },
        { name: "zustand", aliases: ["zustand"], type: "state-management" },
        {
          name: "tanstack",
          aliases: ["tanstack", "react-query", "query", "tanstack query"],
          type: "data-fetching",
        },
        { name: "emotion", aliases: ["emotion"], type: "styling" },
        {
          name: "styled-components",
          aliases: ["styled-components", "styled"],
          type: "styling",
        },
        { name: "bootstrap", aliases: ["bootstrap"], type: "styling" },
        { name: "material-ui", aliases: ["mui", "material-ui"], type: "ui" },
        { name: "chakra-ui", aliases: ["chakra", "chakra-ui"], type: "ui" },
        { name: "ant-design", aliases: ["antd", "ant-design"], type: "ui" },
        { name: "livewire", aliases: ["livewire"], type: "ui" },
        { name: "inertia", aliases: ["inertia", "inertiajs"], type: "routing" },
        {
          name: "web3",
          aliases: ["web3", "blockchain", "eth"],
          type: "blockchain",
        },
        { name: "tensorflow", aliases: ["tensorflow", "tf"], type: "ml" },
        { name: "pytorch", aliases: ["pytorch", "torch"], type: "ml" },
        { name: "jax", aliases: ["jax"], type: "ml" },
        {
          name: "framer-motion",
          aliases: ["framer", "framer motion", "framer-motion"],
          type: "animation",
        },
        {
          name: "react-icons",
          aliases: ["react-icons", "react icons"],
          type: "ui",
        },
        { name: "axios", aliases: ["axios"], type: "data-fetching" },
        { name: "swr", aliases: ["swr"], type: "data-fetching" },
        {
          name: "mapbox",
          aliases: ["mapbox", "mapbox gl", "mapbox-gl"],
          type: "maps",
        },
        { name: "leaflet", aliases: ["leaflet"], type: "maps" },
        { name: "eslint", aliases: ["eslint"], type: "tooling" },
        { name: "prettier", aliases: ["prettier"], type: "tooling" },
        { name: "mysql", aliases: ["mysql", "sql"], type: "database" },
        { name: "redis", aliases: ["redis"], type: "database" },
        {
          name: "openai",
          aliases: ["openai", "openai api", "gpt"],
          type: "ai",
        },
        { name: "langchain", aliases: ["langchain", "lang chain"], type: "ai" },
        {
          name: "vector-db",
          aliases: [
            "vector",
            "vector database",
            "vectordb",
            "pinecone",
            "chroma",
          ],
          type: "database",
        },
        { name: "jwt", aliases: ["jwt", "json web token"], type: "auth" },
      ],
    };

    // 匹配语言
    for (const tech of techKeywords.languages) {
      for (const alias of tech.aliases) {
        if (this.containsKeyword(inputLower, alias)) {
          request.technologies.push({
            name: tech.name,
            type: tech.type as Technology["type"],
            strength: 1.0,
          });
          // Remove debugging console.log
          // console.log(`[DEBUG] Detected language: ${tech.name} (from keyword: ${alias})`);
          break;
        }
      }
    }

    // 匹配框架
    for (const framework of techKeywords.frameworks) {
      for (const alias of framework.aliases) {
        if (this.containsKeyword(inputLower, alias)) {
          request.frameworks.push({
            name: framework.name,
            type: framework.type as Framework["type"],
            strength: 1.0,
          });
          // Remove debugging console.log
          // console.log(`[DEBUG] Detected framework: ${framework.name} (from keyword: ${alias})`);
          break;
        }
      }
    }

    // 匹配库
    for (const library of techKeywords.libraries) {
      for (const alias of library.aliases) {
        if (this.containsKeyword(inputLower, alias)) {
          request.libraries.push({
            name: library.name,
            type: library.type as Library["type"],
            strength: 1.0,
          });
          // Remove debugging console.log
          // console.log(`[DEBUG] Detected library: ${library.name} (from keyword: ${alias})`);
          break;
        }
      }
    }

    // Remove debugging console.log
    // console.log(`[DEBUG] Technologies detected: ${request.technologies.length}`);
    // console.log(`[DEBUG] Frameworks detected: ${request.frameworks.length}`);
    // console.log(`[DEBUG] Libraries detected: ${request.libraries.length}`);

    // 智能推断相关技术 (如果用户指定了某个框架，可能会隐含某种语言或库)
    if (request.frameworks.length > 0 || request.libraries.length > 0) {
      const inferences = this.inferRelatedTechnologies(
        request.technologies.map((t) => t.name),
        request.frameworks.map((f) => f.name),
        request.libraries.map((l) => l.name)
      );

      // Remove debugging console.log
      // console.log(`[DEBUG] Inferred ${inferences.length} related technologies`);

      // 应用推断结果
      for (const inference of inferences) {
        if (inference.category === "language") {
          const exists = request.technologies.find(
            (t) => t.name === inference.name
          );
          if (!exists) {
            request.technologies.push({
              name: inference.name,
              type: this.determineLanguageType(inference.name),
              strength: 0.8, // 推断的技术强度稍低
            });
            // Remove debugging console.log
            // console.log(`[DEBUG] Inferred language: ${inference.name}`);
          }
        } else if (inference.category === "framework") {
          const exists = request.frameworks.find(
            (f) => f.name === inference.name
          );
          if (!exists) {
            request.frameworks.push({
              name: inference.name,
              type: this.determineFrameworkType(inference.name),
              strength: 0.8,
            });
            // Remove debugging console.log
            // console.log(`[DEBUG] Inferred framework: ${inference.name}`);
          }
        } else if (inference.category === "library") {
          const exists = request.libraries.find(
            (l) => l.name === inference.name
          );
          if (!exists) {
            request.libraries.push({
              name: inference.name,
              type: this.determineLibraryType(inference.name),
              strength: 0.8,
            });
            // Remove debugging console.log
            // console.log(`[DEBUG] Inferred library: ${inference.name}`);
          }
        }
      }
    }

    // Remove debugging console.log
    // console.log(`[DEBUG] Final technologies: ${request.technologies.length}`);
    // console.log(`[DEBUG] Final frameworks: ${request.frameworks.length}`);
    // console.log(`[DEBUG] Final libraries: ${request.libraries.length}`);

    return request;
  }

  /**
   * 确定语言类型
   */
  private determineLanguageType(language: string): Technology["type"] {
    const typeMap: Record<string, Technology["type"]> = {
      typescript: "language",
      javascript: "language",
      python: "language",
      php: "language",
      dart: "language",
      swift: "language",
      kotlin: "language",
      go: "language",
      rust: "language",
      "c#": "language",
      "node.js": "runtime",
    };

    return typeMap[language] || "language";
  }

  /**
   * 确定框架类型
   */
  private determineFrameworkType(framework: string): Framework["type"] {
    const typeMap: Record<string, Framework["type"]> = {
      react: "frontend",
      vue: "frontend",
      angular: "frontend",
      svelte: "frontend",
      "next.js": "fullstack",
      nuxt: "fullstack",
      laravel: "backend",
      django: "backend",
      flask: "backend",
      fastapi: "backend",
      express: "backend",
      nestjs: "backend",
      flutter: "mobile",
      swiftui: "mobile",
    };

    return typeMap[framework] || "other";
  }

  /**
   * 确定库类型
   */
  private determineLibraryType(library: string): Library["type"] {
    const typeMap: Record<string, Library["type"]> = {
      tailwindcss: "ui",
      shadcn: "ui",
      bootstrap: "ui",
      "material-ui": "ui",
      "chakra-ui": "ui",
      "ant-design": "ui",
      redux: "state",
      mobx: "state",
      jotai: "state",
      zustand: "state",
      tanstack: "utility",
      emotion: "ui",
      "styled-components": "ui",
      vite: "utility",
      livewire: "ui",
      inertia: "utility",
      web3: "utility",
      tensorflow: "utility",
      pytorch: "utility",
      jax: "utility",
    };

    return typeMap[library] || "other";
  }

  /**
   * 基于用户需求匹配相关规则
   */
  public matchRules(request: UserRequest): MatchResult {
    // Remove debugging console.log
    // console.log(`[DEBUG] Matching rules for request: ${JSON.stringify(request, null, 2)}`);
    // console.log(`[DEBUG] Total available rules: ${this.rules.length}`);
    // console.log(`[DEBUG] Rules directory: ${this.rulesDirectory}`);

    // 存储规则匹配结果
    const matches: RuleMatch[] = [];

    // 遍历所有规则进行匹配
    for (const rule of this.rules) {
      let matchScore = 0;
      const matchDetails: string[] = [];

      // Remove debugging console.log
      // console.log(`[DEBUG] Checking rule: ${rule.name}`);
      // console.log(`[DEBUG] Rule metadata: ${JSON.stringify(rule.metadata, null, 2)}`);

      // 匹配语言（权重 = 1.0）
      for (const tech of request.technologies) {
        if (rule.metadata.technologies.includes(tech.name)) {
          matchScore += 1.0 * (tech.strength ?? 1.0);
          matchDetails.push(`Tech match: ${tech.name}`);
          // Remove debugging console.log
          // console.log(`[DEBUG] Matched technology: ${tech.name}`);
        }
      }

      // 匹配框架（权重 = 1.5）- 框架通常是项目的核心决策
      for (const framework of request.frameworks) {
        if (rule.metadata.frameworks.includes(framework.name)) {
          matchScore += 1.5 * (framework.strength ?? 1.0);
          matchDetails.push(`Framework match: ${framework.name}`);
          // Remove debugging console.log
          // console.log(`[DEBUG] Matched framework: ${framework.name}`);
        }

        // 特殊匹配：Next.js 相关规则
        if (
          framework.name === "next.js" &&
          (rule.name.includes("next") ||
            rule.metadata.frameworks.some((f) => f.includes("next")))
        ) {
          matchScore += 1.0;
          matchDetails.push(`Special match: Next.js related rule`);
          // Remove debugging console.log
          // console.log(`[DEBUG] Special match for framework: ${framework.name}`);
        }

        // 特殊匹配：React 相关规则
        if (
          framework.name === "react" &&
          (rule.name.includes("react") ||
            rule.metadata.frameworks.some((f) => f.includes("react")))
        ) {
          matchScore += 0.8;
          matchDetails.push(`Special match: React related rule`);
          // Remove debugging console.log
          // console.log(`[DEBUG] Special match for framework: ${framework.name}`);
        }
      }

      // 匹配库（权重 = 1.2）
      for (const library of request.libraries) {
        if (rule.metadata.libraries.includes(library.name)) {
          matchScore += 1.2 * (library.strength ?? 1.0);
          matchDetails.push(`Library match: ${library.name}`);
          // Remove debugging console.log
          // console.log(`[DEBUG] Matched library: ${library.name}`);
        }

        // 特殊匹配：shadcn/ui 和 tailwind 通常一起使用
        if (
          library.name === "shadcn" &&
          rule.metadata.libraries.includes("tailwindcss")
        ) {
          matchScore += 0.5;
          matchDetails.push(`Special match: shadcn/ui with Tailwind`);
          // Remove debugging console.log
          // console.log(`[DEBUG] Special match for library: ${library.name}`);
        }
      }

      // 内容关键词匹配（更具体的匹配）
      const ruleContent = rule.content.toLowerCase();
      const requestLower = request.rawInput.toLowerCase();

      // 特殊内容匹配：TypeScript
      if (
        requestLower.includes("typescript") &&
        ruleContent.includes("typescript")
      ) {
        matchScore += 0.8;
        matchDetails.push(`Content match: TypeScript`);
        // Remove debugging console.log
        // console.log(`[DEBUG] Content match for typescript`);
      }

      // 特殊内容匹配：Next.js 版本
      if (request.frameworks.some((f) => f.name === "next.js")) {
        // 检查 Next.js 版本匹配
        const nextVersionMatch = requestLower.match(/next(?:\.js)?\s*(\d+)/);
        const ruleNextVersionMatch = ruleContent.match(/next(?:\.js)?\s*(\d+)/);

        if (
          nextVersionMatch &&
          ruleNextVersionMatch &&
          nextVersionMatch[1] === ruleNextVersionMatch[1]
        ) {
          matchScore += 1.2;
          matchDetails.push(
            `Content match: Next.js version ${nextVersionMatch[1]}`
          );
          // Remove debugging console.log
          // console.log(`[DEBUG] Content match for next.js`);
        }
      }

      // 特殊匹配：React + Tailwind 组合是常见模式
      if (
        request.frameworks.some((f) => f.name === "react") &&
        request.libraries.some((l) => l.name === "tailwindcss") &&
        rule.metadata.frameworks.includes("react") &&
        rule.metadata.libraries.includes("tailwindcss")
      ) {
        matchScore += 1.0;
        matchDetails.push(`Special match: React + Tailwind pattern`);
        // Remove debugging console.log
        // console.log(`[DEBUG] Special match for React+Tailwind`);
      }

      // 提升核心框架规则的权重
      const hasCoreFrameworkInName = [
        "react",
        "next",
        "vue",
        "angular",
        "svelte",
      ].some((framework) => rule.name.toLowerCase().includes(framework));

      if (hasCoreFrameworkInName) {
        matchScore *= 1.2;
        matchDetails.push(`Boost: Core framework rule`);
        // Remove debugging console.log
        // console.log(`[DEBUG] Applied core framework boost`);
      }

      // 名称相似度匹配 - 如果规则名称与用户输入有相似性
      const nameSimilarity = this.calculateStringSimilarity(
        rule.name,
        request.rawInput
      );
      if (nameSimilarity > 0.3) {
        // 如果相似度超过30%
        matchScore += nameSimilarity * 2; // 根据相似度增加分数
        matchDetails.push(
          `Name similarity: ${Math.round(nameSimilarity * 100)}%`
        );
        // Remove debugging console.log
        // console.log(`[DEBUG] Added name similarity match`);
      }

      // 如果有足够的匹配分数，添加到结果
      if (matchScore > 0) {
        matches.push({
          rule,
          score: matchScore,
          details: matchDetails,
        });
        // Remove debugging console.log
        // console.log(`[DEBUG] Added rule to matches with score: ${matchScore}`);
      } else {
        // Remove debugging console.log
        // console.log(`[DEBUG] Rule ${rule.name} had no matches`);
      }
    }

    // 按匹配分数排序
    matches.sort((a, b) => b.score - a.score);

    // 选择最佳匹配规则
    const matchedRules = matches.slice(0, 3); // 取前3个最佳匹配

    // 计算置信度
    const bestMatch = matches.length > 0 ? matches[0] : null;
    let confidence = 0;

    if (bestMatch) {
      // 基于最高分数计算置信度 - 分数越高置信度越高
      confidence = Math.min(bestMatch.score / 5, 1.0); // 标准化置信度，最高为1.0
      // Remove debugging console.log
      // console.log(`[DEBUG] Found best match: ${bestMatch.rule.name} with confidence: ${confidence}`);
    } else {
      // 没有找到匹配
      // Remove debugging console.log
      // console.log(`[DEBUG] No matching rules found`);
    }

    // 准备建议的规则内容（如果有匹配）
    let suggestedRule = "";

    if (bestMatch) {
      // 使用最佳匹配的规则作为基础
      suggestedRule = bestMatch.rule.content;
    } else {
      // 如果没有匹配，生成通用规则

      // Next.js 项目的降级规则
      if (request.frameworks.some((f) => f.name === "next.js")) {
        suggestedRule = `# Next.js Project Setup

A standard Next.js project with recommended configurations.

## Dependencies
- next
- react
- react-dom
${
  request.libraries.some((l) => l.name === "tailwindcss")
    ? "- tailwindcss\n- postcss\n- autoprefixer"
    : ""
}
${
  request.libraries.some((l) => l.name === "shadcn")
    ? "- shadcn/ui components"
    : ""
}

## Project Structure
\`\`\`
app/
  layout.tsx
  page.tsx
  components/
public/
\`\`\`
`;
        // Remove debugging console.log
        // console.log(`[DEBUG] Applied Next.js fallback rule`);
      }
      // React 项目的降级规则
      else if (request.frameworks.some((f) => f.name === "react")) {
        suggestedRule = `# React Project Setup

A standard React project with recommended configurations.

## Dependencies
- react
- react-dom
${
  request.libraries.some((l) => l.name === "tailwindcss")
    ? "- tailwindcss\n- postcss\n- autoprefixer"
    : ""
}
${request.libraries.some((l) => l.name === "vite") ? "- vite" : ""}

## Project Structure
\`\`\`
src/
  App.tsx
  main.tsx
  components/
public/
\`\`\`
`;
        // Remove debugging console.log
        // console.log(`[DEBUG] Applied React fallback rule`);
      } else {
        // 完全通用的规则
        suggestedRule = `# Project Setup

Basic project setup based on your requirements.

## Dependencies
${request.technologies.map((t) => `- ${t.name}`).join("\n")}
${request.frameworks.map((f) => `- ${f.name}`).join("\n")}
${request.libraries.map((l) => `- ${l.name}`).join("\n")}

## Getting Started
Follow standard setup procedures for your selected technologies.
`;
      }
    }

    // Remove debugging console.log
    // console.log(`[DEBUG] Final match result: ${matchedRules.length} rules matched with confidence ${confidence}`);

    return {
      matchedRules,
      confidence,
      suggestedRule,
    };
  }

  /**
   * 计算两个字符串的相似度（简单实现）
   */
  private calculateStringSimilarity(s1: string, s2: string): number {
    const s1Lower = s1.toLowerCase();
    const s2Lower = s2.toLowerCase();

    // 判断s1中的词是否出现在s2中
    const words1 = s1Lower.split(/[-_\s]/);
    const words2 = s2Lower.split(/[-_\s]/);

    let matchCount = 0;
    for (const word of words1) {
      if (word.length > 2 && words2.includes(word)) {
        matchCount++;
      }
    }

    return matchCount / Math.max(words1.length, 1);
  }

  /**
   * 创建规则文件到目标目录
   * @param targetDirectory 目标目录
   * @param ruleContent 规则内容
   * @param ruleName 规则名称，用于文件名
   */
  public createRule(targetDirectory: string, ruleContent: string, ruleName?: string): string {
    try {
      // 确保目标目录存在
      let rulesDirPath = targetDirectory;

      // 检查目标目录是否已经包含.cursor/rules路径
      if (
        !targetDirectory.endsWith(".cursor/rules") &&
        !targetDirectory.endsWith(".cursor\\rules")
      ) {
        rulesDirPath = path.join(targetDirectory, ".cursor", "rules");
      }

      // 创建文件夹结构
      if (!fs.existsSync(rulesDirPath)) {
        fs.mkdirSync(rulesDirPath, { recursive: true });
        console.log(`Created rules directory: ${rulesDirPath}`);
      }

      // 创建规则文件，使用规则名称或默认名称
      const fileName = ruleName ? `${ruleName}.md` : "project-rules.md";
      const rulePath = path.join(rulesDirPath, fileName);
      fs.writeFileSync(rulePath, ruleContent);
      console.log(`Created rule file: ${rulePath}`);

      return rulePath;
    } catch (error) {
      console.error("Failed to create rule file:", error);
      throw error;
    }
  }

  /**
   * 格式化规则预览
   */
  public formatRulePreview(matchResult: MatchResult): string {
    if (matchResult.matchedRules.length === 0) {
      return JSON.stringify({
        message: "No matching rules found",
        matchFound: false,
      });
    }

    const bestMatch = matchResult.matchedRules[0];
    const confidence = Math.round(matchResult.confidence * 100);

    // 添加规则内容摘要（前几行）
    const contentLines = bestMatch.rule.content.split("\n");
    const previewLines = contentLines.slice(
      0,
      Math.min(10, contentLines.length)
    );
    const contentPreview = previewLines.join("\n");

    const result = {
      matchFound: true,
      ruleName: bestMatch.rule.name,
      confidence: confidence,
      matchFactors: bestMatch.details,
      contentPreview,
      hasMoreContent: contentLines.length > 10,
    };

    return JSON.stringify(result);
  }
}
