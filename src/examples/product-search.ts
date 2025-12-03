export interface ProductSearchOptions {
  datasetId?: string;
  apiKey?: string;
  serverUrl?: string;
}

export async function runProductSearch(options: ProductSearchOptions = {}) {
  // Placeholder: implement product search logic here once available.
  // Keeping the same signature shape for easy wiring into the picker.
  console.log('Product search not implemented yet.', options);
}
