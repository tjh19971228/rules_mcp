/**
 * 综合测试客户端 - Cursor Rules Manager MCP 服务
 * 
 * 此客户端提供了全面的测试功能，验证MCP服务的各项功能是否正常工作
 * 
 * 用法:
 * 1. npm run build (首先构建服务器)
 * 2. node test-mcp-client.js analyze "创建一个Next.js+tailwind+shadcn/ui项目"
 * 3. node test-mcp-client.js create "# 测试规则\n这是一个测试规则"
 * 4. node test-mcp-client.js process "创建一个React+TypeScript项目"
 * 5. node test-mcp-client.js runall (运行所有测试)
 */

const { Client } = require('@modelcontextprotocol/sdk/client/index.js');
const { StdioClientTransport } = require('@modelcontextprotocol/sdk/client/stdio.js');
const path = require('path');
const fs = require('fs');

// 获取服务器构建路径
const serverPath = path.resolve(__dirname, './dist/index.js');

// 解析命令行参数
const action = process.argv[2];
const input = process.argv[3];

// 如果没有指定动作，显示帮助信息
if (!action) {
  console.log(`
=========================================
Cursor Rules Manager MCP 测试客户端
=========================================

用法: node test-mcp-client.js [命令] [参数]

可用命令:
  analyze [文本]    - 测试分析用户请求功能
  create [规则内容]  - 测试创建规则功能
  process [文本]    - 测试处理用户请求功能
  runall           - 运行所有测试

示例:
  node test-mcp-client.js analyze "创建Next.js+tailwind项目"
  node test-mcp-client.js create "# 测试规则\\n这是测试内容"
  node test-mcp-client.js process "需要React+TypeScript项目规则"
  node test-mcp-client.js runall
  `);
  process.exit(0);
}

// 创建MCP客户端
function createClient() {
  const transport = new StdioClientTransport({
    command: process.execPath, // Node.js可执行文件
    args: [serverPath]
  });
  
  const client = new Client({
    name: 'mcp-comprehensive-test-client',
    version: '1.0.0'
  });
  
  client.connect(transport);
  return client;
}

// 测试分析功能
async function testAnalyze(client, input) {
  console.log('\n📊 测试分析功能...');
  console.log(`输入: "${input}"`);
  
  try {
    const result = await client.callTool('analyze_request', { userInput: input });
    const response = JSON.parse(result.content[0].text);
    
    console.log('✅ 分析结果:');
    console.log(response);
    return true;
  } catch (error) {
    console.error('❌ 分析失败:', error);
    return false;
  }
}

// 测试创建规则功能
async function testCreate(client, input) {
  console.log('\n📝 测试创建规则功能...');
  console.log(`输入规则: "${input.substring(0, 30)}${input.length > 30 ? '...' : ''}"`);
  
  try {
    const result = await client.callTool('create_rule', { 
      confirmed: true,
      ruleContent: input
    });
    const response = JSON.parse(result.content[0].text);
    
    console.log('✅ 创建规则结果:');
    console.log(response);
    
    // 验证返回的规则内容
    if (response.ruleContent === input) {
      console.log('✅ 规则内容验证成功');
    } else {
      console.log('⚠️ 规则内容不匹配');
    }
    
    return true;
  } catch (error) {
    console.error('❌ 创建规则失败:', error);
    return false;
  }
}

// 测试处理请求功能
async function testProcess(client, input) {
  console.log('\n🔄 测试处理请求功能...');
  console.log(`输入: "${input}"`);
  
  try {
    const result = await client.callTool('process_request', { userInput: input });
    const response = JSON.parse(result.content[0].text);
    
    console.log('✅ 处理结果:');
    console.log(response);
    
    // 检查预览是否存在
    if (response.preview) {
      console.log('✅ 预览内容存在');
    }
    
    // 如果自动创建了规则
    if (response.autoCreated && response.ruleContent) {
      console.log('✅ 成功自动生成规则内容');
    }
    
    return true;
  } catch (error) {
    console.error('❌ 处理请求失败:', error);
    return false;
  }
}

