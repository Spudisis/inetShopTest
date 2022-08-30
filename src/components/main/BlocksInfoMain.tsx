import React from "react";
import ItemForFilters from "../../assets/Json/ItemForFilters.json";
import { Link } from "react-router-dom";
import { useAppDispatch } from "../../redux/store";
import { addFilterView, deleteAllFilterView } from "../../redux/slices/filterSlice";

type propsInfo = {
  classProduct: string;
};
const BlocksInfoMain: React.FC<propsInfo> = ({ classProduct }) => {
  const [img, setImg] = React.useState<string[]>([]);
  const newItem = ItemForFilters.filter((obj) => obj.type === classProduct);
  const dispatch = useAppDispatch();

  const ChangeClassProduct = (classT: string, classForPerson: string) => {
    dispatch(deleteAllFilterView());
    const classAdd = { class: classT, classForPerson: classForPerson };
    dispatch(addFilterView(classAdd));
  };

  React.useEffect(() => {
    switch (classProduct) {
      case "Супермаркет":
        let contextImgShop = require.context(`../../assets/mainBlocksCategory/supermarket/`, false);
        const pathsShop = contextImgShop.keys();
        const svgsShop = pathsShop.map((path) => contextImgShop(path));
        setImg(svgsShop);

        break;
      case "Кулинария":
        let contextImgKithen = require.context(`../../assets/mainBlocksCategory/Kitchen/`, false);
        const pathsKithen = contextImgKithen.keys();
        const svgsKithen = pathsKithen.map((path) => contextImgKithen(path));
        setImg(svgsKithen);

        break;
      case "Заморозка":
        let contextImgFreeze = require.context(`../../assets/mainBlocksCategory/Freeze/`, false);
        const pathsFreeze = contextImgFreeze.keys();
        const svgsFreeze = pathsFreeze.map((path) => contextImgFreeze(path));
        setImg(svgsFreeze);
        break;
      case "Другое":
        let contextImgAnother = require.context(`../../assets/mainBlocksCategory/Another/`, false);
        const pathsAnother = contextImgAnother.keys();
        const svgsAnother = pathsAnother.map((path) => contextImgAnother(path));
        setImg(svgsAnother);
        break;
      default:
    }
  }, []);
  return (
    <>
      {img.map((obj, index) => (
        <Link
          key={"img" + index}
          to="/catalog"
          onClick={() => {
            ChangeClassProduct(newItem[index].class, newItem[index].classForPerson);
          }}
        >
          <div>
            <span>{newItem[index].classForPerson}</span>
            <img src={obj} />
          </div>
        </Link>
      ))}
    </>
  );
};

export default BlocksInfoMain;
