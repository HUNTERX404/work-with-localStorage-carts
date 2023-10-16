const AddPrefix = (url: String) => "/api/v1/products" + url;

const products = {
  index: {
    all: AddPrefix(`/`),
    show: (productId: number) => AddPrefix(`/${productId}`),
  },
};

export default products;
