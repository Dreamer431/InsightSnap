# 贡献指南

感谢你对 InsightSnap 的关注！我们欢迎所有形式的贡献。

## 🤝 如何贡献

### 报告问题

如果你发现了 bug 或有功能建议：

1. 前往 [Issues](https://github.com/Dreamer431/insightsnap/issues) 页面
2. 点击 "New Issue"
3. 选择适当的模板（Bug Report 或 Feature Request）
4. 详细描述问题或建议
5. 添加相关标签

### 提交代码

1. **Fork 仓库**
   
   点击页面右上角的 "Fork" 按钮

2. **克隆你的 Fork**
   ```bash
   git clone https://github.com/Dreamer431/insightsnap.git
   cd insightsnap
   ```

3. **创建分支**
   ```bash
   git checkout -b feature/your-feature-name
   # 或
   git checkout -b fix/your-bug-fix
   ```

4. **进行修改**
   
   - 保持代码风格一致
   - 添加必要的注释
   - 确保代码可以正常运行

5. **测试你的修改**
   ```bash
   npm run dev
   ```

6. **提交更改**
   ```bash
   git add .
   git commit -m "feat: add amazing feature"
   # 或
   git commit -m "fix: resolve issue with X"
   ```

7. **推送到你的 Fork**
   ```bash
   git push origin feature/your-feature-name
   ```

8. **创建 Pull Request**
   
   - 访问原仓库页面
   - 点击 "New Pull Request"
   - 选择你的分支
   - 填写 PR 描述
   - 提交 PR

## 📝 代码规范

### Commit 消息格式

使用语义化的 commit 消息：

- `feat:` - 新功能
- `fix:` - 修复 bug
- `docs:` - 文档更新
- `style:` - 代码格式调整（不影响功能）
- `refactor:` - 代码重构
- `test:` - 测试相关
- `chore:` - 构建或辅助工具变动

示例：
```
feat: add dark mode toggle animation
fix: resolve card navigation on mobile
docs: update installation instructions
```

### 代码风格

- 使用 TypeScript 进行类型检查
- 遵循项目现有的代码风格
- 组件使用函数式组件和 Hooks
- 保持代码简洁易读

### 文件组织

- 组件文件使用 PascalCase：`CardPreview.tsx`
- 工具函数使用 camelCase：`formatDate.ts`
- 常量使用 UPPER_SNAKE_CASE：`API_ENDPOINT`

## 🎯 优先级

我们特别欢迎以下类型的贡献：

- 🐛 Bug 修复
- 📝 文档改进
- ♿ 可访问性增强
- 🌍 国际化支持
- ⚡ 性能优化
- ✨ UI/UX 改进

## 💬 交流讨论

- 💡 有想法或疑问？在 [Discussions](https://github.com/Dreamer431/insightsnap/discussions) 中讨论
- 🐛 发现问题？提交 [Issue](https://github.com/Dreamer431/insightsnap/issues)

## 📜 行为准则

- 尊重所有贡献者
- 建设性地提供反馈
- 专注于对项目最有利的决策
- 保持友好和专业的态度

---

再次感谢你的贡献！每一个 PR 都让 InsightSnap 变得更好。🎉
