import Container from "@/components/ui/container";
import Billboard from "@/components/billboard";
import getBillboard from "@/actions/get-billboard";
import getProducts from "@/actions/get-products";
import ProductList from "@/components/product-list";


export const revalidate = 0; // Revalidate at every request

const HomePage = async () => {
  const products = await getProducts({ isFeatured: true }); // get all featured products
  const billboard = await getBillboard("c1dc737e-d459-47ef-b990-9deb17dadc0f");


  return (
    <Container>
      <div className="space-y-10 pb-10">
        <Billboard data={billboard} />
        <div className="flex flex-col gap-y-8 px-4 sm:px-6 lg:px-8">
          <ProductList title="Featured Products" products={products} />
        </div>
      </div>
    </Container>
  );
};

export default HomePage;
