import { createElement, type ReactElement } from "react";
import { GiPartyPopper } from "react-icons/gi";
import { IoFastFood } from "react-icons/io5";
import { MdEmojiTransportation } from "react-icons/md";
import { MdOutlineHealthAndSafety } from "react-icons/md";
import { TiShoppingCart } from "react-icons/ti";
import { CiMobile4 } from "react-icons/ci";
import { CiPlane } from "react-icons/ci";

const useCategoryIcon = () => {
  interface CategoryIconProps {
    color?: string;
  }

  const iconMap: Record<string, ReactElement<CategoryIconProps>> = {
    IoFastFood: createElement(IoFastFood),
    GiPartyPopper: createElement(GiPartyPopper),
    MdEmojiTransportation: createElement(MdEmojiTransportation),
    MdOutlineHealthAndSafety: createElement(MdOutlineHealthAndSafety),
    TiShoppingCart: createElement(TiShoppingCart),
    CiMobile4: createElement(CiMobile4),
    CiPlane: createElement(CiPlane),
  };

  return iconMap;
};

export default useCategoryIcon;
