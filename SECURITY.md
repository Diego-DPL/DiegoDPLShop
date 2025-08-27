# Security Policy

## Supported Versions

We release patches for security vulnerabilities in the following versions:

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

We take the security of DiegoDPLShop seriously. If you believe you have found a security vulnerability, please report it to us as described below.

**Please do not report security vulnerabilities through public GitHub issues.**

Instead, please send an email to info@diegodpl.com with:

- Type of issue (e.g., buffer overflow, SQL injection, cross-site scripting, etc.)
- Full paths of source file(s) related to the manifestation of the issue
- The location of the affected source code (tag/branch/commit or direct URL)
- Any special configuration required to reproduce the issue
- Step-by-step instructions to reproduce the issue
- Proof-of-concept or exploit code (if possible)
- Impact of the issue, including how an attacker might exploit the issue

## Response Timeline

- **24 hours**: We will acknowledge receipt of your vulnerability report
- **72 hours**: We will send a more detailed response indicating the next steps
- **1 week**: We will provide a detailed timeline for addressing the vulnerability

## Security Features

DiegoDPLShop implements several security measures:

- Firebase Authentication for secure user management
- Firebase Security Rules for database protection
- Input validation and sanitization
- HTTPS enforcement
- Secure download links with expiration
- Rate limiting on email sending

## Security Best Practices

When contributing to DiegoDPLShop, please follow these security practices:

- Never commit sensitive information (API keys, passwords, etc.)
- Use environment variables for all configuration
- Validate all user inputs
- Sanitize data before database operations
- Keep dependencies up to date
- Follow the principle of least privilege

Thank you for helping keep DiegoDPLShop and our users safe!
