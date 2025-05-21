This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 项目开发规范

### 1. 目录结构
- `src/app`：页面与 API 路由
- `src/components`：通用 UI 组件
- `src/modules`：业务模块（如 orders）
- `src/lib`：工具库（如 request、error-tracking）
- `src/store`：全局状态管理
- `src/utils`：通用工具函数
- `src/constants`：常量配置
- `src/hooks`：自定义 hooks

### 2. 代码风格
- 统一使用 Prettier 自动格式化，遵循 ESLint 规范
- 变量、函数、类型命名采用小驼峰（camelCase），类名采用大驼峰（PascalCase）
- 文件命名统一使用小写+中划线（kebab-case）

### 3. 接口请求与 Service 层
- 所有 HTTP 请求统一通过 `src/lib/request.ts`，禁止直接使用 axios
- 支持多 baseURL，业务 service 层需封装 API 域
- Service 层返回严格类型，禁止 any
- 错误处理、鉴权逻辑统一在 request 拦截器中实现

### 4. 类型安全
- 禁止使用 any，必须使用 TypeScript 类型定义
- 公共类型定义放在 `src/types` 或各模块下的 types.ts

### 5. 分支管理
- 主分支：main/master
- 日常开发：feature/xxx、bugfix/xxx、hotfix/xxx
- 合并需走 Pull Request，需至少 1 人 Code Review

### 6. 提交规范
- 使用英文提交，格式：`<type>: <desc>`，如 `feat: add user login api`
- type 可选：feat、fix、refactor、docs、test、chore

### 7. 测试
- 业务代码需配套单元测试，测试文件与实现同目录，命名为 `xxx.test.ts(x)`
- 所有接口需自测，推荐使用 httpie/curl 真实请求

### 8. 其他
- 严禁在生产代码中留有 console.log、debugger
- 重要变更需在 PR/Issue 说明影响范围
