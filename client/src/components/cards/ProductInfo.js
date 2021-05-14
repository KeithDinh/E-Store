import { Link } from "react-router-dom";

const ProductInfo = ({ product }) => {
  const { price, category, subs, shipping, color, brand, quantity, sold } =
    product;

  return (
    <ul className="list-group">
      <li className="list-group-item">
        Price
        <span className="label label-default label-pill pull-xs-right">
          ${price}
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          Category
          <Link
            to={`/products/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
            {category.name}
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
          Sub Categories
          <div className="pull-xs-right">
            {subs.map((s) => (
              <Link className="ml-3 mr-0" key={s._id} to={`/sub/${s.slug}`}>
                {s.name}
              </Link>
            ))}
          </div>
        </li>
      )}

      <li className="list-group-item">
        Shipping
        <span className="label label-default label-pill pull-xs-right">
          {shipping}
        </span>
      </li>

      <li className="list-group-item">
        Color
        <span className="label label-default label-pill pull-xs-right">
          {color}
        </span>
      </li>

      <li className="list-group-item">
        Brand
        <span className="label label-default label-pill pull-xs-right">
          {brand}
        </span>
      </li>

      <li className="list-group-item">
        Quantity
        <span className="label label-default label-pill pull-xs-right">
          {quantity}
        </span>
      </li>

      <li className="list-group-item">
        Sold
        <span className="label label-default label-pill pull-xs-right">
          {sold}
        </span>
      </li>
    </ul>
  );
};

export default ProductInfo;
