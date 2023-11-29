import { Card } from "antd";
import numeral from "numeral";
import { Link } from "react-router-dom";

const { Meta } = Card;

interface Product {
  productId: string;
  name: string;
  price: string;
  source: string;
}

interface CardCompProps {
  product: Product;
}

const CardComp: React.FC<CardCompProps> = ({ product }) => {
  return (
    <>
      <Link to={`/detail/${product?.productId}`}>
        <Card
          hoverable
          className="w-full"
          cover={<img alt="example" src={product?.source} />}
        >
          <Meta title={product?.name} />
          <p className="mt-4 text-red-500 font-semibold text-xl">
            {numeral(product?.price).format("0, ")} VNĐ
          </p>
        </Card>
      </Link>
    </>
  );
};
export default CardComp;
