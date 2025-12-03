# Relewise Search Term Prediction

This app demonstrates how to use the Relewise Search Term Prediction API.

## Getting Started

1. [Get your API credentials](https://docs.relewise.com/docs/myrelewise/settings.html#api-keys) from Relewise
2. Enter your `Dataset ID`, `API Key`, and `Server URL` in the input fields
3. Click "Run Prediction" to fetch search term predictions

## Customizing Predictions

To customize the search term prediction behavior, edit `src/search-term-prediction.ts`. You can modify:
- The search term being predicted
- The number of results returned
- Language and currency settings
- Any other SearchTermPredictionBuilder options