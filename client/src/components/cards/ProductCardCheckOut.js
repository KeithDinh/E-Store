import laptop from "../../images/laptop.png";
import ModalImage from "react-modal-image";

const ProductCardCheckOut = ({ p }) => {
  return (
    <tr>
      <td>
        <div style={{ width: "100px", height: "auto" }}>
          {p.images.length ? (
            <ModalImage small={p.images[0].url} large={p.images[0].url} />
          ) : (
            <ModalImage small={laptop} large={laptop} />
          )}
        </div>
      </td>
      <td>{p.title}</td>
      <td>{p.price}</td>
      <td>{p.brand}</td>
      <td>{p.color}</td>
      <td>{p.count}</td>
      <td>Shipping Icon</td>
      <td>Delete Icon</td>
    </tr>
  );
};

export default ProductCardCheckOut;
