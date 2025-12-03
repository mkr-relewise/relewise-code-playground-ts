import {
  ProductSearchBuilder,
  Searcher,
  UserFactory,
} from '@relewise/client';

export interface ProductSearchOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runProductSearch(options: ProductSearchOptions = {}) {
  const { datasetId, apiKey, serverUrl } = options;

  if (!datasetId || !apiKey || !serverUrl) {
    throw new Error(
      'Missing required fields. Please provide them in the input fields above.'
    );
  }

  const settings = {
    language: 'da-DK',
    currency: 'DKK',
    displayedAtLocation: 'Search Page',
    user: UserFactory.anonymous(),
  };

  const builder = new ProductSearchBuilder(settings)
    .setSelectedProductProperties({
      displayName: true,
    })
    .setSelectedVariantProperties({
      displayName: true,
    })
    .setTerm('laptop')
    .pagination((p) => p.setPageSize(30).setPage(1))
    .facets((f) =>
      f
        .addBrandFacet()
        .addSalesPriceRangeFacet('Product')
        .addVariantSpecificationFacet('Size')
    );

  const searcher = new Searcher(datasetId, apiKey, {
    serverUrl,
  });

  const response = await searcher.searchProducts(builder.build());
  console.log(response);
}
