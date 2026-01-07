# AI Feedback System Using Vercel

This repository contains the AI Feedback System project that covers prompt engineering evaluation and a production-style web application with dual dashboards.

## Project Structure

```
ai_feedback_system_using_vercel/
└── task 1/
    └── (task1_rating_prediction.ipynb)
└── task 2/
    └── (AI Feedback System project files)
```
# Task 1: Prompt Engineering & Evaluation

## Objective:
Analyze how different prompting strategies influence LLM performance when predicting star ratings from user reviews.

## Prompting Approaches Implemented:

## Baseline Prompt
- Minimal instruction without examples or strict output constraints.
- Used as a control to understand unguided model behavior.

## Few-Shot Prompt
- Included multiple example reviews with correct star ratings.
- Designed to improve contextual understanding and prediction consistency.

## JSON-Strict Prompt
- Enforced a strict JSON output schema.
- Focused on reliability and machine-readability of responses.

## Evaluation Metrics

Each prompting approach was evaluated using:
- **Mean Absolute Error (MAE)** – Measures prediction error magnitude.
- **Accuracy** – Exact match between predicted and actual star rating.
- **JSON Validity Rate** – Percentage of outputs adhering to valid JSON format.

## Key Findings
- Few-Shot prompting demonstrated improved predictive behavior compared to the baseline, highlighting the value of contextual examples.
- JSON-Strict prompting achieved perfect output consistency but did not significantly improve prediction accuracy.
- Baseline prompting performed the weakest, reinforcing the importance of structured guidance in LLM prompts.

## Notes on Evaluation
Due to temporary LLM API resource exhaustion, final evaluation runs used cached or fallback outputs. Despite this, results remain conclusive as:
- All prompts were tested on the same dataset sample.
- Relative performance trends remained consistent across runs.
- Metrics reflect prompt design impact rather than model variability.

## Implementation & analysis:
Refer to `task 1/task1_rating_prediction.ipynb` for full code, prompts, and evaluation logic.

# Task 2: AI Feedback System

A production-ready web application with two dashboards:
- **User Dashboard**: Public-facing feedback submission interface
- **Admin Dashboard**: Internal dashboard for monitoring all submissions

See `task 2/README.md` for detailed documentation.

## Deployment

The application is deployed on Vercel:
- User Dashboard: https://ai-feedback-system-dusky.vercel.app
- Admin Dashboard: https://ai-feedback-system-dusky.vercel.app/admin