// 测试规则列表资源
async function testRulesList(client) {
  console.log('\n📋 测试获取规则列表...');
  
  try {
    // 列出资源
    const resourcesResult = await client.listResources();
    console.log('可用资源:', resourcesResult.resources.map(r => r.name));
    
    // 由于资源API无法直接使用，我们使用文件系统访问规则目录
    console.log('检查规则目录...');
    const rulesDir = path.join(process.cwd(), 'dist', 'rules');
    
    if (fs.existsSync(rulesDir)) {
      const files = fs.readdirSync(rulesDir)
        .filter(file => file.endsWith('.md'))
        .map(file => path.basename(file, '.md'));
      
      console.log('✅ 规则列表:');
      console.log(files);
      
      if (files.length > 0) {
        console.log(`✅ 找到 ${files.length} 条规则`);
      } else {
        console.log('⚠️ 规则目录存在但没有找到规则文件');
      }
    } else {
      console.log('⚠️ 规则目录不存在:', rulesDir);
    }
    
    return true;
  } catch (error) {
    console.error('❌ 获取规则列表失败:', error);
    return false;
  }
}

// 运行所有测试
async function runAllTests() {
  console.log('🚀 开始运行全部测试...');
  
  const client = createClient();
  let allPassed = true;
  
  try {
    console.log('\n📡 连接到MCP服务器...');
    
    // 测试工具列表
    const toolsResult = await client.listTools();
    console.log('可用工具:', toolsResult.tools.map(t => t.name));
    
    // 测试资源列表
    const resourcesResult = await client.listResources();
    console.log('可用资源:', resourcesResult.resources.map(r => r.name));
    
    // 运行各项测试
    const tests = [
      { name: '规则列表测试', func: testRulesList, args: [client] },
      { name: '分析请求测试', func: testAnalyze, args: [client, '创建一个Next.js+tailwind+shadcn/ui项目'] },
      { name: '创建规则测试', func: testCreate, args: [client, '# 测试规则\n\n这是一个自动化测试创建的规则文件。\n\n## 特性\n\n- 测试特性1\n- 测试特性2'] },
      { name: '处理请求测试', func: testProcess, args: [client, '需要React+TypeScript项目的规则'] }
    ];
    
    for (const test of tests) {
      console.log(`\n======== 运行测试: ${test.name} ========`);
      const passed = await test.func(...test.args);
      if (!passed) {
        allPassed = false;
        console.log(`❌ ${test.name} 失败`);
      } else {
        console.log(`✅ ${test.name} 通过`);
      }
    }
    
    // 最终结果
    console.log('\n======== 测试结果汇总 ========');
    if (allPassed) {
      console.log('🎉 所有测试通过!');
    } else {
      console.log('⚠️ 部分测试失败，请检查上面的错误信息');
    }
  } catch (error) {
    console.error('❌ 测试过程发生错误:', error);
    allPassed = false;
  } finally {
    // 关闭客户端
    try {
      await client.close();
      console.log('👋 客户端已关闭');
    } catch (err) {
      console.error('关闭客户端时出错:', err);
    }
    
    return allPassed;
  }
}

// 主函数
async function main() {
  try {
    if (action === 'runall') {
      // 运行所有测试
      const allPassed = await runAllTests();
      process.exit(allPassed ? 0 : 1);
    } else {
      // 运行单个测试
      if (!input && (action === 'analyze' || action === 'create' || action === 'process')) {
        console.error(`错误: ${action} 命令需要输入参数`);
        process.exit(1);
      }
      
      const client = createClient();
      
      try {
        console.log('连接到MCP服务器...');
        
        // 运行指定的测试
        let result = false;
        switch (action) {
          case 'analyze':
            result = await testAnalyze(client, input);
            break;
          
          case 'create':
            result = await testCreate(client, input);
            break;
          
          case 'process':
            result = await testProcess(client, input);
            break;
          
          case 'rules':
            result = await testRulesList(client);
            break;
          
          default:
            console.error(`未知命令: ${action}`);
            console.error('可用命令: analyze, create, process, rules, runall');
            process.exit(1);
        }
        
        // 退出码基于测试结果
        process.exit(result ? 0 : 1);
      } finally {
        // 关闭客户端
        await client.close();
        console.log('客户端已关闭');
      }
    }
  } catch (error) {
    console.error('错误:', error);
    process.exit(1);
  }
}

// 运行主函数
main().catch(error => {
  console.error('未捕获的错误:', error);
  process.exit(1);
}); 