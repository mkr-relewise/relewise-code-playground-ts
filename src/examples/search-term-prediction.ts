import {
  Searcher,
  SearchTermPredictionBuilder,
  UserFactory,
} from '@relewise/client';

export interface PredictionOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runSearchTermPrediction(options: PredictionOptions = {}) {
  const datasetId = options.datasetId;
  const apiKey = options.apiKey;
  const serverUrl = options.serverUrl;

  if (!datasetId || !apiKey || !serverUrl) {
    throw new Error(
      'Missing required fields. Please provide them in the input fields above.'
    );
  }

  const searcher = new Searcher(datasetId, apiKey, {
    serverUrl,
  });

  const settings = {
    language: 'da-DK',
    currency: 'eur',
    displayedAtLocation: 'Search Page',
    user: UserFactory.anonymous(),
  };

  const builder = new SearchTermPredictionBuilder(settings)
    .setTerm('laptop')
    .take(10);

  const response = await searcher.searchTermPrediction(builder.build());
  console.log(response);
}
