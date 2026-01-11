# Contributing to Next.js SSG Blog Framework

Thank you for your interest in contributing to this project! We welcome contributions from the community.

## 🎯 How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the existing issues to avoid duplicates. When you create a bug report, include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps to reproduce the problem**
- **Provide specific examples** (code snippets, screenshots)
- **Describe the behavior you observed** and what you expected
- **Include your environment details** (OS, Node version, browser)

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub issues. When creating an enhancement suggestion:

- **Use a clear and descriptive title**
- **Provide a detailed description** of the suggested enhancement
- **Explain why this enhancement would be useful**
- **List any alternatives you've considered**

### Pull Requests

1. **Fork the repository** and create your branch from `main`
2. **Make your changes** following our coding standards
3. **Test your changes** thoroughly
4. **Update documentation** if needed
5. **Write clear commit messages**
6. **Submit a pull request**

## 🏗️ Development Setup

### Prerequisites

- Node.js 20+
- npm or yarn

### Getting Started

```bash
# Clone your fork
git clone https://github.com/YOUR-USERNAME/next-ssg-for-md-blog.git
cd next-ssg-for-md-blog

# Install dependencies
npm install

# Start development server
npm run dev

# Run linting
npm run lint

# Build the project
npm run build
```

## 📝 Coding Standards

### TypeScript

- Use TypeScript for all new code
- Ensure type safety (avoid `any` unless absolutely necessary)
- Follow existing code patterns and conventions

### Code Style

- We use ESLint for code linting
- Run `npm run lint` before committing
- Follow the existing code formatting style
- Use meaningful variable and function names

### Commit Messages

Follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

**Examples:**

```
feat(search): add fuzzy search functionality
fix(rtl): correct text direction for Arabic posts
docs(readme): update installation instructions
```

### Documentation

- Update README.md if you change functionality
- Add JSDoc comments for public APIs
- Update relevant documentation in the `docs/` folder
- Include code examples where appropriate

## 🧪 Testing

### Running Tests

```bash
# Run all tests (when available)
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Writing Tests

- Write tests for new features
- Ensure existing tests pass
- Aim for good test coverage (>70% for utilities)
- Test edge cases and error conditions

## 🔍 Code Review Process

1. **All submissions require review** before merging
2. **Maintainers will review your PR** and may request changes
3. **Address review feedback** promptly
4. **Keep PRs focused** - one feature/fix per PR
5. **Be patient and respectful** during the review process

## 📋 Pull Request Checklist

Before submitting your PR, ensure:

- [ ] Code follows the project's style guidelines
- [ ] Self-review of code completed
- [ ] Comments added for complex code
- [ ] Documentation updated (if applicable)
- [ ] No new warnings generated
- [ ] Tests added/updated (if applicable)
- [ ] All tests pass locally
- [ ] Commit messages follow conventions

## 🌟 Recognition

Contributors will be recognized in:

- GitHub contributors page
- Release notes (for significant contributions)
- Project documentation (for major features)

## 📞 Getting Help

- **Questions?** Open a [GitHub Discussion](../../discussions)
- **Stuck?** Ask in your PR or issue
- **Ideas?** Start a discussion before implementing large features

## 📜 Code of Conduct

This project adheres to a Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the project maintainers.

## 🙏 Thank You!

Your contributions help make this project better for everyone. We appreciate your time and effort!

---

**Happy Coding!** 🚀
