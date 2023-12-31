import getProduct from "@/actions/get-product";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";
import Container from "@/components/ui/container";
import Gallery from "@/components/gallery";
import Info from "@/components/info";

interface ProductPageProps {
  params: {
    // This is the productId from the file name [productId] in the path
    productId: string;
  };
}

const ProductPage: React.FC<ProductPageProps> = async ({ params }) => {
  // Get the product that the user clicked on (the one that matches the productId in the URL); then, get the products that are in the same category as the product that the user clicked on
  const product = await getProduct(params.productId);
  const suggestedProducts = await getProducts({
    categoryId: product?.category?.id,
  }); // get all products that have the same categoryId as the product that the user clicked on

  return (
    <div className="bg-white">
      <Container>
        <div className="px-4 py-10 sm:px-6 lg:px-8">
          <div className="lg: grid lg:grid-cols-2 lg:items-start lg:gap-x-8">
            {/* Show the images of the product */}
            <Gallery images={product.images} /> 
            <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
              <Info product={product} />
            </div>
          </div>
          <hr className="my-10"/>
          {/* Show related products */}
          <ProductList title="You might also like" products={suggestedProducts} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
