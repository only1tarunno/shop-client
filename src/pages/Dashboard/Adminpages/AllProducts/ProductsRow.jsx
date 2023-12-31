/* eslint-disable react/prop-types */
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const ProductsRow = ({ product, handleDelete }) => {
  const { _id, thumbnail_url, title, price, categories, availability_count } =
    product || {};
  const navigate = useNavigate();

  const handleUpdate = (id) => {
    navigate(`/dashboard/updateProduct/${id}`);
  };
  return (
    <tr>
      <td>
        <div className="flex justify-center items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={thumbnail_url} alt="" />
            </div>
          </div>
        </div>
      </td>
      <td className="max-w-[200px]">{title}</td>
      <td>${price}</td>
      <td className="capitalize">{categories}</td>

      <td className="uppercase">{availability_count}</td>

      <td>
        <button
          onClick={() => handleUpdate(_id)}
          className="btn btn-ghost btn-sm rounded bg-[#dbb63d]"
        >
          <FaRegPenToSquare />
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDelete(_id)}
          className="btn rounded btn-sm bg-[#f76b6a] text-white hover:text-black"
        >
          <FaRegTrashCan />
        </button>
      </td>
    </tr>
  );
};

export default ProductsRow;
